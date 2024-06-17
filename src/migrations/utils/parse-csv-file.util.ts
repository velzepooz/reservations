import { ParseCsvUtil } from '../../modules/csv-parser/utils/parse-csv.util';
import fs from 'node:fs/promises';

export const parseCsvFile = async (filePath: string) => {
  const csvParser = new ParseCsvUtil();
  const stream = await fs.readFile(filePath);

  return csvParser.parse(stream) as any;
};
