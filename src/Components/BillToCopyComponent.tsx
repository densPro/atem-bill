import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React from 'react'

export const BillToCopyComponent = () => {
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
        <TextField multiline rows={16} />
      </div>
    </Box>
  )
}
