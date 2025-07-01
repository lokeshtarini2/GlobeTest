import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'country', headerName: 'Country', width: 80 },
    { field: 'status', headerName: 'Confirmation / Status', width: 120 },
    { field: 'cession', headerName: 'Reinsurance Cession % to Master Policy', width: 150 },
    { field: 'premiumLocation', headerName: 'Premium Collection Location', width: 140 },
    { field: 'grossBillable', headerName: 'Gross Billable to Insured Premium', width: 150 },
    { field: 'insuredTaxes', headerName: 'Insured Payable Taxes and Fees', width: 140 },
    { field: 'basePremium', headerName: 'Base Premium', width: 100 },
    { field: 'foreignBrokerage', headerName: 'Foreign Brokerage', width: 120 },
    { field: 'localRetention', headerName: "Local Insurer's Retention", width: 120 },
    { field: 'reinsurerTaxes', headerName: 'Reinsurer Payable Taxes and Fees', width: 150 },
    { field: 'cedingCommission', headerName: 'Ceding Commission', width: 120 },
    { field: 'netPremium', headerName: 'Net Premium to Partner Market', width: 150 },
    { field: 'localInsurer', headerName: 'Local Insurer', width: 100 },
    { field: 'placementReqs', headerName: 'Local Placement Requirements and Information', width: 200 },
    { field: 'subjectives', headerName: 'Subjectives for Insured/Broker', width: 150 },
    { field: 'gpsAccount', headerName: 'GPS This Account', width: 120 },
    { field: 'gpsStatus', headerName: 'GPS Status', width: 100 },
];

const rows: GridRowsProp = [
  {
    id: 1,
    country: 'USA',
    status: 'Confirmed',
    cession: '20%',
    premiumLocation: 'New York',
    grossBillable: 100000,
    insuredTaxes: 5000,
    basePremium: 95000,
    foreignBrokerage: 2000,
    localRetention: 30000,
    reinsurerTaxes: 3000,
    cedingCommission: 2500,
    netPremium: 89500,
    localInsurer: 'ABC Insurance',
    placementReqs: 'Regulatory form 12B required',
    subjectives: 'Signed proposal form',
    gpsAccount: 'Yes',
    gpsStatus: 'Approved',
  },
];

export default function NewMASTab() {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
