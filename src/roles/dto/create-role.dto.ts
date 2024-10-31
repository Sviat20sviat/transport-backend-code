import { ApiProperty } from "@nestjs/swagger";

export class createRoleDto {
    @ApiProperty({example: 'Admin', description: "Role"})
    readonly value: string;
    @ApiProperty({example: 'some desc', description: "Description"})
    readonly description: string;
}