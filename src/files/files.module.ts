import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileModel } from './file.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileController } from './files.controller';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [
    SequelizeModule.forFeature([FileModel]),
  ],
  controllers: [
    FileController,
  ]
})
export class FilesModule {}
