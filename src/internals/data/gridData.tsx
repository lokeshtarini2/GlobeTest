import { AttachFile, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import AddAttachment from '../../components/AddAttachments';
import EditDetails from '../../components/EditDetails';

function renderStatus(status: string, onChange: (newStatus: string) => void) {
  const colors: Record<string, 'success' | 'default' | 'warning' | 'error' | 'info'> = {
    Active: 'success',
    Inactive: 'default',
    Enquiry: 'warning',
    New: 'info',
    Bound: 'success',
  };
  const color = colors[status] || 'default';
  return <RenderStatusChip status={status} onChange={onChange} color={color} />;
}

function RenderStatusChip({
  status,
  color,
  onChange,
}: {
  status: string;
  color: 'success' | 'default' | 'warning' | 'error' | 'info';
  onChange: (newStatus: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (editing) setOpen(true);
  }, [editing]);

  const handleChipClick = () => setEditing(true);
  const handleChange = (event: any) => {
    onChange(event.target.value);
    setEditing(false);
    setOpen(false);
  };
  const handleBlur = () => {
    setEditing(false);
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      {editing ? (
        <Select
          autoFocus
          open={open}
          size="small"
          value={status}
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{ fontSize: '0.75rem', minWidth: 100 }}
        >
          {['New', 'Active', 'Enquiry', 'Bound', 'Cancelled', 'Closed', 'Completed'].map((s) => (
            <MenuItem key={s} value={s} sx={{ fontSize: '0.75rem' }}>{s}</MenuItem>
          ))}
        </Select>
      ) : (
        <Chip
          label={status}
          color={color}
          variant="outlined"
          onDelete={handleChipClick}
          deleteIcon={<Edit sx={{ fontSize: '1rem' }} />}
          size="small"
          sx={{ cursor: 'pointer', width: '80px', fontSize: '0.7rem' }}
        />
      )}
    </Box>
  );
}

function renderPaceChip(pace: string) {
  const colors: Record<string, 'success' | 'warning' | 'default'> = {
    'Ahead': 'success',
    'On Track': 'default',
    'Lagging': 'warning',
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Chip
        label={pace}
        color={colors[pace] || 'default'}
        variant="outlined"
        size="small"
        sx={{ width: '80px', fontSize: '0.7rem' }}
      />
    </Box>
  );
}

