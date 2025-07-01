import { Delete, RemoveRedEye } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    MenuItem,
    OutlinedInput,
    Select,
    Tooltip,
    Typography
} from '@mui/material';
import { Grid, Stack } from '@mui/system';
import {
    DataGrid,
    GridColDef,
    GridRowsProp
} from '@mui/x-data-grid';
import React from 'react';
import { Link } from 'react-router';

function renderUserCell(params: any) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                    {params.row.firstName?.[0]}
                </Avatar>
                <Typography variant="body2" noWrap>
                    {`${params.row.firstName} ${params.row.lastName}`}
                </Typography>
            </Box>
        </Box>
    );
}

function renderRole(role: string, onChange: (newRole: string) => void) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Select
                size="small"
                value={role.toLowerCase()}
                onChange={(e) => onChange(e.target.value)}
                sx={{ width: '100%' }}
            >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
        </Box>
    );
}

export function generateRows(count: number): GridRowsProp {
    const rows = [];

    const sampleEmails = ['alice@globex.com', 'bob@globex.com', 'charlie@globex.com', 'dana@globex.com', 'eli@globex.com'];
    const expiryDates = ['2025-06-01', '2025-07-15', '2025-08-20', '2025-09-30', '2025-10-05'];
    const statuses = ['Active', 'Expired'];

    for (let i = 0; i < count; i++) {
        rows.push({
            id: i + 1,
            email: sampleEmails[i % sampleEmails.length],
            expiryDate: expiryDates[i % expiryDates.length],
            status: statuses[i % statuses.length],
        });
    }

    return rows;
}


const NPRegistration: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = React.useState<any>(null);


    const [dateValue, setDateValue] = React.useState<string | null>(null);

    const [rowDateValues, setRowDateValues] = React.useState<Record<number, string>>({});

    const handleDateChange = (id: number, value: string) => {
        setRowDateValues((prev) => ({ ...prev, [id]: value }));
    };


    const handleClickOpen = () => {
        setMode('add');
        setSelectedUser(null);
        setOpen(true);
    };

    const handleEdit = (user: any) => {
        setMode('edit');
        setSelectedUser({
            ...user,
            firstName: user.firstName || user.name.split(' ')[0],
            lastName: user.lastName || user.name.split(' ')[1],
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    const rows = generateRows(20);

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
        {
            field: 'expiryDate',
            headerName: 'Expiry Date',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'extend',
            headerName: 'Extend',
            flex: 2,
            minWidth: 250,
            sortable: false,
            renderCell: (params) => {
                const id = params.row.id;
                const value = rowDateValues[id] || '';
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <OutlinedInput
                                type="date"
                                size="small"
                                value={value}
                                onChange={(e) => handleDateChange(id, e.target.value)}
                            />
                            {value && (
                                <Button size="small" variant="contained" color="secondary">Confirm</Button>
                            )}
                        </Stack>
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'view',
            headerName: '',
            flex: 0.2,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                    <Link to='/database/token'>
                        <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEdit(params)}>
                                <RemoveRedEye />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Box>
            ),
        },
        {
            field: 'delete',
            headerName: '',
            flex: 0.2,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                    <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleEdit(params.row)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];


    return (
        <Box sx={{ height: 'auto', display: 'flex', width: '100%' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Stack sx={{ width: '100%', flexDirection: 'row', gap: 2 }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Generate Token
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                            <OutlinedInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                sx={{ flexGrow: 1 }}
                            />
                            <OutlinedInput
                                id="expiryDate"
                                name="expiryDate"
                                type="date"
                                placeholder="Expiry Date"
                                sx={{ flexGrow: 1 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                            >
                                Generate Token
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
                <DataGrid
                    sx={{ width: '100%', height: 'auto' }}
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                />
            </Grid>

        </Box>
    );
};

export default NPRegistration;
