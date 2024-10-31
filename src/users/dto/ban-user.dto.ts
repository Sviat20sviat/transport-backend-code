import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: 'SPAM', description: "Ban reason"})
    readonly banReason: string;
    @ApiProperty({example: '234234', description: "userId"})
    readonly userId: string;
}