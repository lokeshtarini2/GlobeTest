import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const lineItems = [
    'Marine Cargo',
    'Property',
    'Cyber Liability',
    'Freight Liability',
    'General Liability',
    'Management Liability',
    'Pollution/Environmental Liability',
    'Professional Indemnity / Errors and Omissions',
    'Construction Lines',
    'Machinery Breakdown',
    'Employer Liability',
    'Accident & Health',
    'Commercial Auto Liability',
    'Bond/Surety',
    'Clinical Trial Liability',
    'Other Lines, please specify',
];

export default function GoodStandard() {
    const [formData, setFormData] = useState({
        name: '',
        lob: '',
        comments: '',
        attachments: [] as string[],
    });
    const [data, setData] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleFileDrop = (result: DropResult) => {
        // Ignore reorder for simplicity
    };

    const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const fileNames = Array.from(e.target.files).map((f) => f.name);
            setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...fileNames] }));
        }
    };

    const handleDeleteAttachment = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }));
    };

    const resetForm = () => {
        setFormData({ name: '', lob: '', comments: '', attachments: [] });
        setIsEditing(false);
        setEditIndex(null);
    };

    const handleSubmit = () => {
        if (isEditing && editIndex !== null) {
            const updated = [...data];
            updated[editIndex] = formData;
            setData(updated);
        } else {
            setData((prev) => [...prev, formData]);
        }
        resetForm();
    };

    const handleEdit = (index: number) => {
        setFormData(data[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        setData((prev) => prev.filter((_, i) => i !== index));
        if (editIndex === index) resetForm();
    };

    return (
        <Box>
            <Grid container spacing={2} mt={1}>
                <Grid size={3}>
                    <TextField
                        label="Name of Policy Terms / Wording"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Grid>
                <Grid size={3}>
                    <Select
                        fullWidth
                        displayEmpty
                        value={formData.lob}
                        onChange={(e) => setFormData({ ...formData, lob: e.target.value })}
                    >
                        <MenuItem value="" disabled>
                            Line of Business
                        </MenuItem>
                        {lineItems.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={3}>
                    <TextField
                        label="Comments"
                        fullWidth
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    />
                </Grid>

                <Grid size={3}>
                    <Button variant="contained" component="label">
                        Browse
                        <input type="file" hidden multiple onChange={handleAddAttachment} />
                    </Button>
                </Grid>

                <Grid size={12}>
                    <DragDropContext onDragEnd={handleFileDrop}>
                        <Droppable droppableId="attachments">
                            {(provided) => (
                                <Box ref={provided.innerRef} {...provided.droppableProps}>
                                    {formData.attachments.map((file, index) => (
                                        <Draggable key={file + index} draggableId={file + index} index={index}>
                                            {(provided) => (
                                                <Paper
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{ p: 1, mb: 1, display: 'flex', justifyContent: 'space-between' }}
                                                >
                                                    <Typography>{file}</Typography>
                                                    <IconButton onClick={() => handleDeleteAttachment(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Paper>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Grid>

                <Grid size={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }}>
                        {isEditing ? 'Edit' : 'Add'}
                    </Button>
                    <Button variant="outlined" onClick={resetForm}>Reset</Button>
                </Grid>
            </Grid>

            {data.length > 0 && (
                <Box mt={5}>
                    <Typography variant="h6">Submitted Applications</Typography>
                    {data.map((entry, index) => (
                        <Paper key={index} sx={{ p: 2, mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid size={3}><strong>Name:</strong> {entry.name}</Grid>
                                <Grid size={3}><strong>LOB:</strong> {entry.lob}</Grid>
                                <Grid size={3}><strong>Comments:</strong> {entry.comments}</Grid>
                                <Grid size={3}>
                                    <strong>Attachments:</strong> {entry.attachments.join(', ')}
                                </Grid>
                                <Grid size={12}>
                                    <IconButton onClick={() => handleEdit(index)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
}
