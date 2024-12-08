import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { GatewayModule } from "./gateway/gateway.module";
import { PostProductsModule } from './post-products/post-products.module';
import { AddressesModule } from './addresses/addresses.module';
import { DocumentsModule } from './documents/documents.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
      ConfigModule.forRoot({
        envFilePath:`.env`
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRESS_HOST,
        port: Number(process.env.POSTGRESS_PORT),
        username: process.env.POSTGRESS_USER,
        password: process.env.POSTGRESS_PASSWORD,
        database: process.env.POSTGRESS_DB,
        models: [User, Role, UserRoles, Post],
        autoLoadModels: true
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      PostsModule,
      FilesModule,
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname,'static'),
      }),
      GatewayModule,
      PostProductsModule,
      AddressesModule,
      DocumentsModule,
    ],
})
export class AppModule {

}