import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditLog } from './audit.model';
import { GetFiltereAutitLogsdDto } from './dto/GetFiltered.dto';
import { Op } from 'sequelize';

@Injectable()
export class AuditService {
    constructor(@InjectModel(AuditLog) private auditLogModel: typeof AuditLog) { }

    async logAction(
        action: string,
        tableName: string,
        recordId: number | null,
        beforeData: object | null,
        afterData: object | null,
        userId: number | null,
        userData: object | null,
    ) {
        await this.auditLogModel.create({
            action,
            tableName,
            recordId,
            beforeData,
            afterData,
            userId,
            userData
        });
    }

    async findAll(): Promise<any> {
        return this.auditLogModel.findAll({ include: { all: true } });
    }

    async getFiltered(dto: GetFiltereAutitLogsdDto): Promise<any> {
        const where: any = {};

        if (dto.createdAt) {
            const { fromTime, toTime } = dto.createdAt;
            if (fromTime && toTime) {
                where.createdAt = {
                    [Op.between]: [new Date(fromTime), new Date(toTime)],
                };
            } else if (fromTime) {
                where.createdAt = {
                    [Op.gte]: new Date(fromTime),
                };
            } else if (toTime) {
                where.createdAt = {
                    [Op.lte]: new Date(toTime),
                };
            }
        };

        if(dto.userId) {
            where.userId = dto.userId;
        };

        if(dto.action) {
            where.action = dto.action;
        };

        if(dto.tableName) {
            where.tableName = dto.tableName;
        };

        const posts = await this.auditLogModel.findAll({ where, include: { all: true }, order: [['updatedAt', 'DESC']] });
        return posts;
    }
}