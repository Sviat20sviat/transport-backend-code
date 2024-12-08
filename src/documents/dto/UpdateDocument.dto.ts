import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateDocumentDto {
    @ApiPropertyOptional({ example: 'Болгария', description: 'Адрес отправления' })
    addressFrom?: string;
  
    @ApiPropertyOptional({ example: 'Сухум', description: 'Адрес получения' })
    addressTo?: string;
  
    @ApiPropertyOptional({ example: 'Комментарий', description: 'Комментарий к записи' })
    comment?: string;
  
    @ApiPropertyOptional({ example: 1, description: 'Тип документа' })
    docType?: number;
  
    @ApiPropertyOptional({ example: 2200, description: 'Сумма' })
    sum?: number;
  
    @ApiPropertyOptional({ example: false, description: 'Системная ли запись' })
    isSystem?: boolean;
  }