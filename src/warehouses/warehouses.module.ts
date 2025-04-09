import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { GatewayModule } from 'src/gateway/gateway.module';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { Warehouse } from './warehouses.model';
import { WarehouseService } from './warehouses.service';
import { WarehouseController } from './warehouses.controller';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [
    SequelizeModule.forFeature([Warehouse, User, Post]),
    RolesModule,
    forwardRef(() => AuthModule),
    GatewayModule,
  ],
  exports: [
    WarehouseService,
  ]
})
export class WarehousesModule {}