import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import RAFileGrid from './RAFileGrid';

interface AddAttachmentProps {
  open: boolean;
  handleClose: () => void;
}

export default function UploadRAFileDialog({ open, handleClose }: AddAttachmentProps) {
  const [scopeType, setScopeType] = useState<'application' | 'country' | ''>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [attachmentType, setAttachmentType] = useState<string>('');
  const [rows, setRows] = useState<any[]>([]);

  return (
    <Dialog open={open} onClose={handleClose} sx={{ minWidth: 800 }}>
      <DialogTitle>Upload RA Files</DialogTitle>
      <DialogContent>
        <RAFileGrid
          scopeType={scopeType}
          selectedCountry={selectedCountry}
          setScopeType={setScopeType}
          setSelectedCountry={setSelectedCountry}
          attachmentType={attachmentType}
          setAttachmentType={setAttachmentType}
          rows={rows}
          setRows={setRows}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button variant="contained" onClick={handleClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}