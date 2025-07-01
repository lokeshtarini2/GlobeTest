import { Edit, Link as LinkIcon, RemoveRedEye } from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router';

const countries = ['USA', 'UK', 'India', 'Canada', 'Germany'];
const linesOfBusiness = ['Marine Cargo',
    'Property',
    'Cyber Liability',
    'Freight Liability',
    'General Liability',
    'Management Liability',
    'Pollution/Environmental Liability',
    'Professional Indemnity / Errors and Omissions',
    'Accident & Health'];

const generateRows = (): GridRowsProp => {
    return Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        address: `123 Street ${index + 1}`,
        country: countries[index % countries.length],
        phone: `+123456789${index}`,
    }));
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'S. No', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'address', headerName: 'Address', flex: 1, minWidth: 200 },
    { field: 'country', headerName: 'Country', flex: 1, minWidth: 120 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 150 },

    {
        field: 'edit',
        headerName: '',
        width: 220,
        sortable: false,
        renderCell: () => (
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    px: 1
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Button variant="outlined" size="small" startIcon={<LinkIcon />}>
                        Generate
                    </Button>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Link to="/database/token">
                        <Tooltip title="Edit">
                            <IconButton size="small">
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Tooltip title="View">
                        <IconButton size="small">
                            <RemoveRedEye />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>
        ),
    },

];

const NetworkPartners: React.FC = () => {
    const [rows, setRows] = React.useState(generateRows());
    const [name, setName] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [lob, setLob] = React.useState('');
    const [authorized, setAuthorized] = React.useState('');
    const [willingness, setWillingness] = React.useState<string[]>([]);

    const handleSearch = () => {
        // Add filter logic here
        console.log({ name, country, lob, authorized, willingness });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Network Partners
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={3}>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid size={2}>
                    <Select
                        fullWidth
                        displayEmpty
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <MenuItem value="">All Countries</MenuItem>
                        {countries.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={2}>
                    <Select
                        fullWidth
                        displayEmpty
                        value={lob}
                        onChange={(e) => setLob(e.target.value)}
                    >
                        <MenuItem value="">All LOBs</MenuItem>
                        {linesOfBusiness.map((lob) => (
                            <MenuItem key={lob} value={lob}>
                                {lob}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={2}>
                    <Select
                        fullWidth
                        displayEmpty
                        value={authorized}
                        onChange={(e) => setAuthorized(e.target.value)}
                    >
                        <MenuItem value="">Authorized?</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </Grid>
                <Grid size={2}>
                    <Select
                        fullWidth
                        multiple
                        displayEmpty
                        value={willingness}
                        onChange={(e) => setWillingness(e.target.value as string[])}
                        renderValue={(selected) =>
                            selected.length ? (
                                selected.map((item) => (
                                    <Chip key={item} label={item} size="small" sx={{ mr: 0.5 }} />
                                ))
                            ) : (
                                <Typography color="text.secondary">Willingness</Typography>
                            )
                        }
                    >
                        {['Aggressive', 'Neutral', 'Avoid'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={1}>
                    <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
                        Search
                    </Button>
                </Grid>
            </Grid>


            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}


                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default NetworkPartners;
