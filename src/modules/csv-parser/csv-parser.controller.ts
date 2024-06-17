import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CsvParserService } from './csv-parser.service';
import { csvFileValidation } from './utils/csv-file-validation.util';
import { IUploadedFile } from './types/csv-parser.types';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/in/file-upload.dto';

@ApiTags('Parse csv files')
@Controller('csv-parser')
export class CsvParserController {
  constructor(private readonly csvParserService: CsvParserService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Csv file to be parsed',
    type: FileUploadDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Csv file content parsed to JSON',
  })
  @Post('/json')
  @UseInterceptors(
    FileFastifyInterceptor('file', { fileFilter: csvFileValidation }),
  )
  async parseCsvToJson(
    @UploadedFile() file: IUploadedFile,
  ): Promise<unknown[]> {
    return this.csvParserService.parseCsvToJson(file);
  }
}
