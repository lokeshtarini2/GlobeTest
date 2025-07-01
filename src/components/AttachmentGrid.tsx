// AttachmentGrid.tsx
import { Delete } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface AttachmentGridProps {
  scopeType: 'application' | 'country' | '';
  selectedCountry: string;
  setScopeType: React.Dispatch<React.SetStateAction<'application' | 'country' | ''>>;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  attachmentType: string;
  setAttachmentType: React.Dispatch<React.SetStateAction<string>>;
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}

const applicationAttachmentTypes = [
  'General Attachments',
  'Preliminary MAS Attachments',
  'MAS Attachments',
];

const countryAttachmentTypes = [
  'RA Drafts Attachments',
  'RA signed by Reinsurer Attachments',
  'Completed RAS Attachments',
  'Policies and Endorsements Attachments',
  'Invoices Attachments',
  'Globex Country Fee Attachments',
];

export default function AttachmentGrid({
  scopeType,
  selectedCountry,
  setScopeType,
  setSelectedCountry,
  attachmentType,
  setAttachmentType,
  rows,
  setRows,
}: AttachmentGridProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const newRow = {
      id: rows.length + 1,
      name: acceptedFiles[0].name,
      type: attachmentType,
      uploadDate: new Date().toLocaleDateString('en-GB'),
      documentDate: new Date().toLocaleDateString('en-GB'),
      scope: scopeType === 'application' ? 'application' : 'Country',
      country: scopeType === 'country' ? selectedCountry : '',
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const showUploadUI = (scopeType === 'application' || (scopeType === 'country' && selectedCountry)) && attachmentType;

  const filteredRows = rows
    .filter((row) => {
      if (scopeType === 'country' && row.scope === 'Country') {
        return true;
      }
      if (scopeType === 'application' && row.scope === 'application') {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      const dateA = new Date(a.uploadDate.split('/').reverse().join('-'));
      const dateB = new Date(b.uploadDate.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });

  const handleDelete = (rowId: number) => {
    setRows((prevRows) => prevRows.filter(row => row.id !== rowId));
  };

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'Document Name', flex: 2, renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Stack sx={{ width: '100%', alignItems: 'center', mr: 1 }} direction="row" spacing={1}>
            <Tooltip title="Delete file" >
              <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">{params.value}</Typography>
          </Stack>
        </Box>
      ),
    },
    { field: 'type', headerName: 'Attachment Type', flex: 1 },
    { field: 'uploadDate', headerName: 'Upload Date', flex: 1 },
    { field: 'documentDate', headerName: 'Document Date', flex: 1 },
  ];

  const adjustedColumns = React.useMemo(() => {
    const base = [...columns];
    if (scopeType === 'country') {
      base.push({ field: 'country', headerName: 'Country', flex: 1 });
    }
    return base;
  }, [scopeType]);

  return (
    <Stack sx={{ width: '100%', minWidth: '550px' }} spacing={2}>
      <Grid container direction="row" spacing={2}>
        <Grid size={scopeType === 'application' ? 6 : 4}>
          <Box sx={{ flex: 1 }}>
            <InputLabel>Scope Type</InputLabel>
            <Select
              value={scopeType}
              onChange={(e) => {
                setScopeType(e.target.value as 'application' | 'country');
                setSelectedCountry('');
                setAttachmentType('');
              }}
              fullWidth
              displayEmpty
              renderValue={(value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Select Scope')}
            >
              <MenuItem value="application">Application</MenuItem>
              <MenuItem value="country">Country</MenuItem>
            </Select>
          </Box>
        </Grid>

        <Grid size={scopeType === 'application' ? 6 : 4}>
          {scopeType && (
            <Box sx={{ flex: 1 }}>
              <InputLabel>Attachment Type</InputLabel>
              <Select
                value={attachmentType}
                onChange={(e) => setAttachmentType(e.target.value)}
                fullWidth
                displayEmpty
                renderValue={(value) => (value ? value : 'Select Attachment Type')}
              >
                {(scopeType === 'application' ? applicationAttachmentTypes : countryAttachmentTypes).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
        </Grid>

        <Grid size={scopeType === 'application' ? 6 : 4}>
          {scopeType === 'country' && (
            <Box sx={{ flex: 1 }}>
              <InputLabel>Select Country</InputLabel>
              <Select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                fullWidth
                displayEmpty
                renderValue={(value) => (value ? value : 'Select Country')}
              >
                <MenuItem value="Germany">Germany</MenuItem>
                <MenuItem value="Switzerland">Switzerland</MenuItem>
                <MenuItem value="Mexico">Mexico</MenuItem>
                <MenuItem value="France">France</MenuItem>
                <MenuItem value="Italy">Italy</MenuItem>
                <MenuItem value="Spain">Spain</MenuItem>
                <MenuItem value="Brazil">Brazil</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>
            </Box>
          )}
        </Grid>
      </Grid>

      {showUploadUI && (
        <Box>
          <InputLabel>Add File</InputLabel>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              transition: 'background-color 0.3s, border-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="body1">
              {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to browse'}
            </Typography>
          </Box>
        </Box>
      )}

      {showUploadUI && rows.length > 0 && (
        <Box>
          <DataGrid rows={filteredRows} columns={adjustedColumns} disableRowSelectionOnClick disableColumnMenu />
        </Box>
      )}
    </Stack>
  );
}
