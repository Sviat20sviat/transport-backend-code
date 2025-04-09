import { ApiProperty } from '@nestjs/swagger';

export class GetFilteredDto {
  @ApiProperty({ example: 'ООО ГРУЗОПЕРЕВОЗКИ АСЛАН', description: 'Название организации' })
  readonly organization?: string;

  @ApiProperty({ example: 'Центральный', description: 'Район' })
  readonly district?: string;

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя ответственного лица' })
  readonly name?: string;

  @ApiProperty({ example: 'ул. Ленина, д. 10', description: 'Адрес' })
  readonly address?: string;

  @ApiProperty({ example: '+7 (999) 123-45-67', description: 'Номер телефона' })
  readonly phone?: string;

  @ApiProperty({ example: '1', description: 'ID статуса адреса' })
  readonly addressStatusId?: number;

  @ApiProperty({ example: '55.75396, 37.62039', description: 'Координаты местоположения' })
  readonly location?: number;

  @ApiProperty({ example: {fromTime: 2313, toTime: 234234}, description: 'Период создания' })
  readonly createdAt?: {fromTime: number, toTime: number};

  @ApiProperty({ example: 1, description: 'Тип Адреса' })
  readonly addressType?: number;
}