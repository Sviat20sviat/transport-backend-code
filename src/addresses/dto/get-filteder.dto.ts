import { ApiProperty } from '@nestjs/swagger';

export class GetFilteredDto {
  @ApiProperty({ example: 'ООО ГРУЗОПЕРЕВОЗКИ АСЛАН', description: 'Название организации' })
  readonly organization?: string;

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя ответственного лица' })
  readonly name?: string;

  @ApiProperty({ example: 'Действующий', description: 'Статус адреса' })
  readonly addressStatus?: string;


  @ApiProperty({ example: 1, description: 'Тип Адреса' })
  readonly addressType?: number;
}