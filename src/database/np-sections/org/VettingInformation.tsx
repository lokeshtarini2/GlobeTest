import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from "react";
import { useDropzone } from 'react-dropzone';

export default function VettingInformation() {
    const [gusData, setGusData] = useState({
        companyName: "",
        networkPartnerSince: "",
        executiveSummary: "",
        vettingStatus: "",
        gndRep: "",
        vettingCompletionDate: "",
        workshopDate: "",
        overallScore: "",
        responsivenessScore: "",
        primaryContactNotes: "",
        vettingStatusComments: "",
        nextVettingReminderComments: "",
        nextVettingReminder: "",
    });

    const [attachments, setAttachments] = useState<Array<{
        id: number;
        name: string;
        size: number;
        file: File;
        uploading: boolean;
        uploadProgress: number;
    }>>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<number | null>(null);
    const [nextId, setNextId] = useState(1);

    const handleFileDrop = async (acceptedFiles: File[]) => {
        const newAttachments = acceptedFiles.map(file => ({
            id: nextId + acceptedFiles.indexOf(file),
            name: file.name,
            size: file.size,
            file,
            uploading: true,
            uploadProgress: 0,
        }));

        setAttachments(prev => [...prev, ...newAttachments]);
        setNextId(prev => prev + acceptedFiles.length);

        // Simulate upload progress
        newAttachments.forEach(async (attachment) => {
            for (let progress = 0; progress <= 100; progress += 10) {
                await new Promise(resolve => setTimeout(resolve, 100));
                setAttachments(prev =>
                    prev.map(att =>
                        att.id === attachment.id
                            ? { ...att, uploadProgress: progress, uploading: progress < 100 }
                            : att
                    )
                );
            }
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileDrop,
        multiple: true
    });

    const handleDeleteConfirm = () => {
        if (fileToDelete !== null) {
            setAttachments(prev => prev.filter(att => att.id !== fileToDelete));
            setDeleteDialogOpen(false);
            setFileToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setFileToDelete(null);
    };

    const handleDeleteClick = (id: number) => {
        setFileToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDownload = (file: File, fileName: string) => {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const reordered = Array.from(attachments);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);

        setAttachments(reordered);
    };

    // Get uploaded (completed) files for the table
    const uploadedFiles = attachments.filter(file => !file.uploading);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'File Name',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Typography variant="body2">
                        {params.value}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'size',
            headerName: 'Size',
            width: 120,
            renderCell: (params) => formatFileSize(params.value),
        },
        {
            field: 'actions',
            headerName: '',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
                    <Tooltip title="Download" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => handleDownload(params.row.file, params.row.name)}
                            size="small"
                            title="Download"
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(params.row.id)}
                            size="small"
                            title="Delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <InputLabel>Company Name</InputLabel>

                        <TextField
                            fullWidth
                            value={gusData.companyName}
                            onChange={(e) =>
                                setGusData({ ...gusData, companyName: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>Network Partner Since</InputLabel>

                        <TextField
                            fullWidth
                            type="date"
                            value={gusData.networkPartnerSince}
                            onChange={(e) =>
                                setGusData({ ...gusData, networkPartnerSince: e.target.value })
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>GUS Executive Summary</InputLabel>

                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={gusData.executiveSummary}
                            onChange={(e) =>
                                setGusData({ ...gusData, executiveSummary: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>Network Partner Overall Score</InputLabel>

                        <TextField
                            fullWidth
                            type="number"
                            value={gusData.overallScore}
                            onChange={(e) =>
                                setGusData({ ...gusData, overallScore: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>Responsiveness Score</InputLabel>

                        <TextField
                            fullWidth
                            type="number"
                            value={gusData.responsivenessScore}
                            onChange={(e) =>
                                setGusData({ ...gusData, responsivenessScore: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>GND Representative</InputLabel>

                        <TextField
                            fullWidth
                            value={gusData.gndRep}
                            onChange={(e) =>
                                setGusData({ ...gusData, gndRep: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>GUS Vetting Status</InputLabel>

                        <Select
                            fullWidth
                            value={gusData.vettingStatus}
                            onChange={(e) =>
                                setGusData({ ...gusData, vettingStatus: e.target.value })
                            }
                            input={<OutlinedInput />}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Vetting Status</MenuItem>
                            <MenuItem value="Complete">Complete</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                        </Select>
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>GUS Vetting Completion Date</InputLabel>

                        <TextField
                            fullWidth
                            type="date"
                            value={gusData.vettingCompletionDate}
                            onChange={(e) =>
                                setGusData({ ...gusData, vettingCompletionDate: e.target.value })
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>GUS Workshop Done On</InputLabel>

                        <TextField
                            fullWidth
                            type="date"
                            value={gusData.workshopDate}
                            onChange={(e) =>
                                setGusData({ ...gusData, workshopDate: e.target.value })
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>



                    <Grid size={4}>
                        <InputLabel>Primary Contact Person Comments</InputLabel>

                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={gusData.primaryContactNotes}
                            onChange={(e) =>
                                setGusData({ ...gusData, primaryContactNotes: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>Vetting Status Comments</InputLabel>

                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={gusData.vettingStatusComments}
                            onChange={(e) =>
                                setGusData({ ...gusData, vettingStatusComments: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>Next Vetting Reminder Comments</InputLabel>

                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            value={gusData.nextVettingReminderComments}
                            onChange={(e) =>
                                setGusData({ ...gusData, nextVettingReminderComments: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={4}>
                        <InputLabel>Next Vetting Reminder</InputLabel>

                        <TextField
                            fullWidth
                            type="date"
                            value={gusData.nextVettingReminder}
                            onChange={(e) =>
                                setGusData({ ...gusData, nextVettingReminder: e.target.value })
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Stack spacing={2}>
                            <InputLabel>Globex Attachments</InputLabel>

                            {/* Drag and Drop Upload Area */}
                            <Box
                                {...getRootProps()}
                                sx={{
                                    border: '2px dashed',
                                    borderColor: isDragActive ? 'primary.main' : 'divider',
                                    borderRadius: 1,
                                    p: 3,
                                    textAlign: 'center',
                                    bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                                    transition: 'background-color 0.3s, border-color 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                    cursor: 'pointer',
                                }}
                            >
                                <input {...getInputProps()} />
                                <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="body1">
                                    {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to browse'}
                                </Typography>
                            </Box>

                            {/* Drag and Drop area for uploading files */}
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="uploading-attachments">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {attachments.filter(file => file.uploading).map((file, index) => (
                                                <Draggable key={file.name + index} draggableId={file.name + index} index={index}>
                                                    {(provided) => (
                                                        <Box
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            sx={{
                                                                mt: 1,
                                                                p: 1,
                                                                border: '1px solid #ccc',
                                                                borderRadius: 1,
                                                                backgroundColor: '#fafafa',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 2,
                                                            }}
                                                        >
                                                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                                                {file.name}
                                                            </Typography>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={file.uploadProgress}
                                                                sx={{ width: 100 }}
                                                            />
                                                            <CircularProgress size={16} />
                                                        </Box>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            {/* DataGrid for uploaded files */}
                            {uploadedFiles.length > 0 && (
                                <>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Attachments
                                    </Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <DataGrid
                                            rows={uploadedFiles}
                                            columns={columns}
                                            initialState={{
                                            }}
                                            disableRowSelectionOnClick
                                            hideFooter
                                        />
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete this file? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
