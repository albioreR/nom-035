/* eslint-disable no-undef */
import { Injectable } from '@nestjs/common';
import XLSX from 'xlsx';

@Injectable()
export class XlsxService {
  importFile<T>(file: Express.Multer.File): T[] {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });

    const sheetNames = workbook.SheetNames;

    const data: T[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], {
      defval: '',
    });

    return data;
  }
}
