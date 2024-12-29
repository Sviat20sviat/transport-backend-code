
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class FilterDocumentDto {
    @ApiPropertyOptional({ example: 'Болгария', description: 'Адрес отправления' })
    addressFrom?: string;
  
    @ApiPropertyOptional({ example: 'Сухум', description: 'Адрес получения' })
    addressTo?: string;
  
    @ApiPropertyOptional({ example: 1, description: 'Тип документа' })
    docType?: number;
  
    @ApiPropertyOptional({ example: false, description: 'Системная ли запись' })
    isSystem?: boolean;

    @ApiPropertyOptional({ example: {fromTime: 2313, toTime: 234234}, description: 'период создания' })
    createdAt?: {fromTime: number, toTime: number};
  }
  