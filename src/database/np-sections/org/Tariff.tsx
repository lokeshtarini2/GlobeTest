import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

const lobOptions = [
    'Marine Cargo',
    'Property',
    'Cyber Liability',
    'Freight Liability',
    'General Liability',
];

const appliedToOptions = ['Sum Insured', 'Fixed Sum'];
const currencyOptions = ['USD', 'EUR', 'GBP'];
const countryCompanyReqOptions = ['Country Requirement', 'Company Requirement'];

const initialForm = {
    requirementName: '',
    lobName: '',
    percentage: '',
    appliedTo: '',
    currency: '',
    minimumPremium: '',
    requirementType: '',
};

export default function Tariff() {
    const [form, setForm] = useState(initialForm);
    const [dataRows, setDataRows] = useState<any[]>([]);
    const [editId, setEditId] = useState<number | null>(null);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setForm(initialForm);
        setEditId(null);
    };

    const handleAddOrEdit = () => {
        if (editId !== null) {
            setDataRows((prev) =>
                prev.map((row) =>
                    row.id === editId ? { ...form, id: editId } : row
                )
            );
            setEditId(null);
        } else {
            const newRow = { ...form, id: Date.now() };
            setDataRows((prev) => [...prev, newRow]);
        }
        setForm(initialForm);
    };

    const handleDelete = (id: number) => {
        setDataRows((prev) => prev.filter((row) => row.id !== id));
    };

    const handleEdit = (id: number) => {
        const row = dataRows.find((r) => r.id === id);
        if (row) {
            setForm({ ...row });
            setEditId(id);
        }
    };

    const columns: GridColDef[] = [
        { field: 'requirementName', headerName: 'Requirement Name', flex: 1 },
        { field: 'lobName', headerName: 'LOB Name', flex: 1 },
        { field: 'percentage', headerName: '%', flex: 0.5 },
        { field: 'appliedTo', headerName: 'Applied To', flex: 1 },
        { field: 'currency', headerName: 'Currency', flex: 1 },
        { field: 'minimumPremium', headerName: 'Minimum Premium', flex: 1 },
        { field: 'requirementType', headerName: 'Country/Company Req', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row.id)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Add/Edit Requirement
            </Typography>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <InputLabel>Requirement Name</InputLabel>
                    <TextField
                        value={form.requirementName}
                        onChange={(e) => handleChange('requirementName', e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel>LOB Names</InputLabel>
                    <Select
                        value={form.lobName}
                        onChange={(e) => handleChange('lobName', e.target.value)}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            LOB Names
                        </MenuItem>
                        {lobOptions.map((lob) => (
                            <MenuItem key={lob} value={lob}>
                                {lob}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel>%</InputLabel>
                    <TextField
                        type="number"
                        value={form.percentage}
                        onChange={(e) => handleChange('percentage', e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel>Applied To</InputLabel>
                    <Select
                        value={form.appliedTo}
                        onChange={(e) => handleChange('appliedTo', e.target.value)}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Applied To
                        </MenuItem>
                        {appliedToOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel>Currency</InputLabel>
                    <Select
                        value={form.currency}
                        onChange={(e) => handleChange('currency', e.target.value)}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Currency
                        </MenuItem>
                        {currencyOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel>Minimum Premium</InputLabel>
                    <TextField
                        type="number"
                        value={form.minimumPremium}
                        onChange={(e) => handleChange('minimumPremium', e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel>Country/Company Req</InputLabel>
                    <Select
                        value={form.requirementType}
                        onChange={(e) => handleChange('requirementType', e.target.value)}
                        displayEmpty
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Country/Company Req
                        </MenuItem>
                        {countryCompanyReqOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleAddOrEdit} sx={{ mr: 2 }}>
                        {editId !== null ? 'Edit' : 'Add'}
                    </Button>
                    <Button variant="outlined" onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>

            <Box mt={4} >
                <Typography variant="h6" gutterBottom>
                    Added Requirements
                </Typography>
                <DataGrid
                    rows={dataRows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}
