import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class setPostStatusDto {

    @ApiProperty({example: '234234', description: "Post Id"})
    readonly id: number;

    @ApiProperty({example: 1, description: "Post Status"})
    readonly status: number;
}