import { Calculate, Description, Event, FileUpload, Person } from '@mui/icons-material'; // Add MUI icons
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import { lazy, Suspense, useState } from 'react';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Copyright from '../internals/components/Copyright';
import AppTheme from '../shared-theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, treeViewCustomizations } from '../theme/customizations';

// Lazy-loaded tab components
const LazyUsers = lazy(() => import('./Users'));
const LazyDocs = lazy(() => import('./Docs'));
const LazyPMRegistration = lazy(() => import('./PMRegistration'));
const LazyRPV = lazy(() => import('./RPV'));
const LazyRAFileUpload = lazy(() => import('./RAFileUpload'));

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
              <CircularProgress size={24} />
            </Box>
          }>
            {children}
          </Suspense>
        </Box>
      )}
    </div>
  );
}

export default function Admin(props: { disableCustomTheme?: boolean }) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />

            {/* Tabs */}
            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => setTabIndex(newValue)}
              aria-label="Admin tabs"
              sx={{ alignSelf: 'stretch', width: '100%', display: 'flex', justifyContent: 'space-between', p: 0, m: 0 }}
            >
              <Tab label="Users" icon={<Person />} iconPosition="start" />
              <Tab label="Standard Docs" icon={<Description />} iconPosition="start" />
              <Tab label="PM Registration" icon={<Event />} iconPosition="start" />
              <Tab label="RPV" icon={<Calculate />} iconPosition="start" />
              <Tab label="RA File Upload" icon={<FileUpload />} iconPosition="start" />
            </Tabs>

            {/* Tab Panels */}
            <Box sx={{ width: '100%' }}>
              <TabPanel value={tabIndex} index={0}>
                <LazyUsers />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <LazyDocs />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <LazyPMRegistration />
              </TabPanel>
              <TabPanel value={tabIndex} index={3}>
                <LazyRPV />
              </TabPanel>
              <TabPanel value={tabIndex} index={4}>
                <LazyRAFileUpload />
              </TabPanel>
            </Box>

            <Copyright />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
