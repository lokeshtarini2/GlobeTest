import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';

export default function Binding() {
    const [form, setForm] = useState({
        bindingDocs: '',
        localIssuanceDocs: '',
        backDatePolicy: '',
        comments: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    return (
        <Box >
            <Grid container spacing={3}>
                <Grid size={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="bindingDocs">
                            What information/documents do you require for binding?
                        </InputLabel>
                        <TextField
                            id="bindingDocs"
                            name="bindingDocs"
                            value={form.bindingDocs}
                            onChange={handleChange}
                            multiline
                            fullWidth
                            minRows={3}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>
                <Grid size={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="localIssuanceDocs">
                            What information/documents do you require from the local insured/broker for local policy issuance?
                        </InputLabel>
                        <TextField
                            id="localIssuanceDocs"
                            name="localIssuanceDocs"
                            value={form.localIssuanceDocs}
                            onChange={handleChange}
                            multiline
                            fullWidth
                            minRows={3}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>
                <Grid size={3}>
                    <FormControl fullWidth>
                        <InputLabel id="backDatePolicy-label">
                            Can you back date the local policy?
                        </InputLabel>
                        <Select
                            labelId="backDatePolicy-label"
                            name="backDatePolicy"
                            value={form.backDatePolicy}
                            // onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Can you back date the local policy?
                            </MenuItem>
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="comments">
                            Comments
                        </InputLabel>
                        <TextField
                            id="comments"
                            name="comments"
                            value={form.comments}
                            onChange={handleChange}
                            multiline
                            fullWidth
                            minRows={3}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}
