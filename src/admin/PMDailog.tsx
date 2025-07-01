import * as React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

interface PMDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialValues?: any;
}

const steps = [
  'Organization Details',
  'Primary Contact Person',
  'Banking Information',
  'Service Details',
];

export default function PMDialog({
  open,
  onClose,
  mode,
  initialValues,
}: PMDialogProps) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [formValues, setFormValues] = React.useState<any>({
    organizationName: '',
    aliases: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    website: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhoneCode: '',
    contactPhone: '',
    contactFaxCode: '',
    contactFax: '',
    contactComments: '',
    bankFirstName: '',
    bankLastName: '',
    bankEmail: '',
    bankPhoneCode: '',
    bankPhone: '',
    bankFaxCode: '',
    bankFax: '',
    bankTitle: '',
    bankAccountNumber: '',
    bankAccountNumberConfirm: '',
    bankName: '',
    swiftCode: '',
    accountHolder: '',
    iban: '',
    bankAddress: '',
    aba: '',
    bankOther1: '',
    bankOther2: '',
    bankOther3: '',
    intermediaryBankName: '',
    intermediaryAccount: '',
    intermediarySwift: '',
    intermediaryOther1: '',
    intermediaryOther2: '',
    intermediaryOther3: '',
    serviceDetails: '',
  });

  React.useEffect(() => {
    if (mode === 'edit' && initialValues) {
      setFormValues((prev: any) => ({ ...prev, ...initialValues }));
    }
    if (!open) {
      setActiveStep(0); // reset on close
    }
  }, [mode, initialValues, open]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev: any) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log(`${mode === 'edit' ? 'Updating' : 'Creating'} PM:`, formValues);
      onClose();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid size={3}>
              <InputLabel>Organization Name</InputLabel>
              <TextField fullWidth value={formValues.organizationName} onChange={handleChange('organizationName')} />
            </Grid>
            <Grid size={3}>
              <InputLabel>Alias</InputLabel>
              <TextField fullWidth value={formValues.alias} onChange={handleChange('alias')} />
            </Grid>
            <Grid size={3}>
              <InputLabel>Address Line 1</InputLabel>
              <TextField fullWidth value={formValues.address1} onChange={handleChange('address1')} />
            </Grid>
            <Grid size={3}>
              <InputLabel>Address Line 2</InputLabel>
              <TextField fullWidth value={formValues.address2} onChange={handleChange('address2')} />
            </Grid>
            <Grid size={3}>
              <InputLabel>City</InputLabel>
              <TextField fullWidth value={formValues.city} onChange={handleChange('city')} />
            </Grid>
            <Grid size={1.5}>
              <InputLabel>State</InputLabel>
              <TextField fullWidth value={formValues.state} onChange={handleChange('state')} />
            </Grid>
            <Grid size={1.5}>
              <InputLabel>ZIP Code</InputLabel>
              <TextField fullWidth value={formValues.zip} onChange={handleChange('zip')} />
            </Grid>
            <Grid size={3}>
              <InputLabel>Country</InputLabel>
              <TextField fullWidth value={formValues.country} onChange={handleChange('country')} />
            </Grid>
            <Grid size={3}>
              <InputLabel>Website</InputLabel>
              <TextField fullWidth value={formValues.website} onChange={handleChange('website')} />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid size={6}>
              <InputLabel>First Name</InputLabel>
              <TextField fullWidth value={formValues.contactFirstName} onChange={handleChange('contactFirstName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Last Name</InputLabel>
              <TextField fullWidth value={formValues.contactLastName} onChange={handleChange('contactLastName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Email</InputLabel>
              <TextField fullWidth value={formValues.contactEmail} onChange={handleChange('contactEmail')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Comments</InputLabel>
              <TextField multiline rows={3} fullWidth value={formValues.contactComments} onChange={handleChange('contactComments')} />
            </Grid>
            <Grid size={2}>
              <InputLabel>Phone Code</InputLabel>
              <TextField fullWidth value={formValues.contactPhoneCode} onChange={handleChange('contactPhoneCode')} />
            </Grid>
            <Grid size={4}>
              <InputLabel>Phone Number</InputLabel>
              <TextField fullWidth value={formValues.contactPhone} onChange={handleChange('contactPhone')} />
            </Grid>
            <Grid size={2}>
              <InputLabel>Fax Code</InputLabel>
              <TextField fullWidth value={formValues.contactFaxCode} onChange={handleChange('contactFaxCode')} />
            </Grid>
            <Grid size={4}>
              <InputLabel>Fax Number</InputLabel>
              <TextField fullWidth value={formValues.contactFax} onChange={handleChange('contactFax')} />
            </Grid>

          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={1}>
            <Grid size={6}>
              <InputLabel>First Name</InputLabel>
              <TextField fullWidth value={formValues.bankFirstName} onChange={handleChange('bankFirstName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Last Name</InputLabel>
              <TextField fullWidth value={formValues.bankLastName} onChange={handleChange('bankLastName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Email</InputLabel>
              <TextField fullWidth value={formValues.bankEmail} onChange={handleChange('bankEmail')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Title</InputLabel>
              <TextField fullWidth value={formValues.bankTitle} onChange={handleChange('bankTitle')} />
            </Grid>
            <Grid size={2}>
              <InputLabel>Phone Code</InputLabel>
              <TextField fullWidth value={formValues.bankPhoneCode} onChange={handleChange('bankPhoneCode')} />
            </Grid>
            <Grid size={4}>
              <InputLabel>Phone Number</InputLabel>
              <TextField fullWidth value={formValues.bankPhone} onChange={handleChange('bankPhone')} />
            </Grid>
            <Grid size={2}>
              <InputLabel>Fax Code</InputLabel>
              <TextField fullWidth value={formValues.bankFaxCode} onChange={handleChange('bankFaxCode')} />
            </Grid>
            <Grid size={4}>
              <InputLabel>Fax Number</InputLabel>
              <TextField fullWidth value={formValues.bankFax} onChange={handleChange('bankFax')} />
            </Grid>


            <Grid size={12}><Box mt={2}><strong>Banking Information</strong></Box></Grid>

            <Grid size={6}>
              <InputLabel>Bank Account Number</InputLabel>
              <TextField fullWidth value={formValues.bankAccountNumber} onChange={handleChange('bankAccountNumber')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Confirm Bank Account Number</InputLabel>
              <TextField fullWidth value={formValues.bankAccountNumberConfirm} onChange={handleChange('bankAccountNumberConfirm')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Bank Name</InputLabel>
              <TextField fullWidth value={formValues.bankName} onChange={handleChange('bankName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>SWIFT Code</InputLabel>
              <TextField fullWidth value={formValues.swiftCode} onChange={handleChange('swiftCode')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Name of Account Holder</InputLabel>
              <TextField fullWidth value={formValues.accountHolder} onChange={handleChange('accountHolder')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>IBAN Number</InputLabel>
              <TextField fullWidth value={formValues.iban} onChange={handleChange('iban')} />
            </Grid>
            <Grid size={12}>
              <InputLabel>Bank Address</InputLabel>
              <TextField fullWidth value={formValues.bankAddress} onChange={handleChange('bankAddress')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>ABA Number</InputLabel>
              <TextField fullWidth value={formValues.aba} onChange={handleChange('aba')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Other 1</InputLabel>
              <TextField fullWidth value={formValues.bankOther1} onChange={handleChange('bankOther1')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Other 2</InputLabel>
              <TextField fullWidth value={formValues.bankOther2} onChange={handleChange('bankOther2')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Other 3</InputLabel>
              <TextField fullWidth value={formValues.bankOther3} onChange={handleChange('bankOther3')} />
            </Grid>

            <Grid size={12}><Box mt={2}><strong>Intermediary Information</strong></Box></Grid>

            <Grid size={6}>
              <InputLabel>Intermediary Bank Name</InputLabel>
              <TextField fullWidth value={formValues.intermediaryBankName} onChange={handleChange('intermediaryBankName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Intermediary Account</InputLabel>
              <TextField fullWidth value={formValues.intermediaryAccount} onChange={handleChange('intermediaryAccount')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Intermediary SWIFT</InputLabel>
              <TextField fullWidth value={formValues.intermediarySwift} onChange={handleChange('intermediarySwift')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Other 1</InputLabel>
              <TextField fullWidth value={formValues.intermediaryOther1} onChange={handleChange('intermediaryOther1')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Other 2</InputLabel>
              <TextField fullWidth value={formValues.intermediaryOther2} onChange={handleChange('intermediaryOther2')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Other 3</InputLabel>
              <TextField fullWidth value={formValues.intermediaryOther3} onChange={handleChange('intermediaryOther3')} />
            </Grid>
          </Grid>
        );

      case 3:
        return (

          <Grid container spacing={2}>
            <Grid size={12}>
              <InputLabel>Line of Business</InputLabel>
              <Select
                fullWidth
                value={formValues.lineOfBusiness || ""}
                displayEmpty
                onChange={(e) => setFormValues((prev: any) => ({ ...prev, lineOfBusiness: e.target.value }))}
              >
                <MenuItem value="" disabled>
                  Select line of business
                </MenuItem>
                <MenuItem value="Marine Cargo">Marine Cargo</MenuItem>
                <MenuItem value="Property">Property</MenuItem>
                <MenuItem value="Cyber Liability">Cyber Liability</MenuItem>
                <MenuItem value="Freight Liability">Freight Liability</MenuItem>
                <MenuItem value="General Liability">General Liability</MenuItem>
                <MenuItem value="Management Liability">Management Liability</MenuItem>
                <MenuItem value="Pollution/Environmental Liability">Pollution/Environmental Liability</MenuItem>
                <MenuItem value="Professional Indemnity / Errors and Omissions">
                  Professional Indemnity / Errors and Omissions
                </MenuItem>
                <MenuItem value="Accident & Health">Accident & Health</MenuItem>
              </Select>
            </Grid>

            <Grid size={12}><Box mt={2}><strong>Branch Office</strong></Box></Grid>

            <Grid size={6}>
              <InputLabel>Name</InputLabel>
              <TextField fullWidth value={formValues.branchName} onChange={handleChange('branchName')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Date of Registration</InputLabel>
              <TextField fullWidth type="date" value={formValues.branchDate} onChange={handleChange('branchDate')} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid size={12}>
              <InputLabel>Address</InputLabel>
              <TextField fullWidth value={formValues.branchAddress} onChange={handleChange('branchAddress')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>City</InputLabel>
              <TextField fullWidth value={formValues.branchCity} onChange={handleChange('branchCity')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>State</InputLabel>
              <TextField fullWidth value={formValues.branchState} onChange={handleChange('branchState')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Country</InputLabel>
              <TextField fullWidth value={formValues.branchCountry} onChange={handleChange('branchCountry')} />
            </Grid>
            <Grid size={6}>
              <InputLabel>Zip Code</InputLabel>
              <TextField fullWidth value={formValues.branchZip} onChange={handleChange('branchZip')} />
            </Grid>
            <DataGrid
              rows={[
                { id: 1, name: 'Sample Paper 1', availablePapers: 'Yes', city: 'City A', state: 'State A', country: 'Country A' },
                { id: 2, name: 'Sample Paper 2', availablePapers: 'No', city: 'City B', state: 'State B', country: 'Country B' },
              ]}
              columns={[
                { field: 'name', headerName: 'Name', width: 150 },
                { field: 'availablePapers', headerName: 'Available Papers', width: 150 },
                { field: 'city', headerName: 'City', width: 150 },
                { field: 'state', headerName: 'State', width: 150 },
                { field: 'country', headerName: 'Country', width: 150 },
                { field: 'update', headerName: 'Update', width: 100, renderCell: () => <Button variant="text">Update</Button> },
                { field: 'delete', headerName: 'Delete', width: 100, renderCell: () => <Button variant="text">Delete</Button> },
              ]}
            />
          </Grid>

        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { p: 2, backgroundImage: 'none' },
        component: 'form',
        onSubmit: (e: React.FormEvent) => {
          e.preventDefault();
          handleNext();
        },
      }}
    >
      <DialogTitle sx={{ p: 1, pb: 2, width: '100%' }}>{mode === 'edit' ? 'Edit PM Details' : 'Add New PM'}</DialogTitle>
      <DialogContent sx={{ p: 1, pb: 2, width: '100%' }}>
        {mode === 'edit' ? (<Grid container spacing={2} sx={{ mx: 0, p: 0, width: '100%' }}>
          <Grid size={6}>
            <InputLabel>Organization Name</InputLabel>
            <TextField
              value={formValues.organization}
              fullWidth
              required
            />
          </Grid>
          <Grid size={6}>
            <InputLabel>Alias</InputLabel>
            <TextField
              value={formValues.aliases}
              fullWidth
              required
            />
          </Grid>
          <Grid size={6}>
            <InputLabel>City / Country</InputLabel>
            <TextField
              value={formValues.location}
              fullWidth
              required
            />
          </Grid>
          <Grid size={6}>
            <InputLabel>Contact Name</InputLabel>
            <TextField
              value={formValues.contact}
              fullWidth
              required
            />
          </Grid>
          <Grid size={6}>
            <InputLabel>Phone Number</InputLabel>
            <TextField
              value={formValues.phone}
              fullWidth
              required
            />
          </Grid>
        </Grid>) : (<>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.paper', pb: 0.5 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {renderStepContent(activeStep)}
        </>)}

      </DialogContent>
      <DialogActions sx={{ pt: 2 }}>
        {(activeStep > 0 || mode === 'edit') && (
          <Button onClick={mode === 'edit' ? onClose : handleBack}>
            {mode === 'edit' ? 'Cancel' : 'Back'}
          </Button>
        )}
        <Button type="submit" variant="contained">
          {activeStep === steps.length - 1 ? (mode === 'edit' ? 'Save Changes' : 'Add PM') : (mode === 'edit' ? 'Update' : 'Next')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
