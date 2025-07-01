import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';

const lineItems = [
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

export default function LinesOfBusiness() {
    const [rows, setRows] = useState(
        lineItems.map((label, index) => ({
            id: index,
            lineOfBusiness: label,
            authorizedToWrite: '',
            willingnessToWrite: '',
        }))
    );

    const [otherLineText, setOtherLineText] = useState('');

    const handleSelectChange = (
        id: number,
        field: 'authorizedToWrite' | 'willingnessToWrite',
        value: string
    ) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const handleOtherSubmit = () => {
        console.log('Other line specified:', otherLineText);
        // You could also update the row or send it to a backend here
    };

    const renderDropdownCell = (
        params: GridRenderCellParams,
        field: 'authorizedToWrite' | 'willingnessToWrite',
        placeholder: string
    ) => {
        const isOtherLine = params.row.lineOfBusiness === 'Other Lines, please specify';

        return (
            <Box width="100%">
                <Select
                    value={params.row[field] || ''}
                    onChange={(e: SelectChangeEvent) =>
                        handleSelectChange(params.id as number, field, e.target.value)
                    }
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="" disabled>
                        {placeholder}
                    </MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
                {isOtherLine && field === 'willingnessToWrite' && (
                    <Stack direction="row" spacing={1} mt={1}>
                        <TextField
                            size="small"
                            placeholder="Specify other line"
                            value={otherLineText}
                            onChange={(e) => setOtherLineText(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleOtherSubmit}>
                            Submit
                        </Button>
                    </Stack>
                )}
            </Box>
        );
    };

    const columns: GridColDef[] = [
        {
            field: 'lineOfBusiness',
            headerName: 'Line of Business',
            flex: 1,
        },
        {
            field: 'authorizedToWrite',
            headerName: 'Authorized to Write',
            flex: 1,
            sortable: false,
            renderCell: (params) =>
                renderDropdownCell(params, 'authorizedToWrite', 'Authorized to Write'),
        },
        {
            field: 'willingnessToWrite',
            headerName: 'Willingness to Write',
            flex: 1,
            sortable: false,
            renderCell: (params) =>
                renderDropdownCell(params, 'willingnessToWrite', 'Willingness to Write'),
        },
    ];

    return (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                disableColumnMenu
                disableRowSelectionOnClick
                autoHeight
            />
        </Box>
    );
}
