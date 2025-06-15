import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ChangePasswordDto {

    @ApiPropertyOptional({ example: 1, description: 'ID пользователя' })
    userId: number;

    @ApiPropertyOptional({ example: 'password', description: 'password' })
    password: string;

}
