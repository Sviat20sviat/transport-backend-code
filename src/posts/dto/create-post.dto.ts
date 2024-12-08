import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class createPostDto {
    @ApiProperty({example: 'title', description: "Title"})
    @IsString({message: "Must be a string"})
    readonly title: string;

    @ApiProperty({example: 'cont', description: "Content"})
    @IsString({message: "Must be a string"})
    readonly content: string;

    @ApiProperty({example: 'Москва', description: "address From"})
    @IsString({message: "Must be a string"})
    readonly addressFrom: string;

    @ApiProperty({example: 'Сухум', description: "address To"})
    @IsString({message: "Must be a string"})
    readonly addressTo: string;

    @ApiProperty({example: 'Post', description: "PostName"})
    @IsString({message: "Must be a string"})
    readonly postNaming: string;

    @ApiProperty({example: 'warehouse', description: "warehouse"})
    @IsString({message: "Must be a string"})
    readonly warehouse: string;

    @ApiProperty({example: 2, description: "cargoStatus"})
    readonly cargoStatus: string;

    @ApiProperty({example: 2, description: "deliveryDate"})
    readonly deliveryDate: number; 

    @ApiProperty({example: 'deliveryType', description: "deliveryType"})
    @IsString({message: "Must be a string"})
    readonly deliveryType: string;

    @ApiProperty({example: 'trackCode', description: "trackCode"})
    @IsString({message: "Must be a string"})
    readonly trackCode: string;


    @ApiProperty({example: 'orderNumber', description: "orderNumber"})
    @IsString({message: "Must be a string"})
    readonly orderNumber: string;


    @ApiProperty({example: 'cargoPickupComment', description: "cargoPickupComment"})
    @IsString({message: "Must be a string"})
    readonly cargoPickupComment: string;


    @ApiProperty({example: 'cargoCharacter', description: "cargoCharacter"})
    @IsString({message: "Must be a string"})
    readonly cargoCharacter: string;

    @ApiProperty({example: 'cargoCharacter', description: "cargoCharacter"})
    @IsString({message: "Must be a string"})
    readonly cargoCharacterComment: string;

    @ApiProperty({example: 'cargoCharacterSize', description: "cargoCharacterSize"})
    @IsString({message: "Must be a string"})
    readonly cargoCharacterSize: string;

    @ApiProperty({example: 2, description: "cargoCharacterSizeAll"})
    readonly cargoCharacterSizeAll: number; 

    @ApiProperty({example: 'cargoCharacterWeight', description: "cargoCharacterWeight"})
    @IsString({message: "Must be a string"})
    readonly cargoCharacterWeight: string; 

    @ApiProperty({example: false, description: "isFragile"})
    readonly isFragile: boolean;

    @ApiProperty({example: 'additionalContactFullName', description: "additionalContactFullName"})
    @IsString({message: "Must be a string"})
    readonly additionalContactFullName: string; 

    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalContactPhone: string; 

    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalContactPhoneSec: string; 


    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalComment: string; 

    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalRecipientFullName: string; 

    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalRecipientPhone: string; 

    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalRecipientComment: string; 

    @ApiProperty({example: 'additionalContactPhone', description: "additionalContactPhone"})
    @IsString({message: "Must be a string"})
    readonly additionalFloor: string;

    @ApiProperty({example: false, description: "isFragile"})
    readonly additionalFriagle: boolean;




    @ApiProperty({example: '234234', description: "UserId"})
    readonly userId: number;

    @ApiProperty({example: '234234', description: "customerId"})
    readonly customerId: number;
}