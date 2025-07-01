import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
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

export default function DistributionChannels() {
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


                <Grid size={6}>
                    <InputLabel id="brokers-label">Brokers</InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        labelId="brokers-label"
                        value={formData.brokers}
                        onChange={(e) => handleChange({ target: { name: 'brokers', value: e.target.value } })}
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {yesNoOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={6}>
                    <InputLabel id="directInsureds-label">Direct Insureds</InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        labelId="directInsureds-label"
                        value={formData.directInsureds}
                        onChange={(e) => handleChange({ target: { name: 'directInsureds', value: e.target.value } })}
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {yesNoOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={3}>
                    <InputLabel htmlFor="other">Other, please specify</InputLabel>
                    <TextField
                        fullWidth
                        id="other"
                        name="other"
                        value={formData.other}
                        onChange={handleChange}
                    />
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
