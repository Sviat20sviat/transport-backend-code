import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class GetPostDto {
    @ApiProperty({example: 2, description: "id"})
    readonly id: number;
}