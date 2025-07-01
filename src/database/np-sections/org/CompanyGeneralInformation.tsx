import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
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

export const CompanyGeneralInformation = () => {
    const [companyData, setCompanyData] = useState({
        name: "",
        country: "",
        address: "",
        website: "",
        phone: "",
        established: "",
        type: "",
        parentCompany: "",
        network: "",
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

    const countries = [
        "United States", "Canada", "United Kingdom", "France", "Germany",
        "Australia", "India", "China", "Japan", "Mexico",
        "Brazil", "South Africa", "Italy", "Spain", "Netherlands",
        "Sweden", "Norway", "Denmark", "Switzerland", "Russia",
    ];

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
                    <Grid size={3}>
                        <InputLabel>Company Name</InputLabel>
                        <TextField
                            fullWidth
                            value={companyData.name}
                            onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid size={3}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            fullWidth
                            value={companyData.country}
                            onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                            input={<OutlinedInput />}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Country</MenuItem>
                            {countries.map((c) => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid size={3}>
                        <InputLabel>Address</InputLabel>
                        <TextField
                            fullWidth
                            value={companyData.address}
                            onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                        />
                    </Grid>
                    <Grid size={3}>

                        <InputLabel>Company Website</InputLabel>
                        <TextField
                            fullWidth
                            value={companyData.website}
                            onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                        />
                    </Grid>
                    <Grid size={3}>
                        <InputLabel>Company Main Phone Number</InputLabel>
                        <TextField
                            fullWidth
                            value={companyData.phone}
                            onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>When was your company established?</InputLabel>
                        <TextField
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={companyData.established}
                            onChange={(e) => setCompanyData({ ...companyData, established: e.target.value })}
                        />
                    </Grid>
                    <Grid size={3}>
                        <InputLabel>Is your company public or private?</InputLabel>
                        <Select
                            fullWidth
                            value={companyData.type}
                            onChange={(e) => setCompanyData({ ...companyData, type: e.target.value })}
                            input={<OutlinedInput />}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Type</MenuItem>
                            <MenuItem value="Public">Public</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                        </Select>
                    </Grid>
                    <Grid size={3}>
                        <InputLabel>Parent Company (if any)</InputLabel>
                        <TextField
                            fullWidth
                            value={companyData.parentCompany}
                            onChange={(e) => setCompanyData({ ...companyData, parentCompany: e.target.value })}
                        />
                    </Grid>
                    <Grid size={3}>
                        <InputLabel>Belongs to a Network?</InputLabel>
                        <Select
                            fullWidth
                            value={companyData.network}
                            onChange={(e) => setCompanyData({ ...companyData, network: e.target.value })}
                            input={<OutlinedInput />}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select</MenuItem>
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </Grid>
                    <Grid size={12}>
                        <Stack spacing={2}>
                            <InputLabel>Company Materials (PDFs, Presentations, etc.)</InputLabel>

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
};
