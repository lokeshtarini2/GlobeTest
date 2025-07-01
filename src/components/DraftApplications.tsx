import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DraftApplicationsModalProps {
  open: boolean;
  handleClose: () => void;
}


const rows = [
  {
    id: 1,
    partnerMarket: 'Allied World Assurance Company',
    insuredName: 'ABC',
    coverage: 'Property',
    createdDate: '2025-05-01',
  },
  {
    id: 2,
    partnerMarket: 'Liberty Mutual (Switzerland Office)',
    insuredName: 'ABC',
    coverage: 'Cyber Liability',
    createdDate: '2025-04-27',
  },
];


const columns: GridColDef[] = [
  { field: 'partnerMarket', headerName: 'Partner Market', flex: 2 },
  { field: 'insuredName', headerName: 'Master Policy Insured Name', flex: 2 },
  { field: 'coverage', headerName: 'Coverage', flex: 1.5 },
  { field: 'createdDate', headerName: 'Created Date', flex: 1 },
  {
    field: 'edit',
    headerName: '',
    sortable: false,
    filterable: false,
    width: 45,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
        <Tooltip title="Edit Draft">
          <IconButton size="small" color="primary" onClick={() => alert(`Edit ${params.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

    ),
  },
  {
    field: 'delete',
    headerName: '',
    sortable: false,
    filterable: false,
    width: 45,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
        <Tooltip title="Delete Draft">
          <IconButton size="small" color="error" onClick={() => alert(`Delete ${params.id}`)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

    ),
  },
];

export default function DraftApplications({
  open,
  handleClose,
}: DraftApplicationsModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundImage: 'none',
            minWidth: '500px',
          },
        },
      }}
    >
      <DialogTitle>Draft Applications</DialogTitle>
      <DialogContent sx={{ height: 400, mt: 1 }}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="outlined" onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
