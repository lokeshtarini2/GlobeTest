import { Add, Dashboard, Work } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { useState } from 'react';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import NewApplication from '../components/NewApplication';
import SideMenu from '../components/SideMenu';
import { StatCardProps } from '../components/StatCard';
import Copyright from '../internals/components/Copyright';
import AppTheme from '../shared-theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, treeViewCustomizations } from '../theme/customizations';


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


const coloredBoxSx = (bgColor: string, hoverColor: string) => ({
    backgroundColor: bgColor,
    color: '#fff',
    padding: 2,
    textAlign: 'center',
    borderRadius: 1,
    height: 300,
    width: '100%',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: hoverColor,
    },
});


const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,

    ...treeViewCustomizations,
};


export default function Home(props: { disableCustomTheme?: boolean }) {

    const [newOpen, setNewOpen] = useState(false);


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
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <Button onClick={() => setNewOpen(true)} sx={{ width: '100%', height: '100%', m: 0, p: 0 }}>
                                        <Box sx={coloredBoxSx('#1976d2', '#1565c0')}>
                                            <Stack sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Box
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Add sx={{ opacity: 0.8 }} />
                                                </Box>
                                                <Typography variant="h4">New Application</Typography>
                                                <Typography variant="body2">Start a fresh business application</Typography>
                                            </Stack>
                                        </Box>
                                    </Button>
                                </Grid>
                                <Grid size={4}>
                                    <Button href="/applications" sx={{ width: '100%', height: '100%', m: 0, p: 0 }}>
                                        <Box sx={coloredBoxSx('#00838f', '#006064')}>
                                            <Stack sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Box
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Work sx={{ opacity: 0.8 }} />
                                                </Box>
                                                <Typography variant="h4">Your Accounts</Typography>
                                                <Typography variant="body2">View accounts you manage as Lead Account Manager</Typography>
                                            </Stack>
                                        </Box>
                                    </Button>
                                </Grid>

                                <Grid size={4}>
                                    <Button href="/workspace" sx={{ width: '100%', height: '100%', m: 0, p: 0 }}>
                                        <Box sx={coloredBoxSx('#4b3fae', '#3d3397')}>
                                            <Stack sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Box
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Dashboard sx={{ opacity: 0.8 }} />
                                                </Box>
                                                <Typography variant="h4">Workspace</Typography>
                                                <Typography variant="body2">Access your tools, tasks, and dashboard</Typography>
                                            </Stack>
                                        </Box>
                                    </Button>
                                </Grid>
                                <NewApplication open={newOpen} handleClose={() => setNewOpen(false)} />
                            </Grid>
                        </Box>
                        <Copyright />
                    </Stack>
                </Box>
            </Box >
        </AppTheme >
    );
}
