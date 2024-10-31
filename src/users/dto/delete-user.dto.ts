import { ApiProperty } from "@nestjs/swagger";

export class deleteUserDto {
    @ApiProperty({example: '232323', description: "Id"})
    readonly id: string;
}