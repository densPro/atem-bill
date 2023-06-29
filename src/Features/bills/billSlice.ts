import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Bill {
  id?: number;
  nitProvider: number;
  billNumber: number;
  cuf: string;
  issueDate: string;
  total: number;
  controlCode: string;
}

interface BillState {
  bills: Bill[];
  flatBills: string;
  billTextInput: string;
}

export const initialState: BillState = {
  bills: [],
  flatBills: '',
  billTextInput: 'sdf',
};

export const billSlice = createSlice({
  name: 'billSlice',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<{ bill: Bill }>) => {
      const billToAdd: Bill = {
        id: state.bills.length + 1,
        nitProvider: action.payload.bill.nitProvider,
        billNumber: action.payload.bill.billNumber,
        cuf: action.payload.bill.cuf,
        issueDate: action.payload.bill.issueDate,
        total: action.payload.bill.total,
        controlCode: action.payload.bill.controlCode,
      };
      state.bills.push(billToAdd);
    },
    emptyBill: (state, action: PayloadAction<void>) => {
      state.bills = initialState.bills;
      state.flatBills = initialState.flatBills;
    },
    addFlatBill: (state, action: PayloadAction<string>) => {
      state.flatBills += `${state.bills.length + 1}	${action.payload}\n`;
    },
    setBillTextInput: (state, action: PayloadAction<string>) => {
      state.billTextInput = action.payload;
    },
  },
});

export default billSlice.reducer;
export const selectBillState = (state: any) => {
  return state.billState;
};

export const {
  addBill,
  emptyBill,
  addFlatBill,
  setBillTextInput,
} = billSlice.actions;
