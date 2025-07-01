import { Edit, PersonAdd } from '@mui/icons-material';
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
import UserDialog from './UserDailog';

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

export function generateUserRows(count: number): GridRowsProp {
  const rows = [];

  const sampleNames = ['Alice Johnson', 'Bob Smith', 'Charlie Lee', 'Dana Perez', 'Eli Zhang'];
  const sampleEmails = ['alice@globex.com', 'bob@globex.com', 'charlie@globex.com', 'dana@globex.com', 'eli@globex.com'];
  const sampleAddresses = [
    '123 Main St, Springfield',
    '456 Maple Ave, Boston',
    '789 Oak Dr, Seattle',
    '321 Pine St, Denver',
    '654 Cedar Rd, Austin',
  ];
  const roles = ['Admin', 'Editor', 'Viewer'];

  for (let i = 0; i < count; i++) {
    const fullName = sampleNames[i % sampleNames.length];
    const [firstName, lastName] = fullName.split(' ');

    rows.push({
      id: i + 1,
      name: fullName,
      firstName,
      lastName,
      email: sampleEmails[i % sampleEmails.length],
      address: sampleAddresses[i % sampleAddresses.length],
      userRole: roles[i % roles.length],
    });
  }

  return rows;
}

const Users: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

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

  const rows = generateUserRows(20);

  const userColumns: GridColDef[] = [
    {
      field: 'user',
      headerName: 'User',
      flex: 2,
      minWidth: 200,
      renderCell: renderUserCell,
      sortable: false,
    },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'address', headerName: 'Address', flex: 2, minWidth: 200 },
    {
      field: 'userRole',
      headerName: 'Role',
      flex: 1,
      minWidth: 130,
      renderCell: (params) =>
        renderRole(params.value as string, (newRole) => (params.row.userRole = newRole)),
    },
    {
      field: 'edit',
      headerName: '',
      flex: 0.2,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <Tooltip title="Edit User Details">
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
          Users
        </Typography>

        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Stack sx={{ width: '100%', flexDirection: 'row', gap: 2, mb: 2 }}>
            <OutlinedInput
              id="search"
              name="search"
              type="text"
              placeholder="Search Name, Email, Address, etc."
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
                New User
              </Button>
            </Box>
          </Stack>
          <DataGrid
            sx={{ width: '100%', height: 500 }}
            rows={rows}
            columns={userColumns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Grid>
      </Stack>
      <UserDialog open={open} handleClose={handleClose} user={selectedUser} mode={mode} />
    </Box>
  );
};

export default Users;
