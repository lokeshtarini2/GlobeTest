import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const initialFormData = {
    name: '',
    role: '',
    gsm: '',
    comments: '',
    officePhone: '',
    email: '',
    bankDetails: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankAddress: '',
    bankSwiftCode: '',
    bankName: '',
    bankIBAN: '',
    abaNumber: '',
    other1: '',
    other2: '',
    other3: '',
    intermediaryBankName: '',
    intermediaryAccountNumber: '',
    intermediarySwiftCode: '',
    intermediaryOther1: '',
    intermediaryOther2: '',
    intermediaryOther3: '',
};

export default function BankingDetails() {
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
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextField fullWidth id="name" name="name" value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="role">Role</InputLabel>
                    <TextField fullWidth id="role" name="role" value={formData.role} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="gsm">GSM</InputLabel>
                    <TextField fullWidth id="gsm" name="gsm" value={formData.gsm} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="comments">Comments</InputLabel>
                    <TextField fullWidth id="comments" name="comments" value={formData.comments} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="officePhone">Office Phone</InputLabel>
                    <TextField fullWidth id="officePhone" name="officePhone" value={formData.officePhone} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField fullWidth id="email" name="email" value={formData.email} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankDetails">Bank Details</InputLabel>
                    <TextField fullWidth id="bankDetails" name="bankDetails" value={formData.bankDetails} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankAccountName">Bank Account Name</InputLabel>
                    <TextField fullWidth id="bankAccountName" name="bankAccountName" value={formData.bankAccountName} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankAccountNumber">Bank Account Number</InputLabel>
                    <TextField fullWidth id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankAddress">Bank Address</InputLabel>
                    <TextField fullWidth id="bankAddress" name="bankAddress" value={formData.bankAddress} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankSwiftCode">Bank Swift Code</InputLabel>
                    <TextField fullWidth id="bankSwiftCode" name="bankSwiftCode" value={formData.bankSwiftCode} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankName">Bank Name</InputLabel>
                    <TextField fullWidth id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="bankIBAN">Bank IBAN</InputLabel>
                    <TextField fullWidth id="bankIBAN" name="bankIBAN" value={formData.bankIBAN} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="abaNumber">ABA Number</InputLabel>
                    <TextField fullWidth id="abaNumber" name="abaNumber" value={formData.abaNumber} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="other1">Other 1</InputLabel>
                    <TextField fullWidth id="other1" name="other1" value={formData.other1} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="other2">Other 2</InputLabel>
                    <TextField fullWidth id="other2" name="other2" value={formData.other2} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="other3">Other 3</InputLabel>
                    <TextField fullWidth id="other3" name="other3" value={formData.other3} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="intermediaryBankName">Intermediary Bank Name</InputLabel>
                    <TextField fullWidth id="intermediaryBankName" name="intermediaryBankName" value={formData.intermediaryBankName} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="intermediaryAccountNumber">Intermediary Account Number</InputLabel>
                    <TextField fullWidth id="intermediaryAccountNumber" name="intermediaryAccountNumber" value={formData.intermediaryAccountNumber} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="intermediarySwiftCode">Intermediary Swift Code</InputLabel>
                    <TextField fullWidth id="intermediarySwiftCode" name="intermediarySwiftCode" value={formData.intermediarySwiftCode} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="intermediaryOther1">Intermediary Other 1</InputLabel>
                    <TextField fullWidth id="intermediaryOther1" name="intermediaryOther1" value={formData.intermediaryOther1} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="intermediaryOther2">Intermediary Other 2</InputLabel>
                    <TextField fullWidth id="intermediaryOther2" name="intermediaryOther2" value={formData.intermediaryOther2} onChange={handleChange} />
                </Grid>
                <Grid size={3}>
                    <InputLabel htmlFor="intermediaryOther3">Intermediary Other 3</InputLabel>
                    <TextField fullWidth id="intermediaryOther3" name="intermediaryOther3" value={formData.intermediaryOther3} onChange={handleChange} />
                </Grid>
                <Grid size={12}>
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
                                    <strong>{key}:</strong> {val as string}
                                </Grid>
                            ))}
                            <Grid size={12}>
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
