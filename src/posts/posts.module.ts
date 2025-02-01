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
import { UsersModule } from 'src/users/users.module';
import { Address } from 'src/addresses/addresses.model';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Document, Address, Post ]),
    FilesModule,
    GatewayModule,
    DocumentsModule,
    UsersModule,
    AddressesModule
  ]
})
export class PostsModule {}
