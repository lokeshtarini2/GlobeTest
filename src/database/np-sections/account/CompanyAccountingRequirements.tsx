import {
    Box,
    Checkbox,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import { useState } from 'react';

const yesNoOptions = ["Yes", "No"];
const currencyOptions = ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD", "CHF", "SGD"];

export default function CompanyAccountingRequirements() {
    const [form, setForm] = useState({
        requirePremiumBeforeBinding: '',
        comments1: '',
        premiumPaymentWarranty: '',
        comments2: '',
        canReceivePremiumOverseas: '',
        comments3: '',
        canReceiveTaxesFeesOverseas: '',
        comments4: '',
        currencies: [] as string[],
        remitTime: '',
        remitDocs: '',
    });

    const handleChange = (field: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleMultiSelect = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setForm((prev) => ({ ...prev, currencies: typeof value === 'string' ? value.split(',') : value as string[] }));
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {/* 1. Require premium before binding */}
                <Grid size={6}>
                    <InputLabel id="require-premium-label">Do you require premium before the coverage can be bound?</InputLabel>
                    <Select
                        labelId="require-premium-label"
                        value={form.requirePremiumBeforeBinding}
                        onChange={e => handleChange('requirePremiumBeforeBinding', e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {yesNoOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid size={6}>
                    <InputLabel >Comments</InputLabel>
                    <TextField
                        value={form.comments1}
                        onChange={e => handleChange('comments1', e.target.value)}
                        fullWidth
                        multiline
                        minRows={1}
                    />
                </Grid>

                {/* 2. Premium payment warranty */}
                <Grid size={6}>
                    <InputLabel id="premium-warranty-label">Do you have any premium payment warranty on international placements?</InputLabel>
                    <Select
                        labelId="premium-warranty-label"
                        value={form.premiumPaymentWarranty}
                        onChange={e => handleChange('premiumPaymentWarranty', e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {yesNoOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid size={6}>
                    <InputLabel >Comments</InputLabel>
                    <TextField
                        value={form.comments2}
                        onChange={e => handleChange('comments2', e.target.value)}
                        fullWidth
                        multiline
                        minRows={1}
                    />
                </Grid>

                {/* 3. Can receive premium payments from overseas */}
                <Grid size={6}>
                    <InputLabel id="receive-premium-overseas-label">Can you receive premium payments from overseas for international placements?</InputLabel>
                    <Select
                        labelId="receive-premium-overseas-label"
                        value={form.canReceivePremiumOverseas}
                        onChange={e => handleChange('canReceivePremiumOverseas', e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {yesNoOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid size={6}>
                    <InputLabel >Comments</InputLabel>
                    <TextField
                        value={form.comments3}
                        onChange={e => handleChange('comments3', e.target.value)}
                        fullWidth
                        multiline
                        minRows={1}
                    />
                </Grid>

                {/* 4. Can receive taxes/fees only from overseas */}
                <Grid size={6}>
                    <InputLabel id="receive-taxes-fees-label">Can you receive taxes and fees only from overseas for international placements?</InputLabel>
                    <Select
                        labelId="receive-taxes-fees-label"
                        value={form.canReceiveTaxesFeesOverseas}
                        onChange={e => handleChange('canReceiveTaxesFeesOverseas', e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        {yesNoOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid size={6}>
                    <InputLabel >Comments</InputLabel>
                    <TextField
                        value={form.comments4}
                        onChange={e => handleChange('comments4', e.target.value)}
                        fullWidth
                        multiline
                        minRows={1}
                    />
                </Grid>

                {/* 5. What currencies can you receive premium payments? (Multi Select) */}
                <Grid size={6}>
                    <InputLabel id="currencies-label">What currencies can you receive premium payments?</InputLabel>
                    <Select
                        labelId="currencies-label"
                        multiple
                        value={form.currencies}
                        onChange={handleMultiSelect}
                        input={<OutlinedInput label="Currencies" />}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        fullWidth
                        displayEmpty
                    >
                        {currencyOptions.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                <Checkbox checked={form.currencies.indexOf(currency) > -1} />
                                <ListItemText primary={currency} />
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                {/* 6. How long does it take you to remit net premium to the reinsurers? */}
                <Grid size={6}>
                    <InputLabel>How long does it take you to remit net premium to the reinsurers?</InputLabel>
                    <TextField
                        value={form.remitTime}
                        onChange={e => handleChange('remitTime', e.target.value)}
                        fullWidth
                        multiline
                        minRows={1}
                    />
                </Grid>

                {/* 7. What documents do you require in order to remit net premium to the reinsurers? */}
                <Grid size={6}>
                    <InputLabel>What documents do you require in order to remit net premium to the reinsurers?</InputLabel>
                    <TextField
                        value={form.remitDocs}
                        onChange={e => handleChange('remitDocs', e.target.value)}
                        fullWidth
                        multiline
                        minRows={1}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
