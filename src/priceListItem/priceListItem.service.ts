import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PriceListItem } from './priceListItem.model';
import { CreatePriceListItemDto } from './dto/CreatePriceListItem.dto';
import { UniqueConstraintError } from 'sequelize';
import { EventNameEnum, TransportGateway } from 'src/gateway/gateway';
import { UpdatePriceListItemDto } from './dto/UpdatePriceListItem.dto';
import { AuditService } from 'src/audit-log/audit.service';

// import { CreatePriceCategoryDto } from './dto/create-price-category.dto';
// import { UpdatePriceCategoryDto } from './dto/update-price-category.dto';

@Injectable()
export class PriceListItemService {
    constructor(
        @InjectModel(PriceListItem)
        private priceItemRepository: typeof PriceListItem,
        private gateway: TransportGateway
    ) { }

    async getOne(id: string | number) {
        const priceItem = await this.priceItemRepository.findOne({ where: { id }, include: { all: true } });
        if (priceItem) {
            return priceItem;
        };
        throw new HttpException('priceItem not found', HttpStatus.NOT_FOUND);
    }

    async create(dto: CreatePriceListItemDto): Promise<PriceListItem> {
        console.log('create PRICE ITEM======', dto)
        try {
            const newItem = await this.priceItemRepository.create(dto);
            this.gateway.emit(EventNameEnum.OnPriceListUpdate, newItem);
            return newItem;
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new ConflictException(
                    ` уже существует.`
                );
            } else {
                console.log('create PRICE ITEMERR', error)
                throw new InternalServerErrorException(
                    'Произошла внутренняя ошибка сервера при создании категории.'
                );
            }
        }
    }

    async findAll(): Promise<PriceListItem[]> {
        return this.priceItemRepository.findAll({ include: { all: true } });
    }

    async edit(dto: UpdatePriceListItemDto): Promise<PriceListItem> {
        const item: PriceListItem = await this.priceItemRepository.findOne({ where: { id: dto.id }, include: { all: true } });
    
        if (!item) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        };

        if (dto.categoryId) {
            item.set('categoryId', dto.categoryId);
        };
        if (dto.commission) {
            item.set('commission', dto.commission);
        };
        if (dto.name) {
            item.set('name', dto.name);
        };
        if (dto.sum) {
            item.set('sum', dto.sum);
        };

        await item.save();
        this.gateway.emit(EventNameEnum.OnPriceListUpdate, item);
        return item;
    }

    async delete(id) {
        const priceItem = await this.priceItemRepository.findOne({ where: { id: id }, include: { all: true } });

        if (priceItem) {
          await priceItem.destroy();
          this.gateway.emit(EventNameEnum.OnPriceListUpdate, priceItem);
          return priceItem;
        };
        throw new HttpException('priceCategory not found', HttpStatus.NOT_FOUND);
    }
}