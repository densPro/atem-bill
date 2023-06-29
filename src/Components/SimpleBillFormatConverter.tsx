import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { clearBill } from './BillByParts/BillByParts.functions';
import { useDispatch, useSelector } from 'react-redux';
import { BillFormatConverter } from './BillFormatConverter/BillFormatConverter';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { nitProviderKey, billNumberKey, cufKey, issueDateKey, totalKey, controlCodeKey } from './Bill.constants';
import { Bill, addBill, addFlatBill, selectBillState, setBillTextInput } from '../Features/bills/billSlice';
import * as _ from 'lodash';

export const SimpleBillFormatConverter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const billState = useSelector(selectBillState);
  const [nitProvider, setNitProvider] = useLocalStorage(nitProviderKey, '');
  const [billNumber, setBillNumber] = useLocalStorage(billNumberKey, '');
  const [cuf, setCUF] = useLocalStorage(cufKey, '');
  const [issueDate, setIssueDate] = useLocalStorage(issueDateKey, '');
  const [total, setTotal] = useLocalStorage(totalKey, '');
  const [controlCode, setControlCode] = useLocalStorage(controlCodeKey, '');
  const converter = new BillFormatConverter();
  const setBillTextInputHandler = (value: string) => {
    dispatch(setBillTextInput(value));
  };
  const insertBill = () => {
    if (_.isNull(billState.billTextInput) || _.isEmpty(billState.billTextInput)) return;
    const flatBill = converter.convert(billState.billTextInput);
    dispatch(addFlatBill(flatBill));
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
    dispatch(addBill({ bill: bill }));
    setBillTextInputHandler('');
  };

  const createStringDate = (date: string): string => {
    const dateParts = date.split('/');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label={t('bill.title')}
          value={billState.billTextInput}
          onChange={e => setBillTextInputHandler(e.target.value)}
        />
      </div>
      <Button style={{ marginLeft: 10 }}
        onClick={insertBill}
        variant='outlined'>{t('bill.buttons.insert')}
      </Button>
      <Button style={{ marginLeft: 10 }}
        onClick={() => setBillTextInputHandler('')}
        variant='outlined'>{t('bill.buttons.clear')}
      </Button>
    </Box>
  )
}
