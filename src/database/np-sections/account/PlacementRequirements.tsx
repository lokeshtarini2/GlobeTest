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
const lobOptions = [
    "Marine Cargo",
    "Property",
    "Cyber Liability",
    "Freight Liability",
    "General Liability",
    "Management Liability",
    "Pollution/Environmental Liability",
    "Professional Indemnity / Errors and Omissions",
    "Construction Lines",
    "Machinery Breakdown",
    "Employer Liability",
    "Accident & Health",
    "Commercial Auto Liability",
    "Bond/Surety",
    "Clinical Trial Liability",
    "Other Lines, please specify"
];

const initialFormData = {
    infoNeeded: '',
    foreignLaw: '',
    workWithInsured: '',
    comments1: '',
    retailBrokerCap: '',
    comments2: '',
    brokers: '',
    directInsureds: '',
    other: '',
    lob: '',
    placementInfo: '',
    subjectivities: '',
};

export default function PlacementRequirements() {
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
        <>
            <Grid container spacing={2}>


                <Grid size={3}>
                    <InputLabel id="lob-label">Line of Business</InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        labelId="lob-label"
                        value={formData.lob}
                        onChange={(e) => handleChange({ target: { name: 'lob', value: e.target.value } })}
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {lobOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={3}>
                    <InputLabel htmlFor="placementInfo">Local Placement Requirements and Information</InputLabel>
                    <TextField
                        fullWidth
                        id="placementInfo"
                        name="placementInfo"
                        value={formData.placementInfo}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={3}>
                    <InputLabel htmlFor="subjectivities">Subjectivities for Insured/Broker</InputLabel>
                    <TextField
                        fullWidth
                        id="subjectivities"
                        name="subjectivities"
                        value={formData.subjectivities}
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
                                <Grid size={6} key={key}>
                                    <strong>{key}:</strong>
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
        </>
    );
}
