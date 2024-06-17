import { Module } from '@nestjs/common';
import { CsvParserController } from './csv-parser.controller';
import { CsvParserService } from './csv-parser.service';
import { ParseCsvUtil } from './utils/parse-csv.util';

@Module({
  controllers: [CsvParserController],
  providers: [CsvParserService, ParseCsvUtil],
})
export class CsvParserModule {}
