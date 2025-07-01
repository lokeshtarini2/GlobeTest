import { Box } from '@mui/system';
import { useState } from 'react';
import AttachmentGrid from '../../../components/AttachmentGrid';


export default function Attachments() {
  const [scopeType, setScopeType] = useState<'application' | 'country' | ''>('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [attachmentType, setAttachmentType] = useState('');
  const [rows, setRows] = useState<any[]>([]);

  return (
    <Box sx={{ p: 2 }}>
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
    </Box>
  );
}
