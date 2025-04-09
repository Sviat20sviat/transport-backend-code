import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsArray, IsInt } from 'class-validator';

export class GetFilteredWarehousesDto {
  @ApiProperty({ description: 'Часть адреса для фильтрации', example: 'Примерная', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Идентификатор руководителя', example: 1, required: false })
  @IsInt()
  @IsOptional()
  supervisorId?: number;

  @ApiProperty({ description: 'Идентификаторы работников', example: [1, 2], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  workerIds?: number[];

  @ApiProperty({ description: 'Дата начала периода создания (ISO 8601)', example: '2024-01-01T00:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  createdFrom?: string;

  @ApiProperty({ description: 'Дата окончания периода создания (ISO 8601)', example: '2024-12-31T23:59:59Z', required: false })
  @IsDateString()
  @IsOptional()
  createdTo?: string;
}