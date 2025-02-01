import { Module } from '@nestjs/common';
import { Address } from './addresses.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { GatewayModule } from 'src/gateway/gateway.module';
import { AddressService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Post } from 'src/posts/posts.model';

@Module({
    providers: [AddressService],
    controllers: [AddressesController],
    imports: [
      SequelizeModule.forFeature([Post, Address]),
      GatewayModule
    ]
})
export class AddressesModule {}
