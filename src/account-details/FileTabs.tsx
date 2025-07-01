import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabGroup({
  label,
  tabs,
  value,
  setValue,
}: {
  label: string;
  tabs: string[];
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Box>
      <InputLabel>{label}</InputLabel>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 250,
        }}
      >
        {tabs.map((tabLabel, index) => (
          <Tab
            key={tabLabel}
            label={tabLabel}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default function FileTabs() {
  const [countryTabs] = React.useState([
    'Original Local Insured',
    'Foreign Broker Company',
    'Local Policy Terms',
    'Exposure Information',
    'Suggested Premium',
    'Other Info',
    'Attachments',
    'Contacts',
    'Globex Input',
  ]);
  const [countryValue, setCountryValue] = React.useState(0);

  const [masterTabs] = React.useState([
    'Master Policy Terms',
    'Progress',
    'Account Handling Summary',
    'PS & RA Creator',
    'MAS',
    'Attachments',
    'Messages',
    'Dates',
    'Remarks and Attachments',
  ]);
  const [masterValue, setMasterValue] = React.useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TabGroup
        label="Country Policy Specs"
        tabs={countryTabs}
        value={countryValue}
        setValue={setCountryValue}
      />
      {countryTabs.map((label, index) => (
        <TabPanel value={countryValue} index={index} key={label}>
          {label}
        </TabPanel>
      ))}

      <TabGroup
        label="Master Policy"
        tabs={masterTabs}
        value={masterValue}
        setValue={setMasterValue}
      />
      {masterTabs.map((label, index) => (
        <TabPanel value={masterValue} index={index} key={label}>
          {label}
        </TabPanel>
      ))}
    </Box>
  );
}
