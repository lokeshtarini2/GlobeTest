import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
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

export default function UnderwritingCapacityLimit() {
    const [form, setForm] = useState({
        lineOfBusiness: '',
        currency: '',
        capacity: '',
        comments: '',
    });

    const [entries, setEntries] = useState<any[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setForm({
            lineOfBusiness: '',
            currency: '',
            capacity: '',
            comments: '',
        });
        setEditingIndex(null);
    };

    const handleAddOrUpdate = () => {
        if (editingIndex !== null) {
            const updated = [...entries];
            updated[editingIndex] = form;
            setEntries(updated);
        } else {
            setEntries([...entries, form]);
        }
        handleReset();
    };

    const handleEdit = (index: number) => {
        setForm(entries[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index: number) => {
        const updated = entries.filter((_, i) => i !== index);
        setEntries(updated);
        if (editingIndex === index) handleReset();
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <InputLabel htmlFor="lob-select">
                        Line of Business
                    </InputLabel>
                    <Select
                        id="lob-select"
                        fullWidth
                        displayEmpty
                        value={form.lineOfBusiness}
                        onChange={(e) => handleChange('lineOfBusiness', e.target.value)}
                    >
                        <MenuItem value="" disabled>
                            Select Line of Business
                        </MenuItem>
                        {lineOfBusinessOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={3}>
                    <InputLabel htmlFor="currency-select">
                        Currency (Yes or No)
                    </InputLabel>
                    <Select
                        id="currency-select"
                        fullWidth
                        displayEmpty
                        value={form.currency}
                        onChange={(e) => handleChange('currency', e.target.value)}
                    >
                        <MenuItem value="" disabled>
                            Select Currency
                        </MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </Grid>

                <Grid size={3}>
                    <InputLabel htmlFor="capacity-input">
                        Capacity
                    </InputLabel>
                    <TextField
                        id="capacity-input"
                        fullWidth
                        value={form.capacity}
                        onChange={(e) => handleChange('capacity', e.target.value)}
                    />
                </Grid>

                <Grid size={3}>
                    <InputLabel htmlFor="comments-input">
                        Comments
                    </InputLabel>
                    <TextField
                        id="comments-input"
                        fullWidth
                        multiline
                        minRows={1}
                        value={form.comments}
                        onChange={(e) => handleChange('comments', e.target.value)}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleAddOrUpdate} sx={{ mr: 2 }}>
                    {editingIndex !== null ? 'Update' : 'Add'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleReset}>
                    Reset
                </Button>
            </Box>

            {entries.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Submitted Entries
                    </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Line of Business</TableCell>
                                <TableCell>Currency</TableCell>
                                <TableCell>Capacity</TableCell>
                                <TableCell>Comments</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entries.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>{entry.lineOfBusiness}</TableCell>
                                    <TableCell>{entry.currency}</TableCell>
                                    <TableCell>{entry.capacity}</TableCell>
                                    <TableCell>{entry.comments}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEdit(index)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(index)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
        </Box>
    );
}
