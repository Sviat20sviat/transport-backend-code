import { Module } from "@nestjs/common";
import { TransportGateway } from "./gateway";

@Module({
    exports: [TransportGateway],
    providers: [TransportGateway],
})

export class GatewayModule {

}