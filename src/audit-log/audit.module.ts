import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditLog } from './audit.model';
import { AuditService } from './audit.service';
import { AuditLogController } from './audit.controller';



@Module({
  imports: [
    SequelizeModule.forFeature([AuditLog]),
  ],
  controllers: [AuditLogController],
  providers: [AuditService],
  exports: [AuditService, SequelizeModule],
})
export class AuditLogModule {}