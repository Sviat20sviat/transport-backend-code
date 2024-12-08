import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService,
        private gateway: TransportGateway,
        private documentService: DocumentService
    ) {

    }

    async createPost(dto: createPostDto, image) {
        console.log('createPost!',dto);
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName || "", status: 0});
        if(post) {
            this.gateway.emit(EventNameEnum.OnPostCreate, post);
            await this.createDocumentOnPostCreating(post);
            const postUpdated = await this.getOne(post.id.toString())
            if(!postUpdated) {
                throw new HttpException('Error When Post Creating', HttpStatus.NOT_FOUND);
            }
            return postUpdated;
        }
        throw new HttpException('Error When Post Creating', HttpStatus.NOT_FOUND);
    }

    async getAllPosts() {
        const posts = await this.postRepository.findAll({include: {all: true}, order: [['updatedAt', 'DESC']],});
        return posts;
    }

    async getAllCheckedPosts() {
        const posts = await this.postRepository.findAll({where: {status: 1},include: {all: true}});
        return posts;
    }

    async getFilteredPosts(filtedDto: FilterPostDto) {
        const where: any = {};

        if(filtedDto?.status || filtedDto?.status == 0) {
            where.status = filtedDto.status;
        };
        if(filtedDto?.userId) {
            where.userId = filtedDto.userId;
        };
        if(filtedDto?.driverId) {
            where.driverId = filtedDto.driverId;
        };
        const posts = await this.postRepository.findAll({where,include: {all: true}});
        return posts;
    }

    async deletePost(dto: deletePostDto) {
        const post = await this.postRepository.findOne({where: {id: dto.id}, include: {all: true}});
        // this.postRepository
        if(post) {
            await post.destroy();
            this.gateway.emit(EventNameEnum.OnPostDelete, post);
            return {
                deleted: true
            }
        };
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async setPostStatus(dto: setPostStatusDto) {
        const post = await this.postRepository.findOne({where: {id: dto.id}, include: {all: true}});
        // this.postRepository
        if(post) {
            post.set('status', dto.status)
            await post.save();
            this.gateway.emit(EventNameEnum.OnPostUpdate, post);
            return post;
        };
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async getOne(id: string) {
        const post = await this.postRepository.findOne({where: {id}, include: {all: true}});
        if(post) {
            return post;
        };
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async updatePost(dto: UpdatePostDto) {
        const post = await this.postRepository.findOne({where: {id: dto.id}, include: {all: true}});
        if(!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        };

        if(dto.addressFrom) {
            post.set('addressFrom', dto.addressFrom);
        };
        if(dto.addressTo) {
            post.set('addressTo', dto.addressTo);
        };
        if(dto.commission) {
            post.set('commission', dto.commission);
        };
        if(dto.content) {
            post.set('content', dto.content);
        };
        if(dto.driverId) {
            post.set('driverId', dto.driverId);
        };
        if(dto.paid) {
            post.set('paid', dto.paid);
        };
        if(dto.postNaming) {
            post.set('postNaming', dto.postNaming);
        };

        if(dto.price) {
            post.set('price', dto.price);
        };
        if(dto.status) {
            post.set('status', dto.status);
        };

        if(dto.summ) {
            post.set('summ', dto.summ);
        };
        if(dto.title) {
            post.set('title', dto.title);
        };
        if(dto.warehouse) {
            post.set('warehouse', dto.warehouse);
        };
        await post.save();
        this.gateway.emit(EventNameEnum.OnPostUpdate, post);
        return post;
    }

    async createDocumentOnPostCreating (post: Post) {
        if(!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        };

        const createData: CreateDocumentDto = {
            addressFrom: '-',
            addressTo: '-',
            comment: "default comment",
            docType: 1,
            sum: post.summ,
            isSystem: true,
            clientId: post.customerId,
            recipientId: post.userId,
            postBasisId: post.id
        }

        const document = await this.documentService.create(createData);
        return document;
    }
}
