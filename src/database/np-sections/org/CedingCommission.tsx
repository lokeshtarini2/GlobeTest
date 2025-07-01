import {
    Box,
    Button,
    Grid,
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
    'Management Liability',
    'Pollution/Environmental Liability',
    'Professional Indemnity / Errors and Omissions',
    'Construction Lines',
    'Machinery Breakdown',
    'Employer Liability',
    'Accident & Health',
    'Commercial Auto Liability',
    'Bond/Surety',
    'Clinical Trial Liability',
    'Other Lines, please specify',
];

const currencyOptions = ['USD', 'EUR', 'GBP'];

const initialForm = {
    variable: 'C',
    lob: '',
    percent: '',
    calc: '',
    currency: '',
    flatAmount: '',
};

export default function CedingCommission() {
    const [form, setForm] = useState(initialForm);
    const [entries, setEntries] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleChange = (field: string, value: any) => {
        setForm({ ...form, [field]: value });
    };

    const handleAddOrEdit = () => {
        if (editIndex !== null) {
            const updated = [...entries];
            updated[editIndex] = { ...form };
            setEntries(updated);
            setEditIndex(null);
        } else {
            setEntries([...entries, { ...form }]);
        }
        setForm(initialForm);
    };

    const handleEdit = (index: number) => {
        setForm(entries[index]);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index));
        if (editIndex === index) {
            setForm(initialForm);
            setEditIndex(null);
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setEditIndex(null);
    };

    const entryColumns: GridColDef[] = [
        { field: 'variable', headerName: 'Variable', flex: 1 },
        { field: 'lob', headerName: 'LOB Names', flex: 2 },
        { field: 'percent', headerName: '%', flex: 1 },
        { field: 'calc', headerName: 'Calc', flex: 1 },
        { field: 'currency', headerName: 'Currency', flex: 1 },
        { field: 'flatAmount', headerName: 'Flat Amount', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.5,
            renderCell: (params) => {
                const index = Number(params.id);
                return (
                    <Box>
                        <Button size="small" onClick={() => handleEdit(index)}>Edit</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(index)}>Delete</Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Typography variant="h6" gutterBottom>LOB Variable Entry</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid size={3}>
                    <InputLabel htmlFor="variable-input">Variable</InputLabel>
                    <TextField
                        id="variable-input"
                        value={form.variable}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="lob-select">LOB Names</InputLabel>
                    <Select
                        id="lob-select"
                        value={form.lob}
                        displayEmpty
                        fullWidth
                        onChange={(e) => handleChange('lob', e.target.value)}
                    >
                        <MenuItem value="" disabled>LOB Names</MenuItem>
                        {lobOptions.map((lob) => (
                            <MenuItem key={lob} value={lob}>{lob}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="percent-input">%</InputLabel>
                    <TextField
                        id="percent-input"
                        value={form.percent}
                        onChange={(e) => handleChange('percent', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="calc-input">Calc</InputLabel>
                    <TextField
                        id="calc-input"
                        value={form.calc}
                        onChange={(e) => handleChange('calc', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="currency-select">Currency</InputLabel>
                    <Select
                        id="currency-select"
                        value={form.currency}
                        displayEmpty
                        fullWidth
                        onChange={(e) => handleChange('currency', e.target.value)}
                    >
                        <MenuItem value="" disabled>Currency</MenuItem>
                        {currencyOptions.map((cur) => (
                            <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="flat-amount-input">Flat Amount</InputLabel>
                    <TextField
                        id="flat-amount-input"
                        value={form.flatAmount}
                        onChange={(e) => handleChange('flatAmount', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={3}>
                    <Button
                        variant="contained"
                        color={editIndex !== null ? 'warning' : 'primary'}
                        onClick={handleAddOrEdit}
                        fullWidth
                    >
                        {editIndex !== null ? 'Edit' : 'Add'}
                    </Button>
                </Grid>
            </Grid>

            <Box mt={2}>
                <Button onClick={handleReset}>Reset</Button>
            </Box>

            {entries.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>Entries</Typography>
                    <DataGrid
                        autoHeight
                        rows={entries.map((entry, index) => ({ id: index, ...entry }))}
                        columns={entryColumns}
                        hideFooter
                        disableRowSelectionOnClick
                    />
                </Box>
            )}
        </Box>
    );
}
