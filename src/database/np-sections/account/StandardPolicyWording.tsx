import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

const lobOptions = [
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

let idCounter = 0;

export default function StandardPolicyWording() {
    const [formData, setFormData] = useState({
        name: '',
        lob: '',
        comments: '',
        attachments: [] as File[],
    });

    const [rows, setRows] = useState<any[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleFileDrop = (files: FileList | null) => {
        if (files) {
            setFormData((prev) => ({
                ...prev,
                attachments: [...prev.attachments, ...Array.from(files)],
            }));
        }
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(formData.attachments);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFormData((prev) => ({ ...prev, attachments: items }));
    };

    const handleAddOrEdit = () => {
        if (!formData.name || !formData.lob) return;
        const newEntry = { ...formData, id: idCounter++ };

        if (editIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[editIndex] = newEntry;
            setRows(updatedRows);
        } else {
            setRows((prev) => [...prev, newEntry]);
        }

        handleReset();
    };

    const handleEdit = (index: number) => {
        const data = rows[index];
        setFormData({
            name: data.name,
            lob: data.lob,
            comments: data.comments,
            attachments: data.attachments,
        });
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        setRows((prev) => prev.filter((_, i) => i !== index));
        if (editIndex === index) handleReset();
    };

    const handleReset = () => {
        setFormData({ name: '', lob: '', comments: '', attachments: [] });
        setEditIndex(null);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name of Policy Terms / Wording', flex: 1 },
        { field: 'lob', headerName: 'Line of Business', flex: 1 },
        { field: 'comments', headerName: 'Comments', flex: 1 },
        {
            field: 'attachments',
            headerName: 'Attachments',
            flex: 1,
            renderCell: (params) => `${params.value.length} file(s)`,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            renderCell: (params) => {
                const index = rows.findIndex((r) => r.id === params.row.id);
                return (
                    <>
                        <IconButton onClick={() => handleEdit(index)}><Edit /></IconButton>
                        <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                    </>
                );
            },
        },
    ];

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <InputLabel shrink>Name of Policy Terms / Wording</InputLabel>
                    <TextField
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Grid>

                <Grid size={3}>
                    <InputLabel shrink>Line of Business</InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        value={formData.lob}
                        onChange={(e) => setFormData({ ...formData, lob: e.target.value })}
                    >
                        <MenuItem value="" disabled>
                            Line of Business
                        </MenuItem>
                        {lobOptions.map((lob) => (
                            <MenuItem key={lob} value={lob}>{lob}</MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid size={3}>
                    <InputLabel shrink>Comments</InputLabel>
                    <TextField
                        fullWidth
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    />
                </Grid>

                <Grid size={3}>
                    <InputLabel shrink>Attachments</InputLabel>
                    <Droppable droppableId="attachments" direction="horizontal">
                        {(provided) => (
                            <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{ border: '1px dashed gray', p: 2, minHeight: 60 }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    handleFileDrop(e.dataTransfer.files);
                                }}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <Typography>Drag files here</Typography>
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="attachments" direction="horizontal">
                                        {(provided) => (
                                            <Box ref={provided.innerRef} {...provided.droppableProps} display="flex" gap={2} mt={1}>
                                                {formData.attachments.map((file, index) => (
                                                    <Draggable key={file.name + index} draggableId={file.name + index} index={index}>
                                                        {(provided) => (
                                                            <Box
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{ p: 1, border: '1px solid #ccc', borderRadius: 1 }}
                                                            >
                                                                {file.name}
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Box>
                        )}
                    </Droppable>
                </Grid>

                <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={handleReset}>Reset</Button>
                    <Button variant="contained" onClick={handleAddOrEdit}>{editIndex === null ? 'Add' : 'Edit'}</Button>
                </Grid>
            </Grid>

            <Box mt={4}>
                <Typography variant="h6" gutterBottom>Policy Terms List</Typography>
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}
