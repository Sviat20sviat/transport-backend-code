import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Warehouse } from './warehouses.model';
import { CreateWarehouseDto } from './dto/CreateWarehouseDto';
import { UpdateWarehouseDto } from './dto/UpdateWarehouseDto';
import { GetFilteredWarehousesDto } from './dto/GetFilteredDto';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectModel(Warehouse)
        private warehouseModel: typeof Warehouse,
    ) { }

    // Создание нового склада
    async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
        return this.warehouseModel.create(createWarehouseDto);
    }

    // Обновление существующего склада
    async update(id: number, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse> {
        const warehouse = await this.warehouseModel.findByPk(id);
        if (!warehouse) {
            throw new Error('Warehouse not found');
        }
        await warehouse.update(updateWarehouseDto);
        return warehouse;
    }

    // Получение всех складов
    async getAll(): Promise<Warehouse[]> {
        return this.warehouseModel.findAll({
            include: { all: true },
            order: [['updatedAt', 'DESC']],
        });
    }

    // Получение одного склада по ID
    async getOne(id: number): Promise<Warehouse> {
        const warehouse = await this.warehouseModel.findByPk(id);
        if (!warehouse) {
            throw new Error('Warehouse not found');
        }
        return warehouse;
    }

    // Удаление склада
    async delete(id: number): Promise<void> {
        const warehouse = await this.warehouseModel.findByPk(id);
        if (!warehouse) {
            throw new Error('Warehouse not found');
        }
        await warehouse.destroy();
    }

    // Получение отфильтрованных складов
    async getFiltered(filterDto: GetFilteredWarehousesDto): Promise<Warehouse[]> {
        const { address, supervisorId, workerIds, createdFrom, createdTo } = filterDto;

        const where: any = {};

        if (address) {
            where.address = { [Op.iLike]: `%${address}%` }; // Регистронезависимый поиск по части адреса
        }

        if (supervisorId) {
            where.supervisorId = supervisorId; // Точное совпадение руководителя
        }

        if (workerIds && workerIds.length > 0) {
            where.workerIds = { [Op.overlap]: workerIds }; // Пересечение с массивом работников
        }

        if (createdFrom || createdTo) {
            where.createdAt = {};
            if (createdFrom) {
                where.createdAt[Op.gte] = new Date(createdFrom); // Дата создания >= createdFrom
            }
            if (createdTo) {
                where.createdAt[Op.lte] = new Date(createdTo); // Дата создания <= createdTo
            }
        }

        return this.warehouseModel.findAll({
            where, 
            include: { all: true },
            order: [['updatedAt', 'DESC']],
        });
    }
}