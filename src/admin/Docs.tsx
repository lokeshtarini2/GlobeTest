import {
    Box,
    Button,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import { Grid, Stack } from '@mui/system';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams
} from '@mui/x-data-grid';
import React, { useState } from 'react';

const lineOfBusinessOptions = [
    "Marine Cargo",
    "Property",
    "Cyber Liability",
    "Freight Liability",
    "General Liability",
    "Management Liability",
    "Pollution/Environmental Liability",
    "Professional Indemnity / Errors and Omissions",
    "Accident & Health"
];

const fieldDescriptions = [
    "Reinsurer Name",
    "Reinsurer Rating",
    "Reinsurer Address",
    "Reinsured Name",
    "Reinsured Address",
    "Local Policy Certificate/Reference Number",
    "Original Local Insured Name",
    "Original Local Insured Tax ID",
    "Original Local Insured Address",
    "Original Local Insured Operations/Business Activity",
    "Additional Local Insured Entities",
    "Original Local Insured Contact Information",
    "Foreign Broker Name",
    "Foreign Broker Address",
    "Foreign Broker Commission",
    "Foreign Broker Contact Information",
    "Policy Period",
    "Insured Goods",
    "Coverage",
    "Perils",
    "Conveyance",
    "Territory",
    "Currency",
    "Rate of Exchange",
    "Limits of Liability",
    "Deductible",
    "Valuation",
    "Estimated Annual Turnover/Exposure Type",
    "Estimated Annual Turnover",
    "Storage Information",
    "Rating Type",
    "Partner Market Suggested Premium",
    "Partner Market's Target Reinsurance Share",
    "Reinsurer's Reinsurance Share",
    "Base Premium",
    "Premium Calculation",
    "Gross Billable to Insured Premium",
    "Insured Payable Tax",
    "Base Premium",
    "Retention",
    "Foreign Brokerage",
    "Reinsurer Payable Tax",
    "Ceding Commission",
    "Net Premium to Reinsurer",
    "Premium Collection Location",
    "Insuring Conditions",
    "Additional Terms and Conditions",
    "Law and Jurisdiction for the Original Policy (issued by the local insurer)",
    "Law and Jurisdiction for Reinsurance",
    "Claim Handling Guidelines",
    "Contact Information for Loss Notice",
    "Loss Information for the Past 3 to 5 Years",
    "Any Certificcate Required for This Country and How Many",
    "Additional Information and Comments for this Country",
    "Any Other Services Requested From the Local Insurer",
    "Any Attachment",
    "Globex Underwriting Program Fee",
    "Local Placement Requirements and Information",
    "Subjectivities for Insured/Broker",
    "Master policy location",
    "Master Policy Number",
    "Country Name",
    "PM Office",
    "PM Office Address"
];

type FieldRow = {
    id: number;
    fieldDescription: string;
    raField: string;
    include: boolean;
};

const Docs: React.FC = () => {
    const [selectedLOB, setSelectedLOB] = useState<string>('');
    const [rows, setRows] = useState<FieldRow[]>([]);

    const handleLOBChange = (event: SelectChangeEvent) => {
        const lob = event.target.value;
        setSelectedLOB(lob);
        setRows(
            fieldDescriptions.map((desc, index) => ({
                id: index + 1,
                fieldDescription: desc,
                raField: '',
                include: false,
            }))
        );
    };

    const handleCheckboxChange = (id: number) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, include: !row.include } : row
            )
        );
    };

    const handleSave = () => {
        const includedFields = rows.filter((row) => row.include);
        alert(`Saved ${includedFields.length} fields.`);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'fieldDescription', headerName: 'Field Description', flex: 1 },
        {
            field: 'raField',
            headerName: 'RA Field',

            width: 90,
            renderCell: (params: GridRenderCellParams<FieldRow>) => (
                <input
                    type="checkbox"
                    checked={params.row.include}
                    onChange={() => handleCheckboxChange(params.row.id)}
                />
            ),
            sortable: false,
            disableColumnMenu: true,
        },
    ];


    return (
        <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
                Reinsurance Agreement Document Fields Selection
            </Typography>

            <Grid container spacing={2} direction={"column"}>
                <Grid size={6}>

                    <Select
                        renderValue={(value: 'application' | 'placement') => {
                            if (!value) {
                                return <Typography color="gray">Line of Business</Typography>;
                            } else {
                                return value.charAt(0).toUpperCase() + value.slice(1);
                            }
                        }}
                        onChange={handleLOBChange}
                        displayEmpty
                        input={<OutlinedInput />}
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            <Typography>Select PM</Typography>
                        </MenuItem>
                        {lineOfBusinessOptions.map((lob) => (
                            <MenuItem key={lob} value={lob}>
                                {lob}
                            </MenuItem>
                        ))}
                    </Select>

                </Grid>
            </Grid>


            {
                selectedLOB && (
                    <>
                        <Box sx={{ height: 600, width: '100%', mb: 2 }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.id}
                                disableRowSelectionOnClick
                                pageSizeOptions={[25, 50, 100]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 25, page: 0 },
                                    },
                                }}
                            />
                        </Box>

                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </>
                )
            }
        </Stack >
    );
};

export default Docs;
