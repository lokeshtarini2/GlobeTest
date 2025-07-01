import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router';

interface NewApplicationProps {
  open: boolean;
  handleClose: () => void;
}

const sampleCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'India',
  'Singapore',
  'Japan',
  'Brazil'
];

const coverages = [
  'Marine Cargo',
  'Property',
  'Cyber Liability',
  'Freight Liability',
  'General Liability',
  'Management Liability',
  'Pollution/Environmental Liability',
  'Professional Indemnity / Errors and Omissions',
  'Accident & Health'
];

const steps = ['Application Info', 'Master Policy Terms', 'Add Countries'];

export default function NewApplication({ open, handleClose }: NewApplicationProps) {
  const [countries, setCountries] = React.useState<string[]>([]);
  const [coverage, setCoverage] = React.useState('');
  const [isGeneralInquiry, setIsGeneralInquiry] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [insured, setInsured] = React.useState('');
  const [pm, setPm] = React.useState('');
  const [office, setOffice] = React.useState('');
  const [comments, setComments] = React.useState('');

  const handleCountriesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setCountries(typeof value === 'string' ? value.split(',') : value);
  };

  const handleCoverageChange = (event: SelectChangeEvent) => {
    setCoverage(event.target.value);
  };

  const handleGeneralInquiryToggle = () => {
    setIsGeneralInquiry((prev) => !prev);
  };

  // Validation logic
  const isGeneralInquiryValid = isGeneralInquiry
    ? user.trim() && pm.trim() && office.trim() && countries.length > 0 && coverage.trim()
    : countries.length > 0 && coverage.trim();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { backgroundImage: 'none', minWidth: '500px' }
        }
      }}
    >
      <DialogTitle>Create a New Application</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container direction="row" spacing={2} sx={{ width: '100%' }}>
          <Grid size={6}>
            <Box sx={{ flex: 1 }}>
              <InputLabel>Countries <span style={{ color: 'red' }}>*</span></InputLabel>
              <Select
                fullWidth
                multiple
                value={countries}
                onChange={handleCountriesChange}
                displayEmpty
                renderValue={(selected) => (
                  <Box sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    display: 'block',
                  }}>
                    {(selected as string[]).length === 0 ? 'Select Countries' : (selected as string[]).join(', ')}
                  </Box>
                )}
                sx={{
                  '& .MuiSelect-select': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    display: 'block',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Countries
                </MenuItem>
                {sampleCountries.map((cty) => (
                  <MenuItem key={cty} value={cty}>
                    {cty}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ flex: 1 }}>
              <InputLabel>Line of Business <span style={{ color: 'red' }}>*</span></InputLabel>
              <Select
                fullWidth
                value={coverage}
                onChange={handleCoverageChange}
                displayEmpty
                renderValue={(selected) => (
                  <Box sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    display: 'block',
                  }}>
                    {selected ? selected : 'Select Line of Business'}
                  </Box>
                )}
                sx={{
                  '& .MuiSelect-select': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    display: 'block',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Line of Business
                </MenuItem>
                {coverages.map((cvg) => (
                  <MenuItem key={cvg} value={cvg}>
                    {cvg}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          onClick={handleGeneralInquiryToggle}
          role="button"
          tabIndex={0}
          onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleGeneralInquiryToggle(); }}
        >
          <IconButton
            size="small"
            sx={{ pointerEvents: 'none' }}
            disableRipple
          >
            {isGeneralInquiry ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Box component="span" sx={{ ml: 1, fontWeight: 500 }}>
            Inquiry Stage
          </Box>
        </Box>
        <Collapse in={isGeneralInquiry} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, margin: 0, padding: 0 }}>
            <Box sx={{ margin: 0, padding: 0 }}>
              <InputLabel>User <span style={{ color: 'red' }}>*</span></InputLabel>
              <TextField
                required
                value={user}
                onChange={e => setUser(e.target.value)}
                fullWidth
              />
            </Box>

            <Box>
              <InputLabel>PM <span style={{ color: 'red' }}>*</span></InputLabel>
              <TextField
                required
                value={pm}
                onChange={e => setPm(e.target.value)}
                fullWidth
              />
            </Box>
            <Box>
              <InputLabel>Office <span style={{ color: 'red' }}>*</span></InputLabel>
              <TextField
                required
                value={office}
                onChange={e => setOffice(e.target.value)}
                fullWidth
              />
            </Box>
            <Box>
              <InputLabel>Insured</InputLabel>
              <TextField
                value={insured}
                onChange={e => setInsured(e.target.value)}
                fullWidth
              />
            </Box>
            <Box>
              <InputLabel>Comments</InputLabel>
              <TextField
                value={comments}
                onChange={e => setComments(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
        </Collapse>
      </DialogContent>
      <DialogActions sx={{ p: 1 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        {isGeneralInquiryValid && (
          <Link to="/applications/new">
            <Button variant="contained">Create</Button>
          </Link>
        )}
      </DialogActions>
    </Dialog>
  );
}
