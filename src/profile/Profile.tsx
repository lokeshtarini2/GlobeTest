import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Edit, UploadFile } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CssBaseline,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};

const EditableField = ({
  label,
  value,
  onSave,
  fullWidth = false,
  multiline = false,
}: {
  label: string;
  value: string;
  onSave: (value: string) => void;
  fullWidth?: boolean;
  multiline?: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <InputLabel>{label}</InputLabel>
      {!editing ? (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography sx={{ flexGrow: 1, fontWeight: 'bold', overflowWrap: 'anywhere' }}>
            {value || <em>None</em>}
          </Typography>
          <IconButton size="small" onClick={() => setEditing(true)}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <TextField
            size="small"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            fullWidth
            multiline={multiline}
            maxRows={multiline ? 6 : undefined}
          />
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              setEditing(false);
              onSave(tempValue);
            }}
          >
            Save
          </Button>
          <Button variant="contained" size="small" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </Stack>
      )}
    </Box>
  );
};

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Card variant="outlined" sx={{ p: 2 }}>
    <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
      {icon}
      <Typography variant="h6">
        {title}
      </Typography>
    </Box>
    <Grid container spacing={2}>
      {children}
    </Grid>
  </Card>
);

export default function Profile(props: any) {
  const [fields, setFields] = useState({
    firstName: 'John',
    lastName: 'Doe',
    organization: 'Globex',
    email: 'super.admin@globex.com',
    phone: '(123) 456-7890',
    ext: '1',
    fax: '(123) 456-7891',
    mobile: '+1 234-567-8901',
    role: 'Administrator',
    status: 'Active',
    address: '1184, Post Road',
    city: 'Fairfield',
    state: 'CT',
    country: 'United States of America',
    zip: '06824',
    comments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  });

  const [profilePhoto, setProfilePhoto] = useState('https://via.placeholder.com/120');

  const handleFieldSave = (field: any, value: any) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={2} alignItems="center">
            <Header />
            <DragDropContext onDragEnd={() => { }}>
              <Droppable droppableId="avatar-droppable" direction="horizontal">
                {(provided) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef} textAlign="center">
                    <Draggable draggableId="profile-photo" index={0}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Stack spacing={2} alignItems="center">
                            <Avatar src={profilePhoto} alt="John Doe" sx={{ width: 120, height: 120 }} />
                            <Button variant="outlined" startIcon={<UploadFile />} component="label">
                              Change Photo
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      if (typeof reader.result === 'string') {
                                        setProfilePhoto(reader.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </Button>
                          </Stack>
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>

            <Grid container spacing={3}>
              <Grid size={6}>
                <SectionCard title="Personal Information" icon={<PersonIcon />}>
                  <Grid size={6}><EditableField label="First Name" value={fields.firstName} onSave={(val: any) => handleFieldSave('firstName', val)} /></Grid>
                  <Grid size={6}><EditableField label="Last Name" value={fields.lastName} onSave={(val: any) => handleFieldSave('lastName', val)} /></Grid>
                  <Grid size={12}><EditableField label="Organization" value={fields.organization} onSave={(val: any) => handleFieldSave('organization', val)} /></Grid>
                  <Grid size={6}><EditableField label="User Role" value={fields.role} onSave={(val: any) => handleFieldSave('role', val)} /></Grid>
                  <Grid size={6}><EditableField label="Status" value={fields.status} onSave={(val: any) => handleFieldSave('status', val)} /></Grid>
                </SectionCard>
              </Grid>

              <Grid size={6}>
                <SectionCard title="Contact Information" icon={<ContactPhoneIcon />}>
                  <Grid size={12}><EditableField label="Email Address" value={fields.email} onSave={(val: any) => handleFieldSave('email', val)} /></Grid>
                  <Grid size={6}><EditableField label="Phone" value={fields.phone} onSave={(val: any) => handleFieldSave('phone', val)} /></Grid>
                  <Grid size={6}><EditableField label="Mobile" value={fields.mobile} onSave={(val: any) => handleFieldSave('mobile', val)} /></Grid>
                  <Grid size={2}><EditableField label="Ext" value={fields.ext} onSave={(val: any) => handleFieldSave('ext', val)} /></Grid>
                  <Grid size={10}><EditableField label="Fax" value={fields.fax} onSave={(val: any) => handleFieldSave('fax', val)} /></Grid>
                </SectionCard>
              </Grid>

              <Grid size={12}>
                <SectionCard title="Address" icon={<HomeIcon />}>
                  <Grid size={12}><EditableField label="Address" value={fields.address} onSave={(val: any) => handleFieldSave('address', val)} /></Grid>
                  <Grid size={6}><EditableField label="City" value={fields.city} onSave={(val: any) => handleFieldSave('city', val)} /></Grid>
                  <Grid size={6}><EditableField label="State" value={fields.state} onSave={(val: any) => handleFieldSave('state', val)} /></Grid>
                  <Grid size={6}><EditableField label="Country" value={fields.country} onSave={(val: any) => handleFieldSave('country', val)} /></Grid>
                  <Grid size={6}><EditableField label="Zip Code" value={fields.zip} onSave={(val: any) => handleFieldSave('zip', val)} /></Grid>
                </SectionCard>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}