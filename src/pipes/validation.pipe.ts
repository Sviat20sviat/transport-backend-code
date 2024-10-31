import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors?.length) {
            console.log('errors!',errors);
            let messages = errors.map(error => {
                return `${error.property} - ${Object.values(error.constraints).join(', ')}`
            });
            throw new ValidationException(messages);
        };
        return value;
    }

}