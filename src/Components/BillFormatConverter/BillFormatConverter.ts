import { useState } from 'react';
import { Bill } from '../../Features/bills/billSlice';

export class BillFormatConverter {
  billNumber: string | undefined;
  nitProvider: string | undefined;
  billBillNumber: string | undefined;
  cuf: string | undefined;
  issueDate: string | undefined;
  total: string | undefined;
  controlCode: string | undefined;
  parts: string[];
  
  constructor() {
    this.parts = [''];
  }

  convert(bills: string): string {
    const billsWithoutSpaces = bills.replaceAll(' ', '');
    const partsSplit = billsWithoutSpaces.split('|');
    // remove double value
    this.parts = partsSplit
      .slice(0, 4)
      .concat(partsSplit.slice(5, 7));
    const result = this.parts.join('|');
    return result.replaceAll('|', '	');
  }
}
