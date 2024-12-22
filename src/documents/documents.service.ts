import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from 'src/documents/documents.model';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
import { FilterDocumentDto } from './dto/FilterDocument.dto';
import { UpdateDocumentDto } from './dto/UpdateDocument.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document) private readonly documentModel: typeof Document,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
    ) { }

    // Создание документа
    async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
        let user: User;
        if(createDocumentDto.clientId && (createDocumentDto.docType == 1 || createDocumentDto.docType == 2)) {
            user = await this.userService.getUserById(JSON.stringify(createDocumentDto.clientId));

            if(user) {
                createDocumentDto.userBalanseBefore = user?.balance || 0;
                if(createDocumentDto.docType == 1) {
                    createDocumentDto.userBalanseAfter = (+user?.balance || 0) - (+createDocumentDto.sum);
                }

                if(createDocumentDto.docType == 2) {
                    createDocumentDto.userBalanseAfter = (+user?.balance || 0) + (+createDocumentDto.sum);
                }
            }
        }
        const document = await this.documentModel.create(createDocumentDto);
        if(document?.docType == 1) {
            const currentUserBalance = +user?.balance || 0;
            let userBalanceAfterOperation = currentUserBalance;

            userBalanceAfterOperation = userBalanceAfterOperation - (createDocumentDto.sum);


            this.userService.setUserBalance({userId: JSON.stringify(document.clientId), balance: userBalanceAfterOperation })
        }
        if(document?.docType == 2) {
            console.log(document)   
            const currentUserBalance = user?.balance || 0;
            let userBalanceAfterOperation = currentUserBalance;

            userBalanceAfterOperation = +userBalanceAfterOperation + (+createDocumentDto.sum);

            this.userService.setUserBalance({userId: JSON.stringify(document.clientId), balance: userBalanceAfterOperation })
        }

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

        return await this.documentModel.findAll({ where, include: {all: true}});
    }

    // Получение одного документа по ID
    async findOne(id: number): Promise<Document> {
        return await this.documentModel.findOne({ where: {id}, include: {all: true}});
    }

    // Обновление документа
    async update(id: number, updateDto: UpdateDocumentDto): Promise<Document> {
        const document = await this.findOne(id);
        if (!document) {
            throw new Error('Document not found');
        }

        return await document.update(updateDto);
    }

    // Удаление документа
    async delete(id: number): Promise<void> {
        const document = await this.findOne(id);
        if (!document) {
            throw new Error('Document not found');
        }

        await document.destroy();
    }
}
