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


    @ApiProperty({example: '234234', description: "UserId"})
    readonly userId: number;

    @ApiProperty({example: '234234', description: "customerId"})
    readonly customerId: number;
}