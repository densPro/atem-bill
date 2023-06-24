import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectBills, emptyBill } from '../Features/bills/billSlice'
import Button from '@mui/material/Button';

export const BillTableComponent = () => {
  const { t } = useTranslation();
  const bills = useSelector(selectBills);
  const dispatch = useDispatch()
  const clearBillTable = () => {
    dispatch(emptyBill())
  };

  const defaultColDef = { wrapText: true };
  const columnWidth = 235;
  const [columnDefs] = useState([
    { headerName: t('bill.id'), field: 'id', width: columnWidth },
    { headerName: t('bill.nitProvider'), field: 'nitProvider', width: columnWidth },
    { headerName: t('bill.billNumber'), field: 'billNumber', width: columnWidth },
    { headerName: t('bill.cuf'), field: 'cuf', width: columnWidth },
    { headerName: t('bill.issueDate'), field: 'issueDate', width: columnWidth },
    { headerName: t('bill.total'), field: 'total', width: columnWidth },
    { headerName: t('bill.controlCode'), field: 'controlCode', width: columnWidth }
  ]);

  return (
    <div>
      <div  style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ marginLeft: 10 }}
          onClick={() => clearBillTable()}
          variant='outlined'>{t('bill.buttons.clear')}
        </Button>
      </div>
      <div className='ag-theme-alpine-dark' style={{ height: 400, width: "100%", margin: 8 }}>
        <AgGridReact
          rowData={bills.bills}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
  );
}
