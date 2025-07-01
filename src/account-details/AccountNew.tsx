import {
  ConfirmationNumber,
  Event,
  Gavel,
  Info,
  Keyboard,
  Payments,
  PersonAdd
} from '@mui/icons-material';
import {
  Drawer,
  SelectChangeEvent,
  useColorScheme
} from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import AppTheme from '../shared-theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, treeViewCustomizations } from '../theme/customizations';



const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};


import * as React from 'react';
import { useSearchParams } from 'react-router';


import {
  DropResult
} from '@hello-pangea/dnd';

import { Grid } from '@mui/system';
import MasterPolicyTerms from './sections/master-policy/MasterPolicyTerms';




const drawerWidth = 190;
const collapsedWidth = 64;

const AnimatedDrawer = animated(Drawer);




export default function AccountNew(props: { disableCustomTheme?: boolean }) {

  const { mode } = useColorScheme();

  const [countryTabs, setCountryTabs] = React.useState<{ code: string; label: string }[]>([
    { code: 'ca', label: 'Canada' },
    { code: 'de', label: 'Germany' },
    { code: 'jp', label: 'Japan' },
    { code: 'in', label: 'India' },
    { code: 'cn', label: 'China' },
    { code: 'mx', label: 'Mexico' },
    { code: 'it', label: 'Italy' },
    { code: 'es', label: 'Spain' },
    { code: 'ru', label: 'Russia' },
    { code: 'kr', label: 'South Korea' },
    { code: 'za', label: 'South Africa' },
    { code: 'ng', label: 'Nigeria' },
    { code: 'eg', label: 'Egypt' },
    { code: 'tr', label: 'Turkey' },
    { code: 'id', label: 'Indonesia' },
    { code: 'pk', label: 'Pakistan' },
    { code: 'bd', label: 'Bangladesh' },
    { code: 'vn', label: 'Vietnam' },
    { code: 'ph', label: 'Philippines' },
    { code: 'th', label: 'Thailand' },
    { code: 'my', label: 'Malaysia' },
    { code: 'sg', label: 'Singapore' },
    { code: 'nz', label: 'New Zealand' },
    { code: 'sa', label: 'Saudi Arabia' },
    { code: 'ae', label: 'United Arab Emirates' },
  ]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'Unknown';
  const [selectedCountry, setSelectedCountry] = React.useState<string>('ca');
  const [company, setCompany] = React.useState('');
  const [activeTabSet, setActiveTabSet] = React.useState<'masterPolicy' | 'country'>('masterPolicy');
  const [filterText, setFilterText] = useState('');
  const [viewMode, setViewMode] = useState<any>('list');


  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(countryTabs);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setCountryTabs(reordered);
  };

  const masterPolicyTabs = [
    { label: 'Master Policy Terms', icon: <Gavel sx={{ fontSize: '1rem' }} /> }
  ];
  const countryTabsList = [
    { label: 'Original Local Insured', icon: <Event sx={{ fontSize: '1rem' }} /> },
    { label: 'Foreign Broker', icon: <Payments sx={{ fontSize: '1rem' }} /> },
    { label: 'Local Policy Terms', icon: <ConfirmationNumber sx={{ fontSize: '1rem' }} /> },
    { label: 'Other Information', icon: <Info sx={{ fontSize: '1rem' }} /> },
    { label: 'Add Contacts', icon: <PersonAdd sx={{ fontSize: '1rem' }} /> },
    { label: 'Globex Input', icon: <Keyboard sx={{ fontSize: '1rem' }} /> }
  ];

  const [masterPolicyTabIndex, setMasterPolicyTabIndex] = React.useState(0);
  const [countryTabIndex, setCountryTabIndex] = React.useState(0);

  const allCountries = [
    { code: 'us', label: 'United States' },
    { code: 'gb', label: 'United Kingdom' },
    { code: 'fr', label: 'France' },
    { code: 'br', label: 'Brazil' },
    { code: 'au', label: 'Australia' },
    { code: 'ar', label: 'Argentina' },
    { code: 'cl', label: 'Chile' },
    { code: 'co', label: 'Colombia' },
    { code: 'pe', label: 'Peru' },
    { code: 'uy', label: 'Uruguay' },
  ];

  const [open, setOpen] = useState(true);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'spreadsheet' | 'list' | null
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };


  const styles = useSpring({
    width: viewMode === 'spreadsheet' ? 0 : (open ? drawerWidth : collapsedWidth),
    config: { tension: 250, friction: 30 },
  });

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box>
        <Grid
          sx={{
            top: 0,
            left: 0,
            position: 'relative',
            zIndex: 1000,
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ width: '100%', overflow: 'hidden', pt: 2 }}>
            <MasterPolicyTerms />
          </Box>
        </Grid>
      </Box>
    </AppTheme>
  );
}

