import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';
import { deletePostDto } from './dto/delete-post.dto';
import { setPostStatusDto } from './dto/set-post-status.dto';
import { EventNameEnum, TransportGateway } from 'src/gateway/gateway';
import { UpdatePostDto } from './dto/update-post-dto';
import { FilterPostDto } from './dto/filter.dto';
import { DocumentService } from 'src/documents/documents.service';
import { CreateDocumentDto } from 'src/documents/dto/CreateDocument.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { Op } from 'sequelize';
import { UpdateDocumentDto } from 'src/documents/dto/UpdateDocument.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService,
        private gateway: TransportGateway,
        private documentService: DocumentService,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
    ) {

    }

    async createPost(dto: createPostDto, image): Promise<Post> {
        console.log('createPost!', dto);
        let postStatus: number = 0;
        const fileName = await this.fileService.createFile(image);
        const postUser: User = await this.userService.getUserById(dto.userId);
        const postCustomer: User = await this.userService.getUserById(dto.customerId);
        if ((postUser?.roles.some(role => role.value == 'Admin') || postUser?.roles.some(role => role.value == 'Operator') && dto?.summ)) {
            postStatus = 1;
            if(postCustomer.balance > 0) {
                const balance = Number(postCustomer.balance);
                const postSum = Number(dto?.summ);

                const availablePaidSum = balance - postSum;

                if(availablePaidSum < 0) {
                    dto.paid = postSum - availablePaidSum;
                } else if (availablePaidSum === 0) {
                    dto.paid = 0;
                } else if (availablePaidSum > 0) {
                    dto.paid = postSum;
                };
            }
        };
        const post = await this.postRepository.create({ ...dto, image: fileName || "", status: postStatus });
        if (post) {


            if (post?.status > 0) {
                await this.createDocumentOnPostCreating(post);
            };

            const postUpdated = await this.getOne(post.id.toString());
            this.gateway.emit(EventNameEnum.OnPostCreate, postUpdated);
            if (!postUpdated) {
                throw new HttpException('Error When Post Creating', HttpStatus.NOT_FOUND);
            }
            return postUpdated;
        }
        throw new HttpException('Error When Post Creating', HttpStatus.NOT_FOUND);
    }

    async getAllPosts() {
        const posts = await this.postRepository.findAll({ include: { all: true }, order: [['updatedAt', 'DESC']], });
        return posts;
    }

    async getAllCheckedPosts() {
        const posts = await this.postRepository.findAll({ where: { status: 1 }, include: { all: true }, order: [['updatedAt', 'DESC']] });
        return posts;
    }

    async getFilteredPosts(filtedDto: FilterPostDto) {
        const where: any = {};

        if (filtedDto?.status || filtedDto?.status == 0) {
            where.status = filtedDto.status;
        };
        if (filtedDto?.userId) {
            where.userId = filtedDto.userId;
        };
        if (filtedDto?.customerId) {
            where.customerId = filtedDto.customerId;
        };
        if (filtedDto?.driverId) {
            where.driverId = filtedDto.driverId;
        };
        if(filtedDto?.cargoStatus) {
            where.cargoStatus = filtedDto?.cargoStatus;
        };
        if(filtedDto?.warehouseId) {
            where.warehouseId = filtedDto.warehouseId;
        };
        if(filtedDto?.onlyForWarehouse) {
            where.cargoStatus = { [Op.in]: [3, 4] };
        };
        const posts = await this.postRepository.findAll({ where, include: { all: true }, order: [['updatedAt', 'DESC']] });
        return posts;
    }

    async deletePost(dto: deletePostDto) {
        const post = await this.postRepository.findOne({ where: { id: dto.id }, include: { all: true } });
        // this.postRepository
        if (post) {
            await post.destroy();
            this.gateway.emit(EventNameEnum.OnPostDelete, post);
            return {
                deleted: true
            }
        };
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async setPostStatus(dto: setPostStatusDto) {
        const post = await this.postRepository.findOne({ where: { id: dto.id }, include: { all: true } });
        // this.postRepository
        if (post) {
            post.set('status', dto.status)
            await post.save();
            this.gateway.emit(EventNameEnum.OnPostUpdate, post);
            return post;
        };
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async getOne(id: string) {
        const post = await this.postRepository.findOne({ where: { id }, include: { all: true } });
        if (post) {
            return post;
        };
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async updatePost(dto: UpdatePostDto) {
        const post: Post = await this.postRepository.findOne({ where: { id: dto.id }, include: { all: true } });

        let isCreateDocumentAfterUpdating = false;
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        };

        if (dto.addressFrom) {
            post.set('addressFrom', dto.addressFrom);
        };
        if (dto.addressTo) {
            post.set('addressTo', dto.addressTo);
        };

        if (dto.content) {
            post.set('content', dto.content);
        };
        if (dto.driverId) {
            post.set('driverId', dto.driverId);
        };
        if (dto.paid) {
            post.set('paid', dto.paid);
        };
        if (dto.postNaming) {
            post.set('postNaming', dto.postNaming);
        };

        if (dto.price) {
            post.set('price', dto.price);
        };
        if (dto.commission) {
            post.set('commission', dto.commission);
        };
        if(dto.warehouseId) {
            post.set('warehouseId', dto.warehouseId);
        }
        if (dto.summ) {
            if(dto.summ !== post.summ && post.documentId) {
                const updateDocumentDto: UpdateDocumentDto = {
                    sum: dto.summ
                };
                await this.documentService.update(post?.documentId, updateDocumentDto);
            }
            post.set('summ', dto.summ);
        };

        if (dto?.status || dto.status === 0) {
            if (post?.status === 0 && dto?.status !== 0 && dto?.summ >= 0) {
                isCreateDocumentAfterUpdating = true;
            };
            console.log('UPDATEPOST==>>',post);
            if(post?.documentId) {
                if(post?.status !== 0 && (dto?.status == 4)) {
                    const updateDocumentDto: UpdateDocumentDto = {
                        status: 2
                    };
                    await this.documentService.update(post?.documentId, updateDocumentDto);
                };
            }

            post.set('status', dto.status);
            if(dto.status === 1) {
                const postCustomer: User = await this.userService.getUserById(post.customerId);
                if(postCustomer.balance > 0 && post.summ - post.paid > 0) {
                    const balance = Number(postCustomer.balance);
                    const postSum = Number(post?.summ);
                    // const postPaid = Number(post?.paid);
    
                    const availablePaidSum = (balance) - postSum;
    
                    if(availablePaidSum < 0) {
                        post.set('paid', (postSum - availablePaidSum));
                    } else if (availablePaidSum === 0) {
                        post.set('paid', (0));
                    } else if (availablePaidSum > 0) {
                        post.set('paid', postSum);
                    };
                }
            }
            if(dto.status === 3 && post?.driverId) {
                const driver: User = await this.userService.getUserById(post.driverId);
                const driverCommision = Number(post.commission);
                let driverBalance = Number(driver.balance);
                driverBalance = driverBalance + driverCommision;
                await this.userService.setUserBalance({userId: driver.id, balance: driverBalance});
                post.set('status', 3);
                post.set('paidToDriver', true);
            }
        };



        if (dto.title) {
            post.set('title', dto.title);
        };
        // if (dto.warehouse) {
        //     post.set('warehouse', dto.warehouse);
        // };
        if (dto.cargoStatus) {
            if(post?.cargoStatus !== dto.cargoStatus && dto.cargoStatus === 4) {
                if(post?.driverId && !post?.paidToDriver) {
                    const driver: User = await this.userService.getUserById(post.driverId);
                    const driverCommision = Number(post.commission);
                    let driverBalance = Number(driver.balance);
                    driverBalance = driverBalance + driverCommision;
                    await this.userService.setUserBalance({userId: driver.id, balance: driverBalance});
                }

                post.set('status', 21);
                post.set('paidToDriver', true);
            };
            if(post?.cargoStatus !== dto.cargoStatus && dto.cargoStatus === 6) {
                post.set('status', 3);
            }
            post.set('cargoStatus', dto.cargoStatus);
        };
        if (dto.deliveryDate) {
            post.set('deliveryDate', dto.deliveryDate);
        };
        await post.save();
        if(isCreateDocumentAfterUpdating) {
            const document = await this.createDocumentOnPostCreating(post);
        };

        if (!post) {
            throw new HttpException('Error When Post Updating', HttpStatus.NOT_FOUND);
        }
        this.gateway.emit(EventNameEnum.OnPostUpdate, post);
        return post;
    }

    async createDocumentOnPostCreating(post: Post) {
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        };

        const createData: CreateDocumentDto = {
            addressFrom: '-',
            addressTo: '-',
            comment: "default comment",
            docType: 1,
            sum: post.summ,
            isSystem: true,
            clientId: post.customerId || post.userId,
            recipientId: post.userId,
            postBasisId: post.id,
            status: 1
        }

        const document = await this.documentService.create(createData);
        if(document?.id) {
            await post.update({ documentId: document.id });
        };

        return document;
    }

    async searchPosts(value: string): Promise<Post[]> {
        if (!value) {
            return [];
        }
    
        const whereConditions = [
            !Number.isNaN(Number(value)) ? { id: { [Op.eq]: Number(value) } } : null, // Только если это число
            { title: { [Op.iLike]: `%${value}%` } },
            { content: { [Op.iLike]: `%${value}%` } },
            { addressFrom: { [Op.iLike]: `%${value}%` } },
            { addressTo: { [Op.iLike]: `%${value}%` } },
            { postNaming: { [Op.iLike]: `%${value}%` } },
            { trackCode: { [Op.iLike]: `%${value}%` } },
            { orderNumber: { [Op.iLike]: `%${value}%` } },
        ].filter(Boolean); // Удаляем null и undefined
    
        const posts = await this.postRepository.findAll({
            where: {
                [Op.or]: whereConditions,
            },
            include: { all: true },
            order: [['updatedAt', 'DESC']],
        });
    
        return posts;
    }
}
