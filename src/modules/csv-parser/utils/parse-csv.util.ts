import { Readable } from 'stream';
import parse from 'csv-parser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseCsvUtil {
  parse(csvFileBuffer: Buffer): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      const results = [];

      const stream = new Readable();

      stream.push(csvFileBuffer);
      stream.push(null);

      stream
        .pipe(parse())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => {
          reject(error);
        });

      return results;
    });
  }
}
