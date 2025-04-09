import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 'ООО ГРУЗОПЕРЕВОЗКИ АСЛАН', description: 'Название организации' })
  readonly organization: string;

  @ApiProperty({ example: 'Центральный', description: 'Район' })
  readonly district: string;

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя ответственного лица' })
  readonly name: string;

  @ApiProperty({ example: 'г. Москва, ул. Ленина, д. 10', description: 'Адрес' })
  readonly address: string;

  @ApiProperty({ example: 'строение 2', description: 'Строение' })
  readonly build: string;

  @ApiProperty({ example: 1, description: 'Расположение' })
  readonly location?: number;

  @ApiProperty({ example: 1, description: 'addressStatusId' })
  readonly addressStatusId?: number;

  @ApiProperty({ 
    example: { type: 'Point', coordinates: [37.6173, 55.7558] },
    description: 'Координаты',
  })
  readonly coordinates: Array<number>;

  @ApiProperty({ example: '+7 (999) 123-45-67', description: 'Телефон' })
  readonly phone: string;

  @ApiProperty({ example: 'Действующий', description: 'Статус адреса' })
  readonly addressStatus: string;

  @ApiProperty({ example: 'Нужна доставка в выходные', description: 'Комментарий' })
  readonly comment: string;

  @ApiProperty({ example: 1, description: 'Тип Адреса' })
  readonly addressType: number;
}