import IconButton from '@mui/material/IconButton'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import React, { useState } from 'react'
import QrReader from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { setBillTextInput } from '../Features/bills/billSlice';

export const QRScannerComponent = () => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="secondary" aria-label="add an alarm" onClick={e => setShow(!show)}>
          <QrCodeScannerIcon />
        </IconButton>
      </div>
      {
        show &&
        <QrReader
          delay={300}
          onError={(error) => {
            setError(error.message);
          }}
          onScan={(data) => {
            if (data) {
              dispatch(setBillTextInput(data));
              setError(null);
            }
          }}
          style={{ width: "300px" }}
        />
      }
    </div>
  );
}
