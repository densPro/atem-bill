import IconButton from '@mui/material/IconButton'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import React from 'react'

export const QRScannerComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton color="secondary" aria-label="add an alarm">
        <QrCodeScannerIcon />
      </IconButton>
    </div>
  )
}
