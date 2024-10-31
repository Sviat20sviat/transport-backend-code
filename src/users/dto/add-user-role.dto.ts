import { ApiProperty } from "@nestjs/swagger";

export class AddUserRoleDto {
    @ApiProperty({example: 'Admin', description: "Role"})
    readonly value: string;
    @ApiProperty({example: '234234', description: "userId"})
    readonly userId: string;
}