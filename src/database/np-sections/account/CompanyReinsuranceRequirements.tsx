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

export default function CompanyReinsuranceRequirements() {
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
                <Grid size={6}>
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
                        labelId="foreignLaw-label"
                        id="foreignLaw"
                        value={formData.foreignLaw}
                        onChange={(e) => handleChange({ target: { name: 'foreignLaw', value: e.target.value } })}
                        displayEmpty
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
                        labelId="workWithInsured-label"
                        id="workWithInsured"
                        value={formData.workWithInsured}
                        onChange={(e) => handleChange({ target: { name: 'workWithInsured', value: e.target.value } })}
                        displayEmpty
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
                        labelId="retailBrokerCap-label"
                        id="retailBrokerCap"
                        value={formData.retailBrokerCap}
                        onChange={(e) => handleChange({ target: { name: 'retailBrokerCap', value: e.target.value } })}
                        displayEmpty
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

                <Grid size={6}>
                    <InputLabel id="brokers-label">Brokers</InputLabel>
                    <Select
                        fullWidth
                        labelId="brokers-label"
                        id="brokers"
                        value={formData.brokers}
                        onChange={(e) => handleChange({ target: { name: 'brokers', value: e.target.value } })}
                        displayEmpty
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
                    <InputLabel id="directInsureds-label">Direct Insureds</InputLabel>
                    <Select
                        fullWidth
                        labelId="directInsureds-label"
                        id="directInsureds"
                        value={formData.directInsureds}
                        onChange={(e) => handleChange({ target: { name: 'directInsureds', value: e.target.value } })}
                        displayEmpty
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
                    <InputLabel htmlFor="other">Other, please specify</InputLabel>
                    <TextField
                        fullWidth
                        id="other"
                        name="other"
                        value={formData.other}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={6}>
                    <InputLabel id="lob-label">Line of Business</InputLabel>
                    <Select
                        fullWidth
                        labelId="lob-label"
                        id="lob"
                        value={formData.lob}
                        onChange={(e) => handleChange({ target: { name: 'lob', value: e.target.value } })}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Select
                        </MenuItem>
                        {lobOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={6}>
                    <InputLabel htmlFor="placementInfo">Local Placement Requirements and Information</InputLabel>
                    <TextField
                        fullWidth
                        id="placementInfo"
                        name="placementInfo"
                        value={formData.placementInfo}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={6}>
                    <InputLabel htmlFor="subjectivities">Subjectivities for Insured/Broker</InputLabel>
                    <TextField
                        fullWidth
                        id="subjectivities"
                        name="subjectivities"
                        value={formData.subjectivities}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid size={6}>
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
                            <Grid size={6}>
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
