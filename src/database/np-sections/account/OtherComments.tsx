import { Box, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';

export default function OtherComments() {
    const [comments, setComments] = useState('');

    return (
        <Box>
            <InputLabel htmlFor="comments-input">Comments</InputLabel>
            <TextField
                fullWidth
                id="comments-input"
                name="comments"
                value={comments}
                onChange={e => setComments(e.target.value)}
                multiline
                minRows={3}
            />
        </Box>
    );
}
