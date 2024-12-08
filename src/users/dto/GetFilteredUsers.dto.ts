import { ApiProperty } from "@nestjs/swagger";

export class GetFilteredUsersDto {
    @ApiProperty({example: '232323', description: "status"})
    readonly status?: string;

    @ApiProperty({example: 12, description: "roleId"})
    readonly roleId?: number;
}