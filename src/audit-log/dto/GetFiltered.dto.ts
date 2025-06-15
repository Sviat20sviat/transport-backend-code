
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class GetFiltereAutitLogsdDto {

    @ApiPropertyOptional({ example: 1, description: 'ID пользователя' })
    userId?: number;

    @ApiPropertyOptional({ example: 'string', description: 'action' })
    action?: string;

    @ApiPropertyOptional({ example: 'string', description: 'tableName' })
    tableName?: string;

    @ApiPropertyOptional({ example: {fromTime: 2313, toTime: 234234}, description: 'Период создания' })
    createdAt?: {fromTime: number, toTime: number};
  }
  