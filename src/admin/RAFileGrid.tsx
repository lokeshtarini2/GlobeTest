import { Delete } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
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

interface RAFileGridProps {
  scopeType: 'application' | 'country' | '';
  selectedCountry: string;
  setScopeType: React.Dispatch<React.SetStateAction<'application' | 'country' | ''>>;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  attachmentType: string;
  setAttachmentType: React.Dispatch<React.SetStateAction<string>>;
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}

const orgs: { name: string; lobs: string[] }[] = [
  { name: "Abeille Assurances IARD & Santé", lobs: ["Health", "Auto", "Home"] },
  { name: "Allianz Global Corporate & Specialty SE", lobs: ["Property", "Liability", "Marine"] },
  { name: "Allianz Risk Transfer AG", lobs: ["Reinsurance", "Alternative Risk"] },
  { name: "Allianz SE Reinsurance Branch Asia Pacific", lobs: ["Reinsurance", "Property"] },
  { name: "Allied World Assurance Company", lobs: ["Liability", "Professional Lines"] },
  { name: "Amlin Insurance SE", lobs: ["Marine", "Property", "Casualty"] },
  { name: "Arch Insurance (UK) Limited", lobs: ["Accident", "Specialty"] },
  { name: "Ascot Underwriting Limited", lobs: ["Marine", "Energy", "Property"] },
  { name: "Aspen Insurance UK Limited", lobs: ["Property", "Casualty", "Marine"] },
  { name: "Assicurazioni Generali S.p.A.", lobs: ["Auto", "Life", "Health"] },
  { name: "Assicurazioni Generali S.p.A. (UK Branch)", lobs: ["Pensions", "Commercial Lines"] },
  { name: "Aviva Insurance Limited", lobs: ["Auto", "Home", "Life"] },
  { name: "AXA Belgium", lobs: ["P&C", "Health"] },
  { name: "AXA France IARD", lobs: ["Home", "Auto", "Liability"] },
  { name: "AXA XL Insurance Company UK Limited", lobs: ["Global Programs", "Construction"] },
  { name: "AXA XL Reinsurance", lobs: ["Property Cat", "Casualty"] },
  { name: "AXIS Specialty Europe SE", lobs: ["Specialty", "Professional Lines"] },
  { name: "Chubb European Group SE", lobs: ["Accident", "Travel", "Cyber"] },
  { name: "Everest Insurance (Ireland), DAC", lobs: ["Property", "Casualty"] },
  { name: "Everest Reinsurance (Bermuda), Ltd.", lobs: ["Reinsurance"] },
  { name: "Everest Reinsurance Company", lobs: ["Treaty", "Facultative"] },
  { name: "Generali España S.A.", lobs: ["Health", "Auto"] },
  { name: "Great Lakes Insurance SE", lobs: ["Specialty", "Reinsurance"] },
  { name: "Hannover Rück SE", lobs: ["Life Re", "P&C Re"] },
  { name: "HDI Global SE", lobs: ["Industrial", "Engineering"] },
  { name: "HDI Global Specialty SE", lobs: ["Aviation", "Liability"] },
  { name: "Helvetia Schweizerische Versicherungsgesellschaft AG", lobs: ["Auto", "Life", "Home"] },
  { name: "Liberty Mutual Insurance Europe SE", lobs: ["Commercial", "Marine", "Liability"] },
  { name: "Lloyd’s Insurance Company S.A.", lobs: ["Specialty", "Underwriting"] },
  { name: "Mapfre Re, Compania de Reaseguros, S.A.", lobs: ["Reinsurance"] },
  { name: "Markel International Insurance Company Limited", lobs: ["Casualty", "Property"] },
  { name: "Millennium Insurance Company Ltd", lobs: ["Marine", "Energy"] },
  { name: "MS Amlin Insurance SE", lobs: ["Property", "Casualty", "Reinsurance"] },
  { name: "Munich Re", lobs: ["Life Re", "Non-Life Re", "Cat Bonds"] },
  { name: "PartnerRe Ireland Insurance dac", lobs: ["Property", "Casualty"] },
  { name: "QBE Europe SA/NV", lobs: ["Liability", "Marine", "Property"] },
  { name: "Scor Global P&C SE", lobs: ["Reinsurance", "Facultative"] },
  { name: "SCOR SE", lobs: ["P&C", "Life"] },
  { name: "Swiss Re Europe S.A.", lobs: ["P&C Re", "Life Re", "Specialty"] },
  { name: "Tokio Marine HCC International Insurance Company Plc", lobs: ["Specialty", "Aviation", "Cyber"] },
  { name: "Tokio Marine Kiln Syndicates Limited", lobs: ["Reinsurance", "Property", "Marine"] },
  { name: "Transatlantic Reinsurance Company", lobs: ["Treaty", "Facultative"] },
  { name: "Travelers Insurance Company Limited", lobs: ["Auto", "Property", "General Liability"] },
  { name: "XL Insurance Company SE", lobs: ["Construction", "Marine", "Casualty"] },
  { name: "Zurich Insurance Company Ltd", lobs: ["P&C", "Life", "Commercial"] },
];

export default function RAFileGrid({
  scopeType,
  selectedCountry,
  setScopeType,
  setSelectedCountry,
  attachmentType,
  setAttachmentType,
  rows,
  setRows,
}: RAFileGridProps) {
  const [selectedOrg, setSelectedOrg] = React.useState('');
  const [selectedLOBs, setSelectedLOBs] = React.useState<string[]>([]);

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

  const filteredRows = rows
    .filter((row) => {
      if (scopeType === 'country' && row.scope === 'Country') return true;
      if (scopeType === 'application' && row.scope === 'application') return true;
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

  const handleLOBChange = (lob: string) => {
    setSelectedLOBs((prev) =>
      prev.includes(lob) ? prev.filter(item => item !== lob) : [...prev, lob]
    );
  };

  const selectedOrgObj = orgs.find(o => o.name === selectedOrg);

  return (
    <Stack sx={{ width: '100%', minWidth: '550px' }} spacing={2}>
      <Box>
        <InputLabel>Select Organization</InputLabel>
        <Select
          value={selectedOrg}
          onChange={(e) => {
            setSelectedOrg(e.target.value);
            setSelectedLOBs([]); // reset on org change
          }}
          fullWidth
          displayEmpty
          renderValue={(value) => (value ? value : 'Select Organization')}
        >
          {orgs.map((org) => (
            <MenuItem key={org.name} value={org.name}>
              {org.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid direction="row" spacing={2} container>

        <Grid size={6}>
          <InputLabel>Respective LOBs</InputLabel>
          <FormGroup>

            {selectedOrg && selectedOrgObj?.lobs.map((lob) => (
              <FormControlLabel
                key={lob}
                control={
                  <Checkbox
                    checked={selectedLOBs.includes(lob)}
                    onChange={() => handleLOBChange(lob)}
                  />
                }
                label={lob}
              />
            ))}

          </FormGroup>
        </Grid>


        <Grid size={6}>
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
        </Grid>
      </Grid>

      {rows.length > 0 && (
        <Box>
          <DataGrid rows={filteredRows} columns={adjustedColumns} autoHeight disableRowSelectionOnClick disableColumnMenu />
        </Box>
      )}
    </Stack>
  );
}