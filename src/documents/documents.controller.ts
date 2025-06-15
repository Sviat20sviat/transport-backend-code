import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Document } from 'src/documents/documents.model';
import { DocumentService } from './documents.service';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
import { FilterDocumentDto } from './dto/FilterDocument.dto';
import { UpdateDocumentDto } from './dto/UpdateDocument.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AuditService } from 'src/audit-log/audit.service';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService, private auditService: AuditService) { }

    @ApiOperation({ summary: 'Создать новый документ' })
    @ApiBody({type: CreateDocumentDto})
    @Roles('Admin')
    @Post()
    async create(@Body() createDto: CreateDocumentDto, @Req() request): Promise<Document> {
        const item = await this.documentService.create(createDto);

        this.auditService.logAction(
            'create',
            'Document',
            item.id,
            null,
            item,
            request?.user?.id,
            request?.user
        );
        return item;
    }

    @ApiOperation({ summary: 'Получить список документов с фильтрацией' })
    @ApiBody({type: FilterDocumentDto})
    @Roles('Admin')
    @Post('/getFiltered')
    async findAll(@Body() filterDto: FilterDocumentDto): Promise<Document[]> {
        return this.documentService.findAll(filterDto);
    }

    @ApiOperation({ summary: 'Получить документ по ID' })
    @ApiParam({ name: 'id', description: 'Идентификатор документа' })
    @Roles('Admin')
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Document> {
        return this.documentService.findOne(id);
    }

    @ApiOperation({ summary: 'Обновить документ' })
    @ApiParam({ name: 'id', description: 'Идентификатор документа' })
    @Roles('Admin')
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateDto: UpdateDocumentDto, 
        @Req() request
    ): Promise<Document> {

        const itemBeforeUpdate = await this.documentService.findOne(id);

        const item = await this.documentService.update(id, updateDto);

        this.auditService.logAction(
            'update',
            'Document',
            item.id,
            itemBeforeUpdate,
            item,
            request?.user?.id,
            request?.user
        );
        return item;
    }

    @ApiOperation({ summary: 'Удалить документ' })
    @ApiParam({ name: 'id', description: 'Идентификатор документа' })
    @Roles('Admin')
    @Delete(':id')
    async delete(@Param('id') id: number, @Req() request): Promise<void> {
        const itemBeforeUpdate = await this.documentService.findOne(id);

        const item = await this.documentService.delete(id);

        this.auditService.logAction(
            'delete',
            'Document',
            item.id,
            itemBeforeUpdate,
            null,
            request?.user?.id,
            request?.user
        );
        return item;
    }
}
