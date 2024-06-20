import { Module } from '@nestjs/common';
import { CsvParserController } from './csv-parser.controller';
import { CsvParserService } from './csv-parser.service';
import { ParseCsvUtil } from './utils/parse-csv.util';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [CsvParserController],
  providers: [CsvParserService, ParseCsvUtil],
})
export class CsvParserModule {}
