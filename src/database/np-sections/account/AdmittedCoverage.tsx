import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const lineOfBusinessOptions = [
    'Marine Cargo',
    'Property',
    'Cyber Liability',
    'Freight Liability',
    'General Liability',
    'Management Liability',
    'Pollution/Environmental Liability',
    'Professional Indemnity / Errors and Omissions',
    'Construction Lines',
    'Machinery Breakdown',
    'Employer Liability',
    'Accident & Health',
    'Commercial Auto Liability',
    'Bond/Surety',
    'Clinical Trial Liability',
    'Other Lines, please specify',
];

type Entry = {
    id: number;
    lineOfBusiness: string;
    status: string;
    comments: string;
};

export default function AdmittedCoverage() {
    const [formData, setFormData] = useState({
        lineOfBusiness: '',
        status: '',
        comments: '',
    });

    const [entries, setEntries] = useState<Entry[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddOrEdit = () => {
        if (!formData.lineOfBusiness || !formData.status) return;

        if (editingId !== null) {
            setEntries((prev) =>
                prev.map((entry) =>
                    entry.id === editingId ? { ...entry, ...formData } : entry
                )
            );
            setEditingId(null);
        } else {
            const newEntry: Entry = {
                id: Date.now(),
                ...formData,
            };
            setEntries((prev) => [...prev, newEntry]);
        }

        setFormData({ lineOfBusiness: '', status: '', comments: '' });
    };

    const handleEdit = (entry: Entry) => {
        setFormData({
            lineOfBusiness: entry.lineOfBusiness,
            status: entry.status,
            comments: entry.comments,
        });
        setEditingId(entry.id);
    };

    const handleDelete = (id: number) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        if (editingId === id) {
            setFormData({ lineOfBusiness: '', status: '', comments: '' });
            setEditingId(null);
        }
    };

    const handleReset = () => {
        setFormData({ lineOfBusiness: '', status: '', comments: '' });
        setEditingId(null);
    };

    return (
        <Box>
            <Grid container spacing={2} mb={2}>
                <Grid size={3}>
                    <Select
                        fullWidth
                        displayEmpty
                        value={formData.lineOfBusiness}
                        onChange={(e) => handleChange('lineOfBusiness', e.target.value)}
                    >
                        <MenuItem value="" disabled>
                            Line of Business
                        </MenuItem>
                        {lineOfBusinessOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={3}>
                    <Select
                        fullWidth
                        displayEmpty
                        value={formData.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <MenuItem value="" disabled>
                            Status
                        </MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </Grid>

                <Grid size={3}>
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Comments"
                        value={formData.comments}
                        onChange={(e) => handleChange('comments', e.target.value)}
                    />
                </Grid>
            </Grid>

            <Box display="flex" gap={2} mb={4}>
                <Button variant="contained" color="primary" onClick={handleAddOrEdit}>
                    {editingId !== null ? 'Save Edit' : 'Add'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleReset}>
                    Reset
                </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
                Entries
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Line of Business</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>{entry.lineOfBusiness}</TableCell>
                                <TableCell>{entry.status}</TableCell>
                                <TableCell>{entry.comments}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(entry)} size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(entry.id)} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {entries.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No entries added yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
