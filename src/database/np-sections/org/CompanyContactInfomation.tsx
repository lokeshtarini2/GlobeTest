import {
    Box,
    Checkbox,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const departments = [
    'Underwriting Department',
    'Reinsurance Department',
    'Claim Department',
    'Accounting Department',
    'International Department',
];

const linesOfBusiness = [
    'Marine Cargo',
    'Property',
    'Cyber Liability',
    'Freight Liability',
];

const countries = [
    'United States', 'Canada', 'United Kingdom', 'France', 'Germany',
    'Australia', 'India', 'China', 'Japan', 'Mexico', 'Brazil',
    'South Africa', 'Italy', 'Spain', 'Netherlands', 'Sweden',
    'Norway', 'Denmark', 'Switzerland', 'Russia',
];

export const CompanyContactInformation = () => {
    const [formData, setFormData] = useState({
        departments: [] as string[],
        linesOfBusiness: [] as string[],
        country: '',
        name: '',
        title: '',
        email: '',
        officePhone: '',
        mobilePhone: '',
        comments: '',
        otherComms: '',
        preferredContact: '',
    });

    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Box>
            <Stack spacing={2}>
                <Grid container spacing={2} direction="row">
                    <Grid size={3}>
                        <InputLabel>Department</InputLabel>
                        <Select
                            multiple
                            fullWidth
                            value={formData.departments}
                            onChange={(e) =>
                                handleChange(
                                    'departments',
                                    typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                                )
                            }
                            input={<OutlinedInput />}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                    <Checkbox checked={formData.departments.indexOf(dept) > -1} />
                                    <ListItemText primary={dept} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Line of Business</InputLabel>
                        <Select
                            multiple
                            fullWidth
                            value={formData.linesOfBusiness}
                            onChange={(e) =>
                                handleChange(
                                    'linesOfBusiness',
                                    typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                                )
                            }
                            input={<OutlinedInput />}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            {linesOfBusiness.map((lob) => (
                                <MenuItem key={lob} value={lob}>
                                    <Checkbox checked={formData.linesOfBusiness.indexOf(lob) > -1} />
                                    <ListItemText primary={lob} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            fullWidth
                            value={formData.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            displayEmpty
                            input={<OutlinedInput />}
                        >
                            <MenuItem value="" disabled>
                                <Typography>Select Country</Typography>
                            </MenuItem>
                            {countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Title / Role</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Email</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Office Phone</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.officePhone}
                            onChange={(e) => handleChange('officePhone', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Mobile Phone</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.mobilePhone}
                            onChange={(e) => handleChange('mobilePhone', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Comments</InputLabel>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={formData.comments}
                            onChange={(e) => handleChange('comments', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Other Communication Platforms</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.otherComms}
                            onChange={(e) => handleChange('otherComms', e.target.value)}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>Preferred Method of Contact</InputLabel>
                        <TextField
                            fullWidth
                            value={formData.preferredContact}
                            onChange={(e) => handleChange('preferredContact', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};
