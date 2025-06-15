import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileModel } from './file.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileController } from './files.controller';
import { AuditLogModule } from 'src/audit-log/audit.module';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [
    SequelizeModule.forFeature([FileModel]),
    AuditLogModule
  ],
  controllers: [
    FileController,
  ]
})
export class FilesModule {}
