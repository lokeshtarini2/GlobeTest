import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp
} from '@mui/x-data-grid';
import { useRef, useState } from 'react';
import SearchSelect from '../components/SearchableSelect';

const pmOptions = [
  'Allied World Assurance Company',
  'Liberty Mutual (Switzerland Office)',
  'Falvey Cargo Underwriting',
  'Everest Insurance Management and Professional Lines',
  'Liberty Mutual (France Office)',
];

export default function RPV() {
  const [selectedPM, setSelectedPM] = useState('');
  const [ratingRows, setRatingRows] = useState<GridRowsProp>([]);
  const [miscAgencyName, setMiscAgencyName] = useState('');
  const [miscRating, setMiscRating] = useState('');

  const [agencyRows, setAgencyRows] = useState<GridRowsProp>([
    {
      id: 1,
      name: "Acme Insurance",
      country: "USA",
      amBest: "A",
      sp: "AA-",
      fitch: "A+",
      moodys: "A2",
      registeredCountries: "US, CA, MX",
    },
    {
      id: 2,
      name: "Global Re",
      country: "UK",
      amBest: "A-",
      sp: "A",
      fitch: "A",
      moodys: "A3",
      registeredCountries: "UK, FR, DE",
    },
  ]);

  const [newAgency, setNewAgency] = useState({
    name: '',
    country: '',
    amBest: '',
    sp: '',
    fitch: '',
    moodys: '',
    registeredCountries: [] as string[],
  });

  const idCounter = useRef(3); // For agency rows
  const ratingIdCounter = useRef(1); // For rating rows

  const handleAddRatingAgency = () => {
    if (!miscAgencyName || !miscRating) return;

    setRatingRows(prev => [
      ...prev,
      { id: ratingIdCounter.current++, name: miscAgencyName, rating: miscRating }
    ]);

    setMiscAgencyName('');
    setMiscRating('');
  };

  const handleDeleteRatingAgency = (idToDelete: number) => {
    setRatingRows(prev => prev.filter(row => row.id !== idToDelete));
  };

  const handleAgencyAdd = () => {
    const combinedMiscRatings = ratingRows.map(r => `${r.name}: ${r.rating}`).join('; ');

    setAgencyRows(prev => [
      ...prev,
      {
        id: idCounter.current++,
        ...newAgency,
        registeredCountries: newAgency.registeredCountries || '',
        miscRatings: combinedMiscRatings,
      },
    ]);

    setNewAgency({
      name: '',
      country: '',
      amBest: '',
      sp: '',
      fitch: '',
      moodys: '',
      registeredCountries: [],
    });

    setRatingRows([]); // Optional: clear the misc ratings after adding
  };

  const handleAgencyDelete = (idToDelete: number) => {
    setAgencyRows(prev => prev.filter(row => row.id !== idToDelete));
  };

  const ratingColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'rating', headerName: 'Rating', flex: 1 },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteRatingAgency(params.row.id)}>
          <Delete />
        </IconButton>
      ),
      sortable: false,
      width: 80,
    },
  ];

  const fullAgencyColumns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, editable: true },
    { field: "country", headerName: "Country", flex: 1, editable: true },
    { field: "amBest", headerName: "AM Best Rating", flex: 1, editable: true },
    { field: "sp", headerName: "S&P Rating", flex: 1, editable: true },
    { field: "fitch", headerName: "Fitch Rating", flex: 1, editable: true },
    { field: "moodys", headerName: "Moody's Rating", flex: 1, editable: true },
    { field: "registeredCountries", headerName: "Registered Countries", flex: 2, editable: true },
    { field: "miscRatings", headerName: "Misc Ratings", flex: 2, editable: false },
    {
      field: 'delete',
      headerName: '',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleAgencyDelete(params.row.id)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      sortable: false,
      flex: 0.2
    },
  ];


  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        <Typography variant="h6" gutterBottom>
          Reinsurance Paper Values
        </Typography>
        <Stack spacing={3}>
          <Grid container spacing={2} direction={"column"}>
            <Grid size={6}>
              <Select
                value={selectedPM}
                onChange={(e) => setSelectedPM(e.target.value)}
                displayEmpty
                input={<OutlinedInput />}
                fullWidth
              >
                <MenuItem value="" disabled>
                  <Typography>Select PM</Typography>
                </MenuItem>
                {pmOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          {selectedPM && (
            <>
              <Typography variant="h6">Reinsurance Paper Details</Typography>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Stack direction={"column"} spacing={1}>
                    <InputLabel>Reinsurance Paper Value</InputLabel>
                    <TextField
                      fullWidth
                      value={newAgency.name}
                      onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                    />

                    <InputLabel>Registered Countries</InputLabel>
                    <Select
                      multiple
                      fullWidth
                      value={newAgency.registeredCountries}
                      onChange={(e) =>
                        setNewAgency({
                          ...newAgency,
                          registeredCountries: typeof e.target.value === 'string'
                            ? e.target.value.split(',')
                            : e.target.value,
                        })
                      }
                      input={<OutlinedInput label="Registered Countries" />}
                      renderValue={(selected) => (selected as string[]).join(', ')}
                    >
                      {[
                        "United States", "Canada", "United Kingdom", "France", "Germany",
                        "Australia", "India", "China", "Japan", "Mexico",
                        "Brazil", "South Africa", "Italy", "Spain", "Netherlands",
                        "Sweden", "Norway", "Denmark", "Switzerland", "Russia",
                      ].map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>

                  </Stack>
                </Grid>

                <Grid size={6}>
                  <Stack direction={"column"} spacing={1}>
                    <InputLabel>AM Best Rating</InputLabel>
                    <SearchSelect
                      label="Select AM Best Rating"
                      options={[
                        "A++ (Superior)", "A+ (Superior)", "A (Excellent)", "A- (Excellent)",
                        "B++ (Good)", "B+ (Good)", "B (Fair)", "B- (Fair)",
                        "C++ (Marginal)", "C+ (Marginal)", "C (Weak)", "C- (Weak)",
                        "D (Poor)", "E", "F", "S", "Not Rated",
                      ]}
                      value={newAgency.amBest}
                      onChange={(value: string) => setNewAgency({ ...newAgency, amBest: value })}
                    />

                    <InputLabel>S&P Rating</InputLabel>
                    <SearchSelect
                      label="Select S&P Rating"
                      options={[
                        "A++ (Superior)", "A+ (Superior)", "A (Excellent)", "A- (Excellent)",
                        "B++ (Good)", "B+ (Good)", "B (Fair)", "B- (Fair)",
                        "C++ (Marginal)", "C+ (Marginal)", "C (Weak)", "C- (Weak)",
                        "D (Poor)", "E", "F", "S", "Not Rated",
                      ]}
                      value={newAgency.sp}
                      onChange={(value) => setNewAgency({ ...newAgency, sp: value })}
                    />

                    <InputLabel>Fitch Rating</InputLabel>
                    <SearchSelect
                      label="Select Fitch Rating"
                      options={[
                        "AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+",
                        "BBB", "BBB-", "BB+", "BB", "BB-", "B+", "B", "B-",
                        "CCC+", "CCC", "CCC-", "CC", "C", "DDD", "DD", "D",
                      ]}
                      value={newAgency.fitch}
                      onChange={(value) => setNewAgency({ ...newAgency, fitch: value })}
                    />

                    <InputLabel>Moody's Rating</InputLabel>
                    <SearchSelect
                      label="Select Moody's Rating"
                      options={[
                        "Aaa", "Aa1", "Aa2", "Aa3", "A1", "A2", "A3", "Baa1",
                        "Baa2", "Baa3", "Ba1", "Ba2", "Ba3", "B1", "B2", "B3",
                        "Caa1", "Caa2", "Caa3", "Ca", "C",
                      ]}
                      value={newAgency.moodys}
                      onChange={(value) => setNewAgency({ ...newAgency, moodys: value })}
                    />

                    <InputLabel>Misc. Agency Name</InputLabel>
                    <TextField
                      fullWidth
                      value={miscAgencyName}
                      onChange={(e) => setMiscAgencyName(e.target.value)}
                    />

                    <InputLabel>Misc. Rating</InputLabel>
                    <TextField
                      fullWidth
                      value={miscRating}
                      onChange={(e) => setMiscRating(e.target.value)}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      onClick={handleAddRatingAgency}
                    >
                      Add Rating
                    </Button>
                  </Stack>
                </Grid>
              </Grid>


              {ratingRows.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Rating Agencies Table
                  </Typography>
                  <DataGrid
                    rows={ratingRows}
                    columns={ratingColumns}
                    autoHeight
                    disableRowSelectionOnClick
                  />
                </Box>
              )}

              <Box mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAgencyAdd}
                  startIcon={<Add />}
                >
                  Add Reinsurance Agency
                </Button>
              </Box>

              {agencyRows.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Reinsurance Agencies Table
                  </Typography>
                  <DataGrid
                    rows={agencyRows}
                    columns={fullAgencyColumns}
                    autoHeight
                    disableRowSelectionOnClick
                  />
                </Box>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Box >
  );
}
