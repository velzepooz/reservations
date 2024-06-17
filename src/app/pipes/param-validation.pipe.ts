import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ParamValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      const valueInstance = plainToInstance(metadata.metatype, value);
      const validationErrors = await validate(valueInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestException(
          validationErrors
            .map((error) => Object.values(error.constraints))
            .flat(),
          'Invalid route param',
        );
      }

      return valueInstance;
    }

    return value;
  }
}
