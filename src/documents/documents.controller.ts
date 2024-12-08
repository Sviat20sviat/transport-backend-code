import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Document } from 'src/documents/documents.model';
import { DocumentService } from './documents.service';
import { CreateDocumentDto } from './dto/CreateDocument.dto';
import { FilterDocumentDto } from './dto/FilterDocument.dto';
import { UpdateDocumentDto } from './dto/UpdateDocument.dto';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) { }

    @ApiOperation({ summary: 'Создать новый документ' })
    @ApiBody({type: CreateDocumentDto})
    @Roles('Admin')
    @Post()
    async create(@Body() createDto: CreateDocumentDto): Promise<Document> {
        return this.documentService.create(createDto);
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
    ): Promise<Document> {
        return this.documentService.update(id, updateDto);
    }

    @ApiOperation({ summary: 'Удалить документ' })
    @ApiParam({ name: 'id', description: 'Идентификатор документа' })
    @Roles('Admin')
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.documentService.delete(id);
    }
}
