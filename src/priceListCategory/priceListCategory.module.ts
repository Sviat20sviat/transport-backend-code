import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PriceListCategory } from './priceListCategory.model';
import { PriceListCategoryService } from './priceListCategory.service';
import { PriceListCategoryController } from './priceListCategory.controller';
import { AuditLogModule } from 'src/audit-log/audit.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PriceListCategory]),
    AuditLogModule,
    GatewayModule,
  ],
  controllers: [PriceListCategoryController],
  providers: [PriceListCategoryService],
  exports: [PriceListCategoryService, SequelizeModule],
})
export class PriceListCategoryModule {}