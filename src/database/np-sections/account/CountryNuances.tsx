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

export default function CountryNuances() {
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
                    <InputLabel htmlFor="infoNeeded">
                        Given standard underwriting information is provided, what other information do you need to confirm terms?
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="infoNeeded"
                        name="infoNeeded"
                        value={formData.infoNeeded}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={6}>
                    <InputLabel id="foreignLaw-label">
                        Is Foreign law and jurisdiction available on local policy
                    </InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        labelId="foreignLaw-label"
                        value={formData.foreignLaw}
                        onChange={(e) => handleChange({ target: { name: 'foreignLaw', value: e.target.value } })}
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

                <Grid size={6}>
                    <InputLabel id="workWithInsured-label">
                        Can you work with the insured directly on international placements?
                    </InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        labelId="workWithInsured-label"
                        value={formData.workWithInsured}
                        onChange={(e) => handleChange({ target: { name: 'workWithInsured', value: e.target.value } })}
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

                <Grid size={6}>
                    <InputLabel id="retailBrokerCap-label">
                        If a local retail broker is needed, is there a maximum brokerage that can be paid through your local policy?
                    </InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        labelId="retailBrokerCap-label"
                        value={formData.retailBrokerCap}
                        onChange={(e) => handleChange({ target: { name: 'retailBrokerCap', value: e.target.value } })}
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

                <Grid size={6}>
                    <InputLabel htmlFor="comments2">Comments</InputLabel>
                    <TextField
                        fullWidth
                        id="comments2"
                        name="comments2"
                        value={formData.comments2}
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
