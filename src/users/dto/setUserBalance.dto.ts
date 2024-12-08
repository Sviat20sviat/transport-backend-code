import { ApiProperty } from "@nestjs/swagger";

export class SetUserBalanceDto {
    @ApiProperty({example: 1200, description: "Баланс"})
    readonly balance: number;
    @ApiProperty({example: '234234', description: "userId"})
    readonly userId: string;
}