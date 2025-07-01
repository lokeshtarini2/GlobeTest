import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
const columns: GridColDef[] = [
    { field: 'country', headerName: 'Country', width: 100 },
    { field: 'status', headerName: 'Confirmation / Status', width: 150 },
    { field: 'cession', headerName: 'Reinsurance Cession % to Master Policy', type: 'number', width: 180 },
    { field: 'premiumLocation', headerName: 'Premium Collection Location', width: 160 },
    { field: 'grossPremium', headerName: 'Gross Billable to Insured Premium', type: 'number', width: 180 },
    { field: 'insuredTaxes', headerName: 'Insured Payable Taxes and Fees', type: 'number', width: 160 },
    { field: 'basePremium', headerName: 'Base Premium', type: 'number', width: 130 },
    { field: 'foreignBrokerage', headerName: 'Foreign Brokerage', type: 'number', width: 150 },
    { field: 'localRetention', headerName: "Local Insurer's Retention", type: 'number', width: 160 },
    { field: 'reinsurerTaxes', headerName: 'Reinsurer Payable Taxes and Fees', type: 'number', width: 180 },
    { field: 'cedingCommission', headerName: 'Ceding Commission', type: 'number', width: 160 },
    { field: 'netPremium', headerName: 'Net Premium to Partner Market', type: 'number', width: 180 },
    { field: 'localInsurer', headerName: 'Local Insurer', width: 130 },
    { field: 'gpsAccount', headerName: 'GPS This Account', width: 130 },
    { field: 'gpsStatus', headerName: 'GPS Status', width: 110 },
  ];
  

const rows = [
  {
    id: 1,
    country: 'Brazil',
    status: 'Confirmed',
    cession: 80,
    premiumLocation: 'Local',
    grossPremium: 120000,
    insuredTaxes: 5000,
    basePremium: 115000,
    foreignBrokerage: 3000,
    localRetention: 20000,
    reinsurerTaxes: 1500,
    cedingCommission: 10000,
    netPremium: 95000,
    localInsurer: 'Mapfre',
    gpsAccount: '123456',
    gpsStatus: 'Active',
  },
  // Add more rows as needed
];

export default function LocalReview() {
  return (
    <Box height={600} width="100%">
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
      />
    </Box>
  );
}
