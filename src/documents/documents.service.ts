import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from 'src/documents/documents.model';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
import { FilterDocumentDto } from './dto/FilterDocument.dto';
import { UpdateDocumentDto } from './dto/UpdateDocument.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { Op } from 'sequelize';
import { PostsService } from 'src/posts/posts.service';
import { EventNameEnum, TransportGateway } from 'src/gateway/gateway';
import { FilterPostDto } from 'src/posts/dto/filter.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post-dto';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document) private readonly documentModel: typeof Document,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        @Inject(forwardRef(() => PostsService))
        private postService: PostsService,
        private gateway: TransportGateway,
    ) { }

    // Создание документа
    async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
        let user: User;
        if (createDocumentDto.clientId && (createDocumentDto.docType == 1 || createDocumentDto.docType == 2)) {
            user = await this.userService.getUserById(createDocumentDto.clientId);
            console.log("userOnDocCreation",user);
            if (user) {
                createDocumentDto.userBalanseBefore = user?.balance || 0;
                if (createDocumentDto.docType === 1) {
                    createDocumentDto.userBalanseAfter = (+user?.balance || 0) - (+createDocumentDto.sum);
                } else if (createDocumentDto.docType === 2) {
                    createDocumentDto.userBalanseAfter = (+user?.balance || 0) + (+createDocumentDto.sum);
                };
            };
        }
        const document = await this.documentModel.create(createDocumentDto);
        if (document?.docType == 1) {
            // "Списание со счета Пользователя"
            const currentUserBalance = +user?.balance || 0;
            let userBalanceAfterOperation = currentUserBalance;

            userBalanceAfterOperation = userBalanceAfterOperation - (createDocumentDto.sum);


            this.userService.setUserBalance({ userId: document.clientId, balance: userBalanceAfterOperation });
        }
        if (document?.docType == 2) {
            // "Пополнение счета Пользователя"
            const currentUserBalance = user?.balance || 0;
            let userBalanceAfterOperation = currentUserBalance;

            userBalanceAfterOperation = +userBalanceAfterOperation + (+createDocumentDto.sum);

            this.userService.setUserBalance({ userId: document.clientId, balance: userBalanceAfterOperation });
            const data: FilterPostDto = {
                customerId: user.id,
            };
            const userPosts = await this.postService.getFilteredPosts(data);
            const notPaidPosts = userPosts?.filter((post) => post.summ - post.paid > 0)?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            let replenishmentAmount: number = Number(document.sum);

            if(document.userBalanseBefore > 0) {
                replenishmentAmount += Number(document.userBalanseBefore);
            };


            for (let index = 0; index < notPaidPosts?.length; index++) {
                const post = notPaidPosts[index];

                const postSum = Number(post.summ);
                const postPaid = Number(post.paid);

                let difference = (replenishmentAmount - postSum) + postPaid;
                if(difference > 0) {
                    replenishmentAmount = (replenishmentAmount - postSum) + postPaid;
                    const updatePostData: UpdatePostDto = {
                        id: post?.id.toString(),
                        paid: postSum
                    };
                    await this.postService.updatePost(updatePostData);

                } else if (difference === 0) {
                    const updatePostData: UpdatePostDto = {
                        id: post?.id.toString(),
                        paid: postSum
                    };
                    await this.postService.updatePost(updatePostData);
                    replenishmentAmount = 0;
                    break;
                } else if (difference < 0) {
                    const postPaided = postSum + difference;
                    const updatePostData: UpdatePostDto = {
                        id: post?.id.toString(),
                        paid: postPaided
                    };
                    await this.postService.updatePost(updatePostData);
                    break;
                };
            };
        }
        this.gateway.emit(EventNameEnum.OnDocumentCreate, document);
        return document;
    }

    // Получение всех документов с возможностью фильтрации
    async findAll(filterDto: FilterDocumentDto): Promise<Document[]> {
        const where: any = {};

        // Добавляем фильтры, если они указаны
        if (filterDto.addressFrom) where.addressFrom = filterDto.addressFrom;
        if (filterDto.addressTo) where.addressTo = filterDto.addressTo;
        if (filterDto.docType) where.docType = filterDto.docType;
        if (filterDto.isSystem !== undefined) where.isSystem = filterDto.isSystem;
        if (filterDto?.userId) where.clientId = filterDto.userId;
        if (filterDto?.userId) where.recipientId = filterDto.userId;
        if (filterDto?.salesChannel) where.salesChannel = filterDto.salesChannel;

        // Add createdAt filter if fromTime and toTime are provided
        if (filterDto.createdAt && filterDto.createdAt.fromTime && filterDto.createdAt.toTime) {
            where.createdAt = {
                [Op.between]: [
                    new Date(filterDto.createdAt.fromTime * 1000), // Convert to milliseconds
                    new Date(filterDto.createdAt.toTime * 1000),   // Convert to milliseconds
                ],
            };
        }

        return await this.documentModel.findAll({ where, include: { all: true }, order: [['updatedAt', 'DESC']]  });
    }

    // Получение одного документа по ID
    async findOne(id: number): Promise<Document> {
        return await this.documentModel.findOne({ where: { id }, include: { all: true } });
    }

    // Обновление документа
    async update(id: number, updateDto: UpdateDocumentDto): Promise<Document> {
        const document = await this.findOne(id);
        if (!document) {
            throw new Error('Document not found');
        }

        if(updateDto?.status !== document?.status) {
            if(updateDto?.status === 2 && document?.status === 1) {
                let user: User;
                user = await this.userService.getUserById(document.clientId);
                if (document?.docType == 1) {
                    const currentUserBalance = user?.balance || 0;
                    let userBalanceAfterOperation = +JSON.parse(JSON.stringify(currentUserBalance));
        
                    userBalanceAfterOperation = userBalanceAfterOperation + (document.sum);
        
        
                    this.userService.setUserBalance({ userId: document.clientId, balance: userBalanceAfterOperation })
                }
                if (document?.docType == 2) {
                    const currentUserBalance = user?.balance || 0;
                    let userBalanceAfterOperation = +JSON.parse(JSON.stringify(currentUserBalance));
        
                    userBalanceAfterOperation = userBalanceAfterOperation - (+document.sum);
        
                    this.userService.setUserBalance({ userId: document.clientId, balance: userBalanceAfterOperation })
                }
            }

            if(document?.postBasis?.id) {
                const post = await this.postService.getOne(document.postBasis.id.toString());
                if(post) {
                    if(document.status === 1 && updateDto?.status === 2) {
                        post.update('status', 4);
                    }
                    if(document.status === 2 && updateDto?.status === 1) {
                        post.update('status', 1);
                    }
                }
            }
        }
        if(updateDto?.sum && updateDto?.sum !== document?.sum) {
            console.log(updateDto?.sum,  document?.sum);
            const sumDiff: number = Number(document?.sum) - Number(updateDto?.sum);
            let user: User;
            user = await this.userService.getUserById(document.clientId);
            if(!user) {
                return;
            };
            const userBalanseAfter = Number(document.userBalanseAfter) + sumDiff;
            console.log(document.userBalanseAfter);
            console.log(sumDiff);
            console.log(userBalanseAfter);
            await document.update({ userBalanseAfter: userBalanseAfter });
            const userBalanceAfterUpdate = Number(user?.balance || 0) + sumDiff;
            this.userService.setUserBalance({ userId: document.clientId, balance: userBalanceAfterUpdate });
        }
        const updatedDocument = await document.update(updateDto);
        this.gateway.emit(EventNameEnum.OnDocumentUpdate, updatedDocument);
        return updatedDocument
    }

    // Удаление документа
    async delete(id: number): Promise<any> {
        const document = await this.findOne(id);
        if (!document) {
            throw new Error('Document not found');
        }

        await document.destroy();
        const response = {
            status: 'deleted',
            id: document?.id
        };
        this.gateway.emit(EventNameEnum.OnDocumentDelete, response);
        return response;
    }
}
