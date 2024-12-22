import { ApiProperty } from "@nestjs/swagger";

export class SetUserFavoriteAddressDto {
    @ApiProperty({example: ["address1", "address2"], description: "Адреса"})
    readonly addresses: string[];
    @ApiProperty({example: '234234', description: "userId"})
    readonly userId: string;
}