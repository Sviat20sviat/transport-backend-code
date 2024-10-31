import { ApiProperty } from "@nestjs/swagger";

export class deletePostDto {
    @ApiProperty({example: '234234', description: "POST Id"})
    readonly id: number;
}