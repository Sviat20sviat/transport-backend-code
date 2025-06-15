import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { PriceListCategoryService } from './priceListCategory.service';
import { PriceListCategory } from './priceListCategory.model';
import { CreatePriceCategoryDto } from './dto/CreatePriceCategoryDto.dto';
import { AfterCreate } from 'sequelize-typescript';
import { AuditService } from 'src/audit-log/audit.service';
// import { CreatePriceCategoryDto } from './dto/create-price-category.dto';
// import { UpdatePriceCategoryDto } from './dto/update-price-category.dto';

@ApiTags('Price Categories') // Группировка эндпоинтов в Swagger UI
@Controller('price-categories') // Базовый путь для этого контроллера
export class PriceListCategoryController {
  constructor(private readonly priceCategoryService: PriceListCategoryService, private auditService: AuditService) {}

  
  @Post()
  @ApiOperation({ summary: 'Создать новую категорию прайс-листа' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана.', type: PriceListCategory })
  @ApiResponse({ status: 400, description: 'Неверные входные данные.' })
  async create(@Body() createPriceCategoryDto: CreatePriceCategoryDto, @Req() request) {
    const item = await this.priceCategoryService.create(createPriceCategoryDto);
    this.auditService.logAction(
      'create',
      'PriceCategory',
      item.id,
      null,
      item,
      request?.user?.id,
      request?.user
    );
    return item;
  }

  @Post('/update')
  @ApiOperation({ summary: 'Обновить категорию прайс-листа' })
  @ApiResponse({ status: 201, description: 'Категория успешно обновлена.', type: PriceListCategory })
  @ApiResponse({ status: 400, description: 'Неверные входные данные.' })
  async update(@Body() createPriceCategoryDto: CreatePriceCategoryDto, @Req() request) {
    return
    const item = await this.priceCategoryService.create(createPriceCategoryDto);
    this.auditService.logAction(
      'update',
      'PriceCategory',
      item.id,
      null,
      item,
      request?.user?.id,
      request?.user
    );
    return item;
  }

  @Post('/delete')
  @ApiOperation({ summary: 'Удалить категорию прайс-листа' })
  @ApiResponse({ status: 201, description: 'Категория успешно удалена.', type: PriceListCategory })
  @ApiResponse({ status: 400, description: 'Неверные входные данные.' })
  async delete(@Body() dto: {id: number}, @Req() request) {
    const item = await this.priceCategoryService.delete(dto.id);
    this.auditService.logAction(
      'delete',
      'PriceCategory',
      item.id,
      null,
      item,
      request?.user?.id,
      request?.user
    );
    return item;
  }
  

  @Get()
  @ApiOperation({ summary: 'Получить список всех категорий прайс-листа' })
  @ApiResponse({ status: 200, description: 'Список категорий.', type: [PriceListCategory] })
  findAll() {
    return this.priceCategoryService.findAll();
  }

}