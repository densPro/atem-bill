import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { clearBill } from './BillFormatConverter/BillFormatConverter.functions';
import { useAppDispatch } from '../App/store';
import { BillFormatConverter } from './BillFormatConverter/BillFormatConverter';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { nitProviderKey, billNumberKey, cufKey, issueDateKey, totalKey, controlCodeKey, billTextKey } from './Bill.constants';
import { Bill, addBill } from '../Features/bills/billSlice';

export const SimpleBillFormatConverter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [billTextValue, setBillTextValue] = useLocalStorage(billTextKey, '');
  const [nitProvider, setNitProvider] = useLocalStorage(nitProviderKey, '');
  const [billNumber, setBillNumber] = useLocalStorage(billNumberKey, '');
  const [cuf, setCUF] = useLocalStorage(cufKey, '');
  const [issueDate, setIssueDate] = useLocalStorage(issueDateKey, '');
  const [total, setTotal] = useLocalStorage(totalKey, '');
  const [controlCode, setControlCode] = useLocalStorage(controlCodeKey, '');
  const converter = new BillFormatConverter();
  const insertBill = () => {
    converter.convert(billTextValue);
    setNitProvider(converter.parts[0] ?? '');
    setBillNumber(converter.parts[1] ?? '');
    setCUF(converter.parts[2] ?? '');
    const issueDate = createStringDate(converter.parts[3]);
    setIssueDate(issueDate);
    setTotal(converter.parts[4] ?? '');
    setControlCode(converter.parts[5] ?? '');

    const bill: Bill = {
      nitProvider: +nitProvider,
      billNumber: +billNumber,
      cuf: cuf,
      issueDate: issueDate,
      total: +total,
      controlCode: controlCode
    };
    dispatch(addBill({ bill: bill}));
    clearBill([setBillTextValue]);
  };

  const createStringDate = (date: string): string => {
    const dateParts = date.split('/');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label={t('bill.title')}
          value={billTextValue}
          onChange={e => setBillTextValue(e.target.value)}
        />
      </div>
      <Button style={{ marginLeft: 10 }}
        onClick={insertBill}
        variant='outlined'>{t('bill.buttons.insert')}
      </Button>
      <Button style={{ marginLeft: 10 }}
        onClick={() => clearBill([setBillTextValue])}
        variant='outlined'>{t('bill.buttons.clear')}
      </Button>
    </Box>
  )
}
