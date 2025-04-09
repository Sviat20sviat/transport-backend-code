import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { Document } from 'src/documents/documents.model';
import { FilesModule } from 'src/files/files.module';
import { GatewayModule } from 'src/gateway/gateway.module';
import { DocumentService } from './documents.service';
import { DocumentController } from './documents.controller';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
    providers: [DocumentService],
    controllers: [DocumentController],
    imports: [
      SequelizeModule.forFeature([User, Post, Document]),
      FilesModule,
      GatewayModule,
      UsersModule,
      forwardRef(() => PostsModule),
      
    ],
    exports:[DocumentService]
})
export class DocumentsModule {}
