import Box from "@mui/material/Box";
import { BillByPartsComponent } from "../Components/BillByParts/BillByPartsComponent"
import { BillTableComponent } from "../Components/BillTableComponent"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SimpleBillFormatConverter } from "../Components/SimpleBillFormatConverter";
import { BillToCopyComponent } from "../Components/BillToCopyComponent";
import { QRScannerComponent } from "../Components/QRScannerComponent";

export const HomePage = () => {
  const [FormTab, setFormTab] = useState('1');
  const [tableTab, setTableTab] = useState('1');

  const handleFormTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setFormTab(newValue);
  };
  const handleTableTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTableTab(newValue);
  };
  const { t } = useTranslation();

  return (
    <Box
      margin="50px"
    >
      <QRScannerComponent />
      <TabContext value={FormTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleFormTabChange} aria-label="lab API tabs example">
            <Tab label={t('bill.tabs.simple')} value='1' />
            <Tab label={t('bill.tabs.complex')} value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <SimpleBillFormatConverter />
        </TabPanel>
        <TabPanel value='2'>
          <BillByPartsComponent />
        </TabPanel>
      </TabContext>
      <TabContext value={tableTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTableTabChange} aria-label="lab API tabs example">
            <Tab label={t('bill.tabs.table')} value='1' />
            <Tab label={t('bill.tabs.toCopy')} value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <BillTableComponent />
        </TabPanel>
        <TabPanel value='2'>
          <BillToCopyComponent />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