function renderButton(label: string, marketAlias: string, coverage: string) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Link
        to={`/applications/details?id=${label}&partnerMarket=${encodeURIComponent(marketAlias)}&coverage=${encodeURIComponent(coverage)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="contained" size="small" sx={{ fontSize: '0.65rem', minWidth: 40, padding: '1px 4px' }}>
          {label}
        </Button>
      </Link>
    </Box>
  );
}

function renderAttachments() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Tooltip title="Add Attachments" arrow placement="top">
        <IconButton size="small" onClick={() => setOpen(true)}>
          <AttachFile sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Tooltip>
      <AddAttachment open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
}

function renderEdit() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Tooltip title="Edit Dates and Notes" arrow placement="top" >
        <IconButton size="small" onClick={() => setOpen(true)}>
          <Edit sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Tooltip>
      <EditDetails open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
}

function renderCheckbox(checked: boolean) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Checkbox
        checked={checked}
        size="small"
      />
    </Box>
  );
}

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, maxWidth: 50, renderCell: (params) => renderButton(params.value, params.row.marketAlias, params.row.coverage) },
  {
    field: 'partnerMarket', headerName: 'PM', flex: 1, minWidth: 80, renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Tooltip title={params.row.partnerMarket} arrow
          placement="top" slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -24],
                  },
                },
              ],
            },

          }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
            {params.row.marketAlias}
          </span>
        </Tooltip>
      </Box>
    )
  },
  {
    field: 'organization', headerName: 'Insured', flex: 2, minWidth: 100
  },
  { field: 'coverage', headerName: 'Coverage', flex: 1, minWidth: 100 },
  { field: 'inceptionDate', headerName: 'Inception', flex: 1, minWidth: 90 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 100,
    renderCell: (params) => renderStatus(params.value as string, (newStatus) => (params.row.status = newStatus)),
  },
  { field: 'accountHandlerName', headerName: 'Handler', flex: 1, minWidth: 120 },

  { field: 'accountExecutive', headerName: 'Executive', flex: 1, minWidth: 110 },
  { field: 'uwName', headerName: 'UW', flex: 1, minWidth: 90 },
  {
    field: 'priority',
    headerName: 'Priority',
    flex: 0.5,
    minWidth: 50,
    renderCell: (params) => renderCheckbox(params.value),
  },
  {
    field: 'escalated',
    headerName: 'Escalated',
    flex: 0.5,
    minWidth: 50,
    renderCell: (params) => renderCheckbox(params.value),
  },
  {
    field: 'pace',
    headerName: 'Pace',
    flex: 1,
    minWidth: 90,
    renderCell: (params) => renderPaceChip(params.value),
  },
  { field: 'gpsName', headerName: 'GPS' },
  { field: 'dptName', headerName: 'DPT' },
  { field: 'documents', headerName: '', flex: 0.2, minWidth: 50, renderCell: () => renderAttachments() },
  { field: 'edit', headerName: '', flex: 0.2, minWidth: 50, renderCell: () => renderEdit() },
];


const sampleOrganizations = ['EQ Resources Limited', 'Knowledge Pro Holdings L.P.', 'Closure Systems', 'ACOEM Group', 'VALLOUREC', 'Derichebourg'];
const sampleMarkets = ['Allied World Assurance Company', 'Liberty Mutual (Switzerland Office)', 'Falvey Cargo Underwriting', 'Everest Insurance Management and Professional Lines', 'Liberty Mutual (France Office)'];
const sampleMarketsAlias = ['AWAC', 'LM (SW)', 'FCU', 'EIMPL', 'LM (FR)'];
const coverages = [
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

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function generateRows(count: number): GridRowsProp {
  const rows: Array<any> = [];
  const allStatuses = ['Active', 'Enquiry', 'New', 'Bound'];
  const paceOptions = ['On Track', 'Lagging', 'Ahead'];

  for (let i = 1; i <= count; i++) {
    rows.push({
      id: String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
      partnerMarket: sampleMarkets[i % sampleMarkets.length],
      marketAlias: sampleMarketsAlias[i % sampleMarketsAlias.length],
      organization: sampleOrganizations[i % sampleOrganizations.length],
      coverage: coverages[i % coverages.length],
      inceptionDate: randomDate(new Date(2023, 0, 1), new Date()),
      status: allStatuses[i % allStatuses.length],
      accountHandlerName: `Handler ${i}`,
      gpsName: `GPS ${i}`,
      accountExecutive: `Exec ${i}`,
      dptName: `DPT ${i}`,
      uwName: `UW ${i}`,
      priority: i % 2 === 0,
      escalated: i % 3 === 0,
      pace: paceOptions[i % paceOptions.length],
    });
  }

  return rows as GridRowsProp;
}

export const rows: GridRowsProp = generateRows(30);

export default function CompressedDataGrid() {
  return (
    <Box sx={{ height: '90vh', width: '100%' }}>
      <DataGrid
        sx={{
          fontSize: '0.75rem',
          '& .MuiDataGrid-cell': {
            py: 0.5,
            px: 1,
          },
          '& .MuiDataGrid-columnHeaders': {
            minHeight: 30,
            height: 30,
          },
          '& .MuiDataGrid-cellContent': {
            lineHeight: '1.2em',
          },
        }}
        rows={rows}
        columns={columns}
        rowHeight={32}
        disableColumnMenu
        hideFooter

      />
    </Box>
  );
}
