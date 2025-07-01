import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Add, Close, DragIndicator, KeyboardArrowDown, KeyboardArrowUp, Mode } from '@mui/icons-material';
import {
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
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/system';
import { MuiColorInput } from 'mui-color-input';
import React from 'react';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './AccountsGrid';
import DraftApplications from './DraftApplications';
import NewApplication from './NewApplication';
import PlacementsGrid from './PlacementsGrid';

const statusOptions = [
  'New',
  'Questions',
  'Completed',
  'Bound',
  'Closed',
  'Preparing Estimate',
  'Estimate Ready',
  'Local Review',
  'Terms Confirmed',
  'Policies Obtained',
  'Cancelled',
  'In Progress',
  'Pre-Renewal',
  'General Inquiry',
];
const coverageOptions = [
  'Marine Cargo',
  'Property',
  'Cyber Liability',
  'Freight Liability',
  'General Liability',
  'Management Liability',
  'Pollution/Environmental Liability',
  'Professional Indemnity / Errors and Omissions',
  'Accident & Health',
];
const peopleOptions = ['Alice', 'Bob', 'Charlie', 'David']; // Replace with actual names


interface SavedSearch {
  name: string;
  color: string;
  accountNumber: string;
  insuredName: string;
  coverage: string;
  status: string;
}

export default function MainGrid() {
  const [newOpen, setNewOpen] = React.useState(false);
  const [draftsOpen, setDraftsOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [saveCoverage, setSaveCoverage] = React.useState(coverageOptions[0]);
  const [saveStatus, setSaveStatus] = React.useState(statusOptions[0]);
  const [savedSearches, setSavedSearches] = React.useState<SavedSearch[]>([
    {
      name: 'EQ Resources - Marine',
      color: '#1976d2',
      accountNumber: '1023',
      insuredName: 'EQ Resources Limited',
      coverage: 'Marine Cargo',
      status: 'New',
    },
    {
      name: 'Knowledge Pro - Property',
      color: '#ed6c02',
      accountNumber: '2045',
      insuredName: 'Knowledge Pro Holdings L.P.',
      coverage: 'Property',
      status: 'Bound',
    },
    {
      name: 'Closure Systems - Cyber',
      color: '#2e7d32',
      accountNumber: '3876',
      insuredName: 'Closure Systems',
      coverage: 'Cyber Liability',
      status: 'In Progress',
    },
  ]);
  const [deleteModal, setDeleteModal] = React.useState<string | null>(null);
  const [saveModalOpen, setSaveModalOpen] = React.useState(false);

  // Fields for the Save Search modal
  const [saveName, setSaveName] = React.useState('');

  const [saveColor, setSaveColor] = React.useState('#1976d2');

  const handleTabChange: (
    event: React.SyntheticEvent,
    newValue: number
  ) => void = (_event, newValue) => setSelectedTab(newValue);

  const handleSaveSearch = () => {
    const newEntry: SavedSearch = {
      name: saveName.trim() || 'Untitled',
      color: saveColor,
      accountNumber: '1234', // Default or derived value
      insuredName: 'Default Insured', // Default or derived value
      coverage: saveCoverage,
      status: saveStatus,
    };
    setSavedSearches((prev) => [...prev, newEntry]);
    setSaveModalOpen(false);
    setSaveName('');
    setSaveColor('#1976d2');
  };

  const handleDeleteSearch = (name: string | null) => {
    if (!name) return;
    setSavedSearches((prev) => prev.filter((item) => item.name !== name));
    setDeleteModal(null);
  };

  // Drag and drop handler for saved searches
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(savedSearches);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSavedSearches(reordered);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container>
        <Stack direction="row" sx={{ width: '100%', gap: 1 }}>
          <Stack sx={{ flexGrow: 1, width: '100%', alignItems: 'center' }} flexGrow={1} spacing={1}>
            <Stack direction="row" spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Accounts" />
                <Tab label="Placements" />
              </Tabs>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="outlined"
                endIcon={<Mode />}
                onClick={() => setDraftsOpen(true)}
                sx={{ background: alpha('#ed6c02', 0.05), border: '1.5px dashed #ed6c02' }}
              >
                Drafts
              </Button>
              <DraftApplications open={draftsOpen} handleClose={() => setDraftsOpen(false)} />
              <Button
                variant="contained"
                color="secondary"
                endIcon={<Add />}
                onClick={() => setNewOpen(true)}
              >
                New Application
              </Button>
              <NewApplication open={newOpen} handleClose={() => setNewOpen(false)} />
            </Stack>

            {/* Search bar */}
            <Stack direction="row" spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
              <OutlinedInput
                placeholder="Search Partner Market, Coverage, etc."
                sx={{ flexGrow: 1 }}
              />
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                variant="text"
                endIcon={
                  showAdvanced
                    ? <KeyboardArrowUp sx={{ fontSize: 18 }} />
                    : <KeyboardArrowDown sx={{ fontSize: 18 }} />
                }
              >
                Advanced Search
              </Button>
            </Stack>

            {/* Saved Search Buttons */}
            {savedSearches.length > 0 && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="saved-searches" direction="horizontal">
                  {(provided) => (
                    <Box
                      sx={{ py: 0.5, width: '100%', display: 'flex', flexWrap: 'wrap', gap: 1 }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {savedSearches.map((search, index) => (
                        <Draggable key={search.name} draggableId={search.name} index={index}>
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                display: 'inline-flex',
                                position: 'relative',
                                alignItems: 'center',
                                px: 0,
                                opacity: snapshot.isDragging ? 0.7 : 1,
                              }}
                            >
                              <Tooltip
                                title={
                                  <Box>
                                    <div><strong>Account Number:</strong> {search.accountNumber}</div>
                                    <div><strong>Insured Name:</strong> {search.insuredName}</div>
                                    <div><strong>Coverage:</strong> {search.coverage}</div>
                                    <div><strong>Status:</strong> {search.status}</div>
                                  </Box>
                                }
                                arrow
                                placement="top"
                              >
                                <Button
                                  onClick={() => {
                                    // TODO: Load this saved search’s criteria
                                  }}
                                  sx={{
                                    textTransform: 'none',
                                    border: `1.5px solid ${search.color}`,
                                    background: (theme) => alpha(search.color, 0.12),
                                    borderRadius: 4,
                                    px: 2,
                                    py: 2,
                                    minWidth: 0,
                                    width: 'auto',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    pl: 4,
                                    pr: 6,
                                    transition: 'box-shadow 0.2s',
                                    '&:hover': {
                                      background: (theme) => alpha(search.color, 0.18),
                                    },
                                  }}
                                >
                                  {search.name}
                                </Button>
                              </Tooltip>

                              <IconButton
                                size="small"
                                sx={{
                                  color: (theme) => alpha(search.color, 0.7),
                                  cursor: 'grab',
                                  zIndex: 1,
                                  ml: 0.5,
                                  position: 'absolute',
                                  top: 2,
                                  left: -2,
                                  background: 'transparent !important',
                                  border: 0,
                                  '&:hover': {
                                    background: 'transparent !important',
                                  },
                                  '&.Mui-selected': {
                                    background: 'transparent !important',
                                  },
                                  '&.Mui-focusVisible': {
                                    background: 'transparent !important',
                                  },
                                  '&:active': {
                                    background: 'transparent !important',
                                  },
                                }}
                                {...provided.dragHandleProps}
                              >
                                <DragIndicator fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteModal(search.name);
                                }}
                                sx={{
                                  position: 'absolute',
                                  top: 2,
                                  right: 2,
                                  zIndex: 1,
                                  background: (theme) => alpha(search.color, 0.18),
                                  border: 0,
                                  '&:hover': {
                                    background: (theme) => alpha(search.color, 0.18),
                                    border: 0,
                                  },
                                  '&.Mui-selected': {
                                    background: (theme) => alpha(search.color, 0.18),
                                  },
                                  '&.Mui-focusVisible': {
                                    background: (theme) => alpha(search.color, 0.18),
                                  },
                                  '&:active': {
                                    background: (theme) => alpha(search.color, 0.18),
                                  },
                                }}
                              >
                                <Close fontSize="small" />
                              </IconButton>


                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            )}

            {/* Advanced Search Fields */}
            {showAdvanced && (
              <Box sx={{ pb: 1 }}>
                <Paper
                  elevation={0}
                  sx={{

                    p: 2,
                    bgcolor: (theme) => theme.palette.background.paper,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Grid container spacing={2}>
                    {[
                      'Account Number',
                      'Insured Name',
                      'Originating Office/Branch Name',
                      'UW Name',
                    ].map((label) => (
                      <Grid size={3} key={label}>
                        <InputLabel shrink>{label}</InputLabel>
                        <TextField fullWidth size="small" />
                      </Grid>
                    ))}

                    <Grid size={3}>
                      <InputLabel shrink>Coverage</InputLabel>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={saveCoverage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveCoverage(e.target.value)}
                      >
                        {coverageOptions.map((coverage) => (
                          <MenuItem key={coverage} value={coverage}>
                            {coverage}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid size={3}>
                      <InputLabel shrink>Status</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        value={saveStatus}
                        onChange={(e) => setSaveStatus(e.target.value)}
                      >
                        {statusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    {['Policy Period Start Date', 'Policy Period End Date'].map((label) => (
                      <Grid size={3} key={label}>
                        <InputLabel shrink>{label}</InputLabel>
                        <TextField type="date" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                      </Grid>
                    ))}

                    {['AE', 'AM', 'AB', 'GPA', 'GPS'].map((label) => (
                      <Grid size={3} key={label}>
                        <InputLabel shrink>{label}</InputLabel>
                        <TextField select fullWidth size="small">
                          {peopleOptions.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    ))}

                    <Grid size={12}>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained">Search</Button>
                        <Button variant="outlined">Clear</Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button variant="contained" color="secondary" onClick={() => setSaveModalOpen(true)}>
                          Save Search
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}

            {/* Tab Content */}
            <Box sx={{ mt: 2, width: '100%' }}>
              {selectedTab === 0 && <CustomizedDataGrid />}
              {selectedTab === 1 && <PlacementsGrid />}
            </Box>
          </Stack>
        </Stack>
      </Grid>

      <Copyright />

      {/* Save Search Modal */}
      <Dialog open={saveModalOpen} onClose={() => setSaveModalOpen(false)}>
        <DialogTitle>Save Search</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <Box>
              <InputLabel>Search Name</InputLabel>
              <TextField
                fullWidth
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                size="small"
              />
            </Box>


            <Box>
              <InputLabel>Color</InputLabel>
              <MuiColorInput
                format="hex"
                value={saveColor}
                onChange={(color: string) => setSaveColor(color)}
                fullWidth
                size="small"
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSearch}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(deleteModal)} onClose={() => setDeleteModal(null)}>
        <DialogTitle>Delete Saved Search?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the saved search &quot;{deleteModal}&quot;?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handleDeleteSearch(deleteModal)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
