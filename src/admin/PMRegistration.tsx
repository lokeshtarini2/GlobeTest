import { Edit, PersonAdd } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  OutlinedInput,
  Tooltip,
  Typography
} from '@mui/material';
import { Grid, Stack } from '@mui/system';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
} from '@mui/x-data-grid';
import React from 'react';
import PMDialog from './PMDailog';

export function generatePMRows(count: number): GridRowsProp {
  const rows = [];

  const orgs = ['Alpha Corp', 'Beta LLC', 'Gamma Ltd', 'Delta Inc', 'Epsilon GmbH'];
  const locations = ['New York, USA', 'London, UK', 'Berlin, Germany', 'Tokyo, Japan', 'Sydney, Australia'];
  const contacts = ['John Doe', 'Jane Smith', 'Carlos Ruiz', 'Emily Wang', 'Ali Khan'];
  const aliases = ['AC', 'BL', 'GL', 'DI', 'EG'];
  const phones = ['+1 123 456 7890', '+44 20 7946 0958', '+49 30 123456', '+81 3 1234 5678', '+61 2 9876 5432'];

  for (let i = 0; i < count; i++) {
    rows.push({
      id: i + 1,
      organization: orgs[i % orgs.length],
      aliases: aliases[i % aliases.length],
      location: locations[i % locations.length],
      contact: contacts[i % contacts.length],
      phone: phones[i % phones.length],
    });
  }

  return rows;
}

export default function PMRegistration() {
  const [open, setOpen] = React.useState(false);
  const [selectedPM, setSelectedPM] = React.useState<any>(null);
  const [mode, setMode] = React.useState<'add' | 'edit'>('add');

  const handleClickOpen = () => {
    setMode('add');
    setSelectedPM(null);
    setOpen(true);
  };

  const handleEdit = (row: any) => {
    setMode('edit');
    setSelectedPM(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = generatePMRows(15);

  const columns: GridColDef[] = [
    { field: 'organization', headerName: 'Organization Name', flex: 2, minWidth: 200 },
    { field: 'aliases', headerName: 'Alias', flex: 1.5, minWidth: 150 },
    { field: 'location', headerName: 'City / Country', flex: 2, minWidth: 200 },
    { field: 'contact', headerName: 'Contact Name', flex: 2, minWidth: 200 },
    { field: 'phone', headerName: 'Phone Number', flex: 1.5, minWidth: 160 },
    {
      field: 'edit',
      headerName: '',
      flex: 0.2,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <Tooltip title="Edit PM Details">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', m: 0, p: 0 }}>
      <Stack spacing={2}>
        <Typography variant="h6" gutterBottom>
          Partner Market Registration
        </Typography>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ width: '100%', flexDirection: 'row', gap: 2, mb: 2 }}>
            <OutlinedInput
              id="search"
              name="search"
              type="text"
              placeholder="Search Organization, Location, Contact, etc."
              sx={{ flexGrow: 2 }}
            />
            <Box>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<PersonAdd />}
                onClick={handleClickOpen}
                disableElevation
                sx={{ width: { xs: '100%', sm: 'fit-content' } }}
              >
                Add PM
              </Button>
            </Box>
          </Stack>
          <DataGrid
            sx={{ width: '100%', height: 500 }}
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Grid>
      </Stack>
      <PMDialog open={open} onClose={handleClose} mode={mode} initialValues={selectedPM} />
    </Box>
  );
}
