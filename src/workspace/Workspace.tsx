import { Grid, styled } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import CountriesMap from '../components/Map';
import SideMenu from '../components/SideMenu';
import StatCard, { StatCardProps } from '../components/StatCard';
import Copyright from '../internals/components/Copyright';
import AppTheme from '../shared-theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, treeViewCustomizations } from '../theme/customizations';
import ChartUserByCountry from './ChartUserByCountry';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';


const data: StatCardProps[] = [
  {
    title: 'New',
    value: '146',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Renewals',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Bound',
    value: '431',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];


const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,

  ...treeViewCustomizations,
};

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Workspace(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
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
              mt: { xs: 6, md: 0 },
            }}
          >
            <Header />
            <Box sx={{ width: '100%' }}>

              <Grid
                container
                spacing={2}
                columns={9}
                sx={{ my: 1 }}
              >
                {data.map((card, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 3, lg: 3 }}>
                    <StatCard {...card} />
                  </Grid>
                ))}
              </Grid>

              <Grid
                container
                spacing={2}
                columns={9}
                sx={{ my: (theme) => theme.spacing(2) }}
              >

                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                  <ChartUserByCountry />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                  <SessionsChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                  <PageViewsBarChart />
                </Grid>
              </Grid>

              <CountriesMap />
            </Box>
            <Copyright />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
