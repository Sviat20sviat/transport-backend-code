import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { GetFiltereAutitLogsdDto } from './dto/GetFiltered.dto';


@ApiTags('Audit Logs') // Группировка эндпоинтов в Swagger UI
@Controller('audit') // Базовый путь для этого контроллера
export class AuditLogController {
  constructor(private readonly auditLogService: AuditService) {}
  

  @Get()
  @ApiOperation({ summary: 'Получить список' })
  @ApiResponse({ status: 200, description: 'Список категорий.' })
  findAll() {
    return this.auditLogService.findAll();
  }

  @Post('/getFiltered')
  @ApiOperation({ summary: 'Получить список фильтрованный' })
  @ApiResponse({ status: 200, description: 'Список категорий.' })
  getFiltered(@Body() dto: GetFiltereAutitLogsdDto) {
    return this.auditLogService.getFiltered(dto);
  }

}