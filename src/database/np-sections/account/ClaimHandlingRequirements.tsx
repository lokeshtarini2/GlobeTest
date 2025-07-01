import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const yesNoOptions = ["Yes", "No"];

const initialFormData = {
    involvement: '',
    reinsurerDirectPay: '',
    comments1: '',
    otherRequirements: '',
    comments2: '',
};

export default function ClaimHandlingRequirements() {
    const [formData, setFormData] = useState(initialFormData);
    const [entries, setEntries] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: unknown } }
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddOrUpdate = () => {
        if (editIndex !== null) {
            const updated = [...entries];
            updated[editIndex] = formData;
            setEntries(updated);
            setEditIndex(null);
        } else {
            setEntries((prev) => [...prev, formData]);
        }
        setFormData(initialFormData);
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setEditIndex(null);
    };

    const handleEdit = (index: number) => {
        setFormData(entries[index]);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        setEntries((prev) => prev.filter((_, i) => i !== index));
        if (editIndex === index) {
            setEditIndex(null);
            setFormData(initialFormData);
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <InputLabel htmlFor="involvement">
                        What is your preferred involvement of claim handling for international reinsurance placements?
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="involvement"
                        name="involvement"
                        value={formData.involvement}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="reinsurerDirectPay">
                        Can the reinsurer pay their share of the claim payment directly to the local insured?
                    </InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        id="reinsurerDirectPay"
                        name="reinsurerDirectPay"
                        value={formData.reinsurerDirectPay}
                        onChange={(e) => handleChange({ target: { name: 'reinsurerDirectPay', value: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            Select
                        </MenuItem>
                        {yesNoOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="comments1">Comments</InputLabel>
                    <TextField
                        fullWidth
                        id="comments1"
                        name="comments1"
                        value={formData.comments1}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="otherRequirements">
                        Other claim handling related requirements?
                    </InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        id="otherRequirements"
                        name="otherRequirements"
                        value={formData.otherRequirements}
                        onChange={(e) => handleChange({ target: { name: 'otherRequirements', value: e.target.value } })}
                    >
                        <MenuItem value="" disabled>
                            Select
                        </MenuItem>
                        {yesNoOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="comments2">Comments</InputLabel>
                    <TextField
                        fullWidth
                        id="comments2"
                        name="comments2"
                        value={formData.comments2}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid size={3}>
                    <Button variant="contained" onClick={handleAddOrUpdate}>
                        {editIndex !== null ? 'Edit' : 'Add'}
                    </Button>{' '}
                    <Button onClick={handleReset}>Reset</Button>
                </Grid>
            </Grid>
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>Submitted Entries</Typography>
                {entries.length === 0 && <Typography>No entries yet.</Typography>}
                {entries.map((entry, idx) => (
                    <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                        <Grid container spacing={1}>
                            {Object.entries(entry).map(([key, val]) => (
                                <Grid size={3} key={key}>
                                    <strong>{key}:</strong> {String(val)}
                                </Grid>
                            ))}
                            <Grid size={3}>
                                <IconButton onClick={() => handleEdit(idx)}><Edit /></IconButton>
                                <IconButton onClick={() => handleDelete(idx)}><Delete /></IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
