import { IUploadedFile } from '../types/csv-parser.types';
import { BadRequestException } from '@nestjs/common';

export const csvFileValidation = (
  _: unknown,
  file: IUploadedFile,
  callback,
) => {
  const fileExtension = file.originalname.split('.').pop();

  if (fileExtension !== 'csv' || file.mimetype !== 'text/csv') {
    callback(new BadRequestException('Invalid file type'), false);
  }

  callback(null, true);
};
