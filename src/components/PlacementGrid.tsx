import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, Collapse, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Flag from 'react-world-flags';

const countries = [
    {
        code: 'US',
        name: 'United States',
        accounts: generateAccounts(6, 'US'),
    },
    {
        code: 'FR',
        name: 'France',
        accounts: generateAccounts(5, 'FR'),
    },
    {
        code: 'DE',
        name: 'Germany',
        accounts: generateAccounts(8, 'DE'),
    },
    {
        code: 'JP',
        name: 'Japan',
        accounts: generateAccounts(4, 'JP'),
    },
    {
        code: 'BR',
        name: 'Brazil',
        accounts: generateAccounts(7, 'BR'),
    },
    {
        code: 'IN',
        name: 'India',
        accounts: generateAccounts(6, 'IN'),
    },
    {
        code: 'ZA',
        name: 'South Africa',
        accounts: generateAccounts(3, 'ZA'),
    },
    {
        code: 'AU',
        name: 'Australia',
        accounts: generateAccounts(5, 'AU'),
    },
    {
        code: 'CA',
        name: 'Canada',
        accounts: generateAccounts(4, 'CA'),
    },
    {
        code: 'MX',
        name: 'Mexico',
        accounts: generateAccounts(2, 'MX'),
    },
    {
        code: 'NG',
        name: 'Nigeria',
        accounts: generateAccounts(4, 'NG'),
    },
    {
        code: 'EG',
        name: 'Egypt',
        accounts: generateAccounts(3, 'EG'),
    },
    {
        code: 'IT',
        name: 'Italy',
        accounts: generateAccounts(4, 'IT'),
    },
    {
        code: 'ES',
        name: 'Spain',
        accounts: generateAccounts(5, 'ES'),
    },
    {
        code: 'RU',
        name: 'Russia',
        accounts: generateAccounts(6, 'RU'),
    },
    {
        code: 'CN',
        name: 'China',
        accounts: generateAccounts(7, 'CN'),
    },
    {
        code: 'AR',
        name: 'Argentina',
        accounts: generateAccounts(4, 'AR'),
    },
    {
        code: 'KE',
        name: 'Kenya',
        accounts: generateAccounts(5, 'KE'),
    },
    {
        code: 'KR',
        name: 'South Korea',
        accounts: generateAccounts(3, 'KR'),
    },
    {
        code: 'GB',
        name: 'United Kingdom',
        accounts: generateAccounts(6, 'GB'),
    },
];

function generateAccounts(count: number, countryCode: string) {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        organization: `Organization ${i + 1} (${countryCode})`,
        coverage: 'General Liability',
        inceptionDate: '2023-01-01',
        status: 'Active',
        progress: Math.floor(Math.random() * 100),
    }));
}

const accountColumns: GridColDef[] = [
    { field: 'organization', headerName: 'Organization', flex: 1 },
    { field: 'coverage', headerName: 'Coverage', flex: 1 },
    { field: 'inceptionDate', headerName: 'Inception Date', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'progress', headerName: 'Progress', flex: 1 },
];


export function PlacementGrid() {
    const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

    return (
        <Box>
            {countries.map((country, index) => (
                <Box key={country.code}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 1,
                            bgcolor: '#f5f5f5',
                            cursor: 'pointer',
                        }}
                        onClick={() =>
                            setExpandedCountry((prev) =>
                                prev === country.code ? null : country.code
                            )
                        }
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Flag code={country.code} style={{ width: 36, height: 24 }} />
                            <Typography variant="h6">{country.name}</Typography>

                        </Box>
                        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} spacing={1} direction={"row"}>
                            <Chip
                                label={`${country.accounts.length} accounts`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                            <IconButton size="small">
                                {expandedCountry === country.code ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>
                        </Stack>
                    </Box>
                    <Collapse in={expandedCountry === country.code}>
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                columns={accountColumns}
                                rows={country.accounts.map((a, i) => ({
                                    ...a,
                                    id: `${country.code}-${i}`,
                                }))}
                                hideFooter
                            />
                        </Box>
                    </Collapse>
                </Box>
            ))}
        </Box>
    );
}

export default PlacementGrid;