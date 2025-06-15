import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PriceListItem } from './priceListItem.model';
import { PriceListCategoryModule } from 'src/priceListCategory/priceListCategory.module';
import { PriceListItemService } from './priceListItem.service';
import { PriceListItemController } from './priceListItem.controller';
import { GatewayModule } from 'src/gateway/gateway.module';
import { AuditLogModule } from 'src/audit-log/audit.module';

@Module({
  imports: [
    // Регистрируем модель PriceItem для использования в этом модуле.
    SequelizeModule.forFeature([PriceListItem]),

    // Импортируем PriceCategoryModule, чтобы PriceItemService
    // мог получить доступ к PriceCategoryService (например, для проверки
    // существования категории перед созданием/обновлением позиции).
    // PriceCategoryService теперь можно будет внедрить в PriceItemService.
    PriceListCategoryModule,
    GatewayModule,
    AuditLogModule
  ],
  // Регистрируем контроллер для позиций прайс-листа.
  controllers: [PriceListItemController],
  // Регистрируем сервис для позиций прайс-листа.
  providers: [PriceListItemService],
  // Экспортируем сервис и SequelizeModule (для репозитория PriceItem), если они понадобятся в других модулях.
  exports: [PriceListItemService, SequelizeModule],
})
export class PriceItemModule {}