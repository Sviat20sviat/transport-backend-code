import { ApiProperty } from "@nestjs/swagger";

export class setUserChatIdDto {
    @ApiProperty({example: '232323', description: "Id"})
    readonly id: string;

    @ApiProperty({example: '232323', description: "chatId"})
    readonly chatId: number;
}