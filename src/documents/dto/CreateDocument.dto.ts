import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'Болгария', description: 'Адрес отправления' })
  addressFrom: string;

  @ApiProperty({ example: 'Сухум', description: 'Адрес получения' })
  addressTo: string;

  @ApiProperty({ example: 'Комментарий', description: 'Комментарий к записи' })
  comment: string;

  @ApiProperty({ example: 1, description: 'Тип документа' })
  docType: number;

  @ApiProperty({ example: 2200, description: 'Сумма' })
  sum: number;

  @ApiProperty({ example: false, description: 'Системная ли запись' })
  isSystem: boolean;

  @ApiProperty({ example: 31233, description: 'ID клиента' })
  clientId: number;

  @ApiProperty({ example: 4322, description: 'ID создателя' })
  recipientId: number;

  @ApiProperty({ example: 1, description: 'ID заказа основания' })
  postBasisId?: number;

  @ApiProperty({ example: 1, description: 'ID документа основания' })
  documentBasisId?: number;

  @ApiProperty({ example: 1, description: 'Баланс ПОльзователя ДО операции' })
  userBalanseBefore?: number;

  @ApiProperty({ example: 1, description: 'Баланс ПОльзователя ДО операции' })
  userBalanseAfter?: number;

  @ApiProperty({ example: 1, description: 'status' })
  status?: number;

  @ApiProperty({ example: 1, description: 'salesChannel' })
  salesChannel?: number;
}


