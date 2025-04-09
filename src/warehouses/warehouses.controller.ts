import { Body, Controller, Post, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { WarehouseService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/CreateWarehouseDto';
import { Warehouse } from './warehouses.model';
import { UpdateWarehouseDto } from './dto/UpdateWarehouseDto';
import { GetFilteredWarehousesDto } from './dto/GetFilteredDto';

@ApiTags('Warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post('create')
  @ApiOperation({ summary: 'Создание нового склада' })
  @ApiBody({ type: CreateWarehouseDto })
  @ApiResponse({ status: 201, description: 'Склад успешно создан', type: Warehouse })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Обновление существующего склада' })
  @ApiBody({ type: UpdateWarehouseDto })
  @ApiResponse({ status: 200, description: 'Склад успешно обновлён', type: Warehouse })
  @ApiResponse({ status: 404, description: 'Склад не найден' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    return this.warehouseService.update(id, updateWarehouseDto);
  }

  @Post('getAll')
  @ApiOperation({ summary: 'Получение всех складов' })
  @ApiResponse({ status: 200, description: 'Список всех складов', type: [Warehouse] })
  async getAll(): Promise<Warehouse[]> {
    return this.warehouseService.getAll();
  }

  @Post('getOne/:id')
  @ApiOperation({ summary: 'Получение одного склада по ID' })
  @ApiResponse({ status: 200, description: 'Склад найден', type: Warehouse })
  @ApiResponse({ status: 404, description: 'Склад не найден' })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Warehouse> {
    return this.warehouseService.getOne(id);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Удаление склада по ID' })
  @ApiResponse({ status: 200, description: 'Склад успешно удалён' })
  @ApiResponse({ status: 404, description: 'Склад не найден' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.warehouseService.delete(id);
  }

  @Post('getFiltered')
  @ApiOperation({ summary: 'Получение отфильтрованных складов' })
  @ApiBody({ type: GetFilteredWarehousesDto })
  @ApiResponse({ status: 200, description: 'Список отфильтрованных складов', type: [Warehouse] })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFiltered(@Body() filterDto: GetFilteredWarehousesDto): Promise<Warehouse[]> {
    return this.warehouseService.getFiltered(filterDto);
  }
}