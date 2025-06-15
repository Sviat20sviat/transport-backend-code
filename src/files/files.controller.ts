
import {
    Controller,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FilesService } from './files.service';
import { Multer } from 'multer';
import { AuditService } from 'src/audit-log/audit.service';

@Controller('files')
export class FileController {
    constructor(private readonly filesService: FilesService, private auditService: AuditService) { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    console.log('uniqueSuffix',uniqueSuffix)
                    const ext = extname(file.originalname);
                    cb(null, `${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async uploadFile(@UploadedFile() file: Multer.File, @Req() request) {
        const host = 'http://176.124.219.232:5000'; // Замените на ваш домен или IP
        const fileUrl = `${host}/uploads/${file.filename}`;
        const url = `/uploads/${file.filename}`;
        const absoluteUrl = join(__dirname, '..', 'uploads', file.filename);
        const savedImage = await this.filesService.saveImageUrl(fileUrl);

        this.auditService.logAction(
            'create',
            'image',
            new Date().getDate(),
            null,
            null,
            request?.user?.id,
            request?.user
        );
        
        return { message: 'File uploaded successfully', image: savedImage };
    }
}
