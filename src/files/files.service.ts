import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { FileModel } from './file.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FilesService {

    constructor(
        @InjectModel(FileModel)
        private fileModel,
      ) {}

    async createFile(file): Promise<string> {
        if(!file) {
            return null;
        };
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            };
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (error) {
            throw new HttpException("Error during write file", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async saveImageUrl(url: string): Promise<any> {
        return this.fileModel.create({ url });
      }
}
