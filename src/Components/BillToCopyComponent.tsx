import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyBill, selectBillState } from '../Features/bills/billSlice';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

export const BillToCopyComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const clearBillTable = () => {
    dispatch(emptyBill())
  };
  const billState = useSelector(selectBillState);
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ marginLeft: 10 }}
          onClick={() => clearBillTable()}
          variant='outlined'>{t('bill.buttons.clear')}
        </Button>
      </div>
      <div>
        <TextField multiline rows={16} value={billState.flatBills} />
      </div>
    </Box>
  )
}
