import { ApiProperty } from '@nestjs/swagger';

export class DeleteAddressDto {
  @ApiProperty({ example: 12, description: 'Id' })
  readonly id?: number;

}