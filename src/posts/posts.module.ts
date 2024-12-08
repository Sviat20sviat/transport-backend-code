import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { GatewayModule } from 'src/gateway/gateway.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { Document } from 'src/documents/documents.model';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Document, Post ]),
    FilesModule,
    GatewayModule,
    DocumentsModule
  ]
})
export class PostsModule {}
