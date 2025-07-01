import {
    Box,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';

const variableRows = [
    { id: 1, variable: 'V', taxName: 'Value Added Tax' },
    { id: 2, variable: 'R', taxName: 'Reinsurance Tax' },
    { id: 3, variable: 'F', taxName: 'Policy Issuance Fee' },
    { id: 4, variable: 'D', taxName: 'Stamp Duty' },
    { id: 5, variable: 'L', taxName: 'Solvency Tax' },
];

// Dummy dropdown values for LOB and Currency
const lobOptions = [
    'Marine Cargo',
    'Property',
    'Cyber Liability',
    'General Liability',
    'Other',
];

const currencyOptions = ['USD', 'EUR', 'GBP'];

export default function Taxes() {
    const [rows, setRows] = useState(
        variableRows.map((row) => ({
            ...row,
            lob: '',
            responsible: '',
            percent: '',
            calc: '',
            currency: '',
            amount: '',
        }))
    );

    const handleChange = (
        id: number,
        field: string,
        value: string
    ) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const renderSelectCell = (
        params: GridRenderCellParams,
        field: string,
        options: string[],
        placeholder: string
    ) => (
        <Select
            value={params.row[field] || ''}
            onChange={(e: SelectChangeEvent) =>
                handleChange(params.id as number, field, e.target.value)
            }
            displayEmpty
            fullWidth
        >
            <MenuItem value="" disabled>
                {placeholder}
            </MenuItem>
            {options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                    {opt}
                </MenuItem>
            ))}
        </Select>
    );

    const renderInputCell = (
        params: GridRenderCellParams,
        field: string
    ) => (
        <TextField
            value={params.row[field] || ''}
            onChange={(e) => handleChange(params.id as number, field, e.target.value)}
            fullWidth
            variant="standard"
            inputProps={{ style: { padding: '6px 8px' } }}
        />
    );

    const columns: GridColDef[] = [
        { field: 'variable', headerName: 'Variable', flex: 0.5 },
        { field: 'taxName', headerName: 'Tax Names', flex: 2 },
        {
            field: 'lob',
            headerName: 'LOB',
            flex: 1,
            renderCell: (params) =>
                renderSelectCell(params, 'lob', lobOptions, 'Select LOB'),
        },
        {
            field: 'responsible',
            headerName: 'Who is responsible',
            flex: 1.5,
            renderCell: (params) =>
                renderSelectCell(params, 'responsible', ['Reinsurer payable', 'Insured payable'], 'Select party'),
        },
        {
            field: 'percent',
            headerName: '%',
            flex: 0.7,
            renderCell: (params) => renderInputCell(params, 'percent'),
        },
        {
            field: 'calc',
            headerName: 'Calc',
            flex: 1,
            renderCell: (params) => renderInputCell(params, 'calc'),
        },
        {
            field: 'currency',
            headerName: 'Currency',
            flex: 1,
            renderCell: (params) =>
                renderSelectCell(params, 'currency', currencyOptions, 'Currency'),
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1,
            renderCell: (params) => renderInputCell(params, 'amount'),
        },
    ];

    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                disableColumnMenu
                disableRowSelectionOnClick
            />
        </Box>
    );
}
