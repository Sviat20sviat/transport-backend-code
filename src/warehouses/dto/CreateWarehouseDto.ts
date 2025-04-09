import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ description: 'Адрес склада', example: 'ул. Примерная, 1' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Координаты склада', example: { lat: 55.7558, lng: 37.6173 } })
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

  @ApiProperty({ description: 'Название склада', example: 'Склад 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Статус склада', example: 'active' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Идентификаторы работников склада', example: [1, 2, 3], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  workerIds?: number[];
}