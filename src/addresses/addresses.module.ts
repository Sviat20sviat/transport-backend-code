import { Module } from '@nestjs/common';
import { Address } from './addresses.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { GatewayModule } from 'src/gateway/gateway.module';
import { AddressService } from './addresses.service';
import { AddressesController } from './addresses.controller';

@Module({
    providers: [AddressService],
    controllers: [AddressesController],
    imports: [
      SequelizeModule.forFeature([Address]),
      GatewayModule
    ]
})
export class AddressesModule {}
