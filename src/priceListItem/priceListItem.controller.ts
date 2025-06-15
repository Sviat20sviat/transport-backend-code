import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PriceListItemService } from './priceListItem.service';
import { PriceListItem } from './priceListItem.model';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePriceListItemDto } from './dto/CreatePriceListItem.dto';
import { UpdatePriceListItemDto } from './dto/UpdatePriceListItem.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AuditService } from 'src/audit-log/audit.service';

@ApiTags('Price Items')
@Controller('price-items')
export class PriceListItemController {
  constructor(
    private readonly priceListItemService: PriceListItemService, 
    private pricelistItemService: PriceListItemService, 
    private auditService: AuditService
  ) { }


  @Post()
  @ApiOperation({ summary: 'Создать новый элемент прайс-листа' })
  @ApiResponse({ status: 201, description: 'Элемент успешно создан.', type: PriceListItem })
  @ApiResponse({ status: 400, description: 'Неверные входные данные.' })
  @Roles('Admin')
  async create(@Body() createPriceCategoryDto: CreatePriceListItemDto, @Req() request) {
    const priceItem = await this.pricelistItemService.create(createPriceCategoryDto);

    this.auditService.logAction(
      'create',
      'PriceListItem',
      priceItem.id,
      null,
      priceItem,
      request?.user?.id,
      request?.user
    );
    return priceItem;
  }


  @Get()
  @ApiOperation({ summary: 'Получить список всех элементов прайс-листа' })
  @ApiResponse({ status: 200, description: '', type: [PriceListItem] })
  @Roles('Admin')
  findAll() {
    return this.priceListItemService.findAll();
  }

  @Post('/update')
  @ApiOperation({ summary: "Update PriceListItem" })
  @ApiResponse({ status: 201, description: 'Элемент успешно создан.', type: PriceListItem })
  @ApiResponse({ status: 400, description: 'Неверные входные данные.' })
  @ApiBody({ type: UpdatePriceListItemDto })
  @Roles('Admin')
  async update(@Body() dto: UpdatePriceListItemDto, @Req() request) {
    const beforeUpdate = await this.pricelistItemService.getOne(dto.id);
    const priceItem = await this.pricelistItemService.edit(dto);
    this.auditService.logAction(
      'create',
      'PriceListItem',
      priceItem.id,
      beforeUpdate,
      priceItem,
      request?.user?.id,
      request?.user
    );
    return priceItem;
  }

  @Post('/delete')
  @ApiOperation({ summary: 'Удалить элемент прайслиста' })
  @ApiResponse({ status: 201, description: 'элемент успешно удален.', type: PriceListItem })
  @ApiResponse({ status: 400, description: 'Неверные входные данные.' })
  async delete(@Body() dto: {id: number}, @Req() request) {
    const item = await this.pricelistItemService.delete(dto.id);
    this.auditService.logAction(
      'delete',
      'PriceListItem',
      item.id,
      null,
      item,
      request?.user?.id,
      request?.user
    );
    return item;
  }
}