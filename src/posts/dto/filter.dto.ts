import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class FilterPostDto {
    @ApiProperty({example: 123, description: "userId", required: false})
    readonly userId?: number;

    @ApiProperty({example: 123, description: "customerId", required: false})
    readonly customerId?: number;

    @ApiProperty({example: 123, description: "driverId", required: false})
    readonly driverId?: number;

    @ApiProperty({example: 123, description: "Status", required: false})
    readonly status?: number;

    @ApiProperty({example: 123, description: "cargoStatus", required: false})
    readonly cargoStatus?: number;

    @ApiProperty({example: 123, description: "warehouseIs", required: false})
    readonly warehouseId?: number;

    @ApiProperty({example: true, description: "onlyForWarehouse", required: false})
    readonly onlyForWarehouse?: boolean;

}