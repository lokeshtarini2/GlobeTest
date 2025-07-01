import { Edit as EditIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip
} from '@mui/material';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';

interface User {
  userType?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: { code: string; number: string; ext: string };
  fax?: { code: string; number: string; ext: string };
  mobile?: { code: string; number: string; ext: string };
  role?: string;
  status?: string;
  comments?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  photoUrl?: string;
  partnerMarket?: string;
}

interface UserDialogProps {
  open: boolean;
  handleClose: () => void;
  user?: User;
  mode: 'add' | 'edit';
}

const countries = ['United States', 'Canada', 'United Kingdom', 'India', 'Germany', 'France', 'Australia'];
const partnerMarkets = ['PM1', 'PM2', 'PM3', 'PM4', 'PM5'];

export default function UserDialog({ open, handleClose, user, mode }: UserDialogProps) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = React.useState<User>({
    userType: 'Globex User',
    firstName: '',
    lastName: '',
    email: '',
    phone: { code: '', number: '', ext: '' },
    fax: { code: '', number: '', ext: '' },
    mobile: { code: '', number: '', ext: '' },
    role: 'user',
    status: 'active',
    comments: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    photoUrl: '',
    partnerMarket: ''
  });

  const [photoUrl, setPhotoUrl] = React.useState<string>('');

  React.useEffect(() => {
    if (open) {
      setFormData(user || {
        userType: 'Globex User',
        firstName: '',
        lastName: '',
        email: '',
        phone: { code: '', number: '', ext: '' },
        fax: { code: '', number: '', ext: '' },
        mobile: { code: '', number: '', ext: '' },
        role: 'user',
        status: 'active',
        comments: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        photoUrl: '',
        partnerMarket: ''
      });
      setPhotoUrl(user?.photoUrl || '');
    }
  }, [open, user]);

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section: 'phone' | 'fax' | 'mobile', key: 'code' | 'number' | 'ext', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotoUrl(previewUrl);
      handleChange('photoUrl', previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: onFormSubmit,
          sx: { backgroundImage: 'none', minWidth: '600px' },
        },
      }}
    >
      <DialogTitle>{isEdit ? 'Edit User' : 'Add a User'}</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Profile Photo Section */}
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            position: 'relative',
            '&:hover .edit-icon': { opacity: 1 },
            width: 'fit-content',
            mx: 'auto'
          }}
        >
          <input {...getInputProps()} />
          <Avatar
            src={photoUrl}
            sx={{ width: 96, height: 96, mx: 'auto', mb: 1 }}
          />
          <Tooltip title="Edit Photo">
            <IconButton
              className="edit-icon"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                opacity: 0,
                transition: 'opacity 0.3s'
              }}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Box>{isDragActive ? 'Drop image here...' : 'Drag & drop or click to change photo'}</Box>
        </Box>

        {/* User Info */}
        <Grid container spacing={2}>
          <Grid size={12} >
            <InputLabel>User Type</InputLabel>
            <Select
              fullWidth
              value={formData.userType || 'Globex User'}
              onChange={(e) => handleChange('userType', e.target.value)}
            >
              <MenuItem value="Globex User">Globex User</MenuItem>
              <MenuItem value="PM User">PM User</MenuItem>
            </Select>
          </Grid>

          {formData.userType === 'PM User' && (
            <Grid size={12} >
              <InputLabel>Partner Market</InputLabel>
              <Select
                fullWidth
                value={formData.partnerMarket || ''}
                onChange={(e) => handleChange('partnerMarket', e.target.value)}
              >
                {partnerMarkets.map((market) => (
                  <MenuItem key={market} value={market}>
                    {market}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}


          <Grid size={6} >
            <InputLabel>First Name</InputLabel>
            <OutlinedInput fullWidth value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
          </Grid>
          <Grid size={6} >
            <InputLabel>Last Name</InputLabel>
            <OutlinedInput fullWidth value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
          </Grid>


        </Grid>

        <Box>
          <InputLabel>Email ID</InputLabel>
          <OutlinedInput fullWidth value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </Box>

        {(['phone', 'fax', 'mobile'] as const).map((field) => (
          <Box key={field}>
            <InputLabel>{field[0].toUpperCase() + field.slice(1)}</InputLabel>
            <Grid container spacing={2}>
              <Grid size={4}>
                <OutlinedInput placeholder="Code" fullWidth value={formData[field]?.code} onChange={(e) => handleNestedChange(field, 'code', e.target.value)} />
              </Grid>
              <Grid size={4}>
                <OutlinedInput placeholder="Number" fullWidth value={formData[field]?.number} onChange={(e) => handleNestedChange(field, 'number', e.target.value)} />
              </Grid>
              <Grid size={4}>
                <OutlinedInput placeholder="Ext" fullWidth value={formData[field]?.ext} onChange={(e) => handleNestedChange(field, 'ext', e.target.value)} />
              </Grid>
            </Grid>
          </Box>
        ))}

        <Grid container spacing={2}>
          <Grid size={6} >
            <InputLabel>User Role</InputLabel>
            <Select fullWidth value={formData.role} onChange={(e) => handleChange('role', e.target.value)}>
              <MenuItem value="" disabled>Select Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </Grid>
          <Grid size={6} >
            <InputLabel>User Status</InputLabel>
            <Select fullWidth value={formData.status} onChange={(e) => handleChange('status', e.target.value)}>
              <MenuItem value="" disabled>Select Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Box>
          <InputLabel>Comments</InputLabel>
          <OutlinedInput fullWidth multiline rows={4} value={formData.comments} onChange={(e) => handleChange('comments', e.target.value)} />
        </Box>
        <Box>
          <InputLabel>Address</InputLabel>
          <OutlinedInput fullWidth value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
        </Box>

        <Grid container spacing={2}>
          <Grid size={6}>
            <InputLabel>City</InputLabel>
            <OutlinedInput fullWidth value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
          </Grid>
          <Grid size={6}>
            <InputLabel>State</InputLabel>
            <OutlinedInput fullWidth value={formData.state} onChange={(e) => handleChange('state', e.target.value)} />
          </Grid>
          <Grid size={6}>
            <InputLabel>Country</InputLabel>
            <Select fullWidth displayEmpty value={formData.country} onChange={(e) => handleChange('country', e.target.value)}>
              <MenuItem value="" disabled>Select Country</MenuItem>
              {countries.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={6}>
            <InputLabel>Zip Code</InputLabel>
            <OutlinedInput fullWidth value={formData.zip} onChange={(e) => handleChange('zip', e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ py: 3, px: 3, justifyContent: isEdit ? 'space-between' : 'flex-end' }}>
        {isEdit && <Button variant="contained" color="error" onClick={() => { /* Handle delete */ }}>Delete</Button>}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {isEdit ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
