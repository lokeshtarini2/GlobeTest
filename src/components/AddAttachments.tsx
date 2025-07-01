import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import AttachmentGrid from './AttachmentGrid';

interface AddAttachmentProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddAttachments({ open, handleClose }: AddAttachmentProps) {
  const [scopeType, setScopeType] = useState<'application' | 'country' | ''>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [attachmentType, setAttachmentType] = useState<string>('');
  const [rows, setRows] = useState<any[]>([]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Attachments</DialogTitle>
      <DialogContent>
        <AttachmentGrid
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