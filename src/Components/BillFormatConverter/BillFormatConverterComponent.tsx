import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { clearBill } from './BillFormatConverter.functions';
import { billNumberKey, nitProviderKey, cufKey, issueDateKey, totalKey, controlCodeKey } from '../Bill.constants';
import { useLocalStorage } from '../../Hooks/useLocalStorage';
import { useAppDispatch } from '../../App/store';
import { Bill, addBill } from '../../Features/bills/billSlice';

export const BillFormatConverterComponent = () => {

  const [nitProvider, setNitProvider] = useLocalStorage(nitProviderKey, '');
  const [billNumber, setBillNumber] = useLocalStorage(billNumberKey, '');
  const [cuf, setCUF] = useLocalStorage(cufKey, '');
  const [issueDate, setIssueDate] = useLocalStorage(issueDateKey, '');
  const [total, setTotal] = useLocalStorage(totalKey, '');
  const [controlCode, setControlCode] = useLocalStorage(controlCodeKey, '');

  const dispatch = useAppDispatch();

  const insertBill = () => {
    const bill: Bill = {
      nitProvider: +nitProvider,
      billNumber: +billNumber,
      cuf: cuf,
      issueDate: issueDate,
      total: +total,
      controlCode: controlCode
    };
    dispatch(addBill({ bill: bill }));
  };

  const { t } = useTranslation();
  return (

    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>       
        <TextField
          label={t('bill.nitProvider')}
          type='number'
          value={nitProvider}
          onChange={e => setNitProvider(e.target.value)}
        />
        <TextField
          label={t('bill.billNumber')}
          type='number'
          value={billNumber}
          onChange={e => setBillNumber(e.target.value)}
        />
        <TextField
          label={t('bill.cuf')}
          value={cuf}
          onChange={e => setCUF(e.target.value)}
        />
        <TextField
          label={t('bill.issueDate')}
          type='date'
          data-date-format='MM DD YYYY'
          InputLabelProps={{ shrink: true }}
          value={issueDate}
          onChange={e => {setIssueDate(e.target.value); console.log(e.target.value)}}
        />
        <TextField
          label={t('bill.total')}
          type='number'
          value={total}
          onChange={e => setTotal(e.target.value)}
        />
        <TextField
          label={t('bill.controlCode')}
          value={controlCode}
          onChange={e => setControlCode(e.target.value)}
        />
      </div>
      <Button style={{ marginLeft: 10 }}
        onClick={insertBill}
        variant='outlined'>{t('bill.buttons.insert')}
      </Button>
      <Button style={{ marginLeft: 10 }}
        onClick={() => clearBill([setBillNumber, setNitProvider, setBillNumber, setCUF, setIssueDate, setTotal, setControlCode])}
        variant='outlined'>{t('bill.buttons.clear')}
      </Button>
    </Box>
  );
}
