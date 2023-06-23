import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Bill {
  id?: number ;
  nitProvider: number;
  billNumber: number;
  cuf: string;
  issueDate: string;
  total: number;
  controlCode: string;
}

interface BillState {
  bills: Bill[];
}

export const initialState: BillState = {
  bills:  [
    { id: 1, nitProvider: 12, billNumber: 35000, cuf: '123', issueDate: '2023-05-05', total: 1, controlCode: 'sdf' },
  ]
};

export const billSlice = createSlice({
  name: 'billSlice',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<{ bill: Bill }>) => {
      state.bills.push({
        id: state.bills.length + 1,
        nitProvider: action.payload.bill.nitProvider,
        billNumber: action.payload.bill.billNumber,
        cuf: action.payload.bill.cuf,
        issueDate: action.payload.bill.issueDate,
        total: action.payload.bill.total,
        controlCode: action.payload.bill.controlCode,
      });
    },
  },
});

export default billSlice.reducer;
export const selectBills = (state: any) => {console.log(state); return state.billState};
export const { addBill } = billSlice.actions;