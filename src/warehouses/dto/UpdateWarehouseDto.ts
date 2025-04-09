import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray, IsInt } from 'class-validator';

export class UpdateWarehouseDto {
  @ApiProperty({ description: 'Адрес склада', example: 'ул. Примерная, 1', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Координаты склада', example: { lat: 55.7558, lng: 37.6173 }, required: false })
  @IsOptional()
  coordinates?: {
    lat: number;
    lng: number;
  };

  @ApiProperty({ description: 'Номер телефона склада', example: '+79991234567', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'Идентификатор руководителя склада', example: 1, required: false })
  @IsInt()
  @IsOptional()
  supervisorId?: number;

  @ApiProperty({ description: 'Название склада', example: 'Склад 1', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Статус склада', example: 'active', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Идентификаторы работников склада', example: [1, 2, 3], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  workerIds?: number[];
}