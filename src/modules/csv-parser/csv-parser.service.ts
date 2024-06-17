import { Injectable } from '@nestjs/common';
import { IUploadedFile } from './types/csv-parser.types';
import { ParseCsvUtil } from './utils/parse-csv.util';

@Injectable()
export class CsvParserService {
  constructor(private readonly parseCsvUtil: ParseCsvUtil) {}

  async parseCsvToJson(file: IUploadedFile): Promise<unknown[]> {
    return await this.parseCsvUtil.parse(file.buffer);
  }
}
