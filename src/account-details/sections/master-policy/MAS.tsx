
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { Grid } from '@mui/system';
import React from 'react';
import LocalReview from './mas/LocalReview';
import NewMASTab from './mas/NewMASTab';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mas-tabpanel-${index}`}
      aria-labelledby={`mas-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `mas-tab-${index}`,
    'aria-controls': `mas-tabpanel-${index}`,
  };
}

export default function MAS() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label="MAS tabs" sx={{ px: 2 }}>
        <Tab label="New" {...a11yProps(0)} />
        <Tab label="Local Review" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <NewMASTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <LocalReview />
      </TabPanel>
      <Grid container spacing={1} sx={{ m: 0, p: 1 }}>
        <Grid size={12} display="flex" justifyContent="flex-end" gap={2} >
          <Button
            variant="contained"
            color="secondary"
          >
            Generate Spreadsheet
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}