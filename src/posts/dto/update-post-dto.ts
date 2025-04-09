import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({example: '1', description: "post id"})
    @IsString({message: "Must be a string"})
    readonly id: string;

    @ApiProperty({example: 'title', description: "Title"})
    @IsString({message: "Must be a string"})
    readonly title?: string;

    @ApiProperty({example: 'cont', description: "Content"})
    @IsString({message: "Must be a string"})
    readonly content?: string;

    @ApiProperty({example: 'Москва', description: "address From"})
    @IsString({message: "Must be a string"})
    readonly addressFrom?: string;

    @ApiProperty({example: 'Сухум', description: "address To"})
    @IsString({message: "Must be a string"})
    readonly addressTo?: string;

    @ApiProperty({example: 'Post', description: "PostName"})
    @IsString({message: "Must be a string"})
    readonly postNaming?: string;

    @ApiProperty({example: 'warehouse', description: "warehouse"})
    @IsString({message: "Must be a string"})
    readonly warehouse?: string;

    @ApiProperty({example: 23, description: "warehouse"})
    readonly warehouseId?: number;

    @ApiProperty({example: 123, description: "DriverId"})
    readonly driverId?: number;

    @ApiProperty({example: 123, description: "summ"})
    readonly summ?: number;

    @ApiProperty({example: 123, description: "commission"})
    readonly commission?: number;

    @ApiProperty({example: 123, description: "paid"})
    readonly paid?: number;

    @ApiProperty({example: 123, description: "price"})
    readonly price?: number;


    @ApiProperty({example: 1, description: "status"})
    readonly status?: number;

    @ApiProperty({example: 1, description: "cargoStatus"})
    readonly cargoStatus?: number;

    @ApiProperty({example: 1, description: "deliveryDate"})
    readonly deliveryDate?: number;
}