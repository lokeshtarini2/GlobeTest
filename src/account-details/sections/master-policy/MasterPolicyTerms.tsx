import { Cancel, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

const communicationOptions = ["Phone", "Whatsapp", "WeChat"];

const EditableField = ({ label, value, onChange, mode }: any) => {
  const [editing, setEditing] = useState(mode === "new");
  const [tempValue, setTempValue] = useState(mode === "new" ? "" : value);

  const handleSave = () => {
    onChange(tempValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Box display="flex" alignItems="center" gap={1}>
        {!editing ? (
          <>
            <Typography sx={{ fontWeight: 'bold' }}>{value || "—"}</Typography>
            {mode === "edit" && (
              <IconButton size="small" sx={{ p: 0.1, width: '30px', height: '30px' }} onClick={() => setEditing(true)}>
                <Edit sx={{ fontSize: '12px !important' }} />
              </IconButton>
            )}
          </>
        ) : (
          <>
            <TextField
              fullWidth
              size="small"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            {mode === "edit" && (
              <>
                <IconButton size="small" sx={{ p: 0.1, width: '30px', height: '30px', bgcolor: 'green', color: 'white', '&:hover': { bgcolor: 'darkgreen' } }} onClick={handleSave}>
                  <Save />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.1, width: '30px', height: '30px', bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }} onClick={handleCancel}>
                  <Cancel />
                </IconButton>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

const EditableSelect = ({ label, value, onChange, options, mode }: any) => {
  const [editing, setEditing] = useState(mode === "new");
  const [tempValue, setTempValue] = useState(mode === "new" ? "" : value);

  const handleSave = () => {
    onChange(tempValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Box display="flex" alignItems="center" gap={1}>
        {!editing ? (
          <>
            <Typography sx={{ fontWeight: 'bold' }}>{value || "—"}</Typography>
            {mode === "edit" && (
              <IconButton size="small" sx={{ p: 0.1, width: '30px', height: '30px' }} onClick={() => setEditing(true)}>
                <Edit sx={{ fontSize: '12px !important' }} />
              </IconButton>
            )}
          </>
        ) : (
          <>
            <Select
              fullWidth
              size="small"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            >
              {options.map((opt: string) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
            {mode === "edit" && (
              <>
                <IconButton size="small" sx={{ p: 0.1, width: '30px', height: '30px', bgcolor: 'green', color: 'white', '&:hover': { bgcolor: 'darkgreen' } }} onClick={handleSave}>
                  <Save />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.1, width: '30px', height: '30px', bgcolor: 'red', color: 'white', '&:hover': { bgcolor: 'darkred' } }} onClick={handleCancel}>
                  <Cancel />
                </IconButton>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default function MasterPolicyTerms({ mode = "edit" }: { mode?: "edit" | "new" }) {
  const [fields, setFields] = useState({
    underwriterOrg: "Abcd Insurance",
    underwriterUser: "John Doe",
    underwriterAddress: "123 Market St",
    underwriterPhone: "123-456-7890",
    underwriterAltPhone: "098-765-4321",
    underwriterEmail: "john@globex.com",
    underwriterComm: "Phone",
    insuredOrg: "Beta Corp",
    insuredAddress: "456 Elm St",
    insuredPhone: "321-654-0987",
    insuredAltPhone: "567-890-1234",
    insuredEmail: "contact@globex.com",
    insuredComm: "WeChat"
  });

  const updateField = (key: string, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={5}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h6">Master Policy Insured</Typography>
          </Grid>

          <Grid size={4}>
            <EditableField label="Organization Name" value={fields.insuredOrg} onChange={(v: string) => updateField("insuredOrg", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Address" value={fields.insuredAddress} onChange={(v: string) => updateField("insuredAddress", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Phone Number" value={fields.insuredPhone} onChange={(v: string) => updateField("insuredPhone", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Alternative Phone Number (Cell or Office)" value={fields.insuredAltPhone} onChange={(v: string) => updateField("insuredAltPhone", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableSelect label="Preferred Communication Platform" value={fields.insuredComm} onChange={(v: string) => updateField("insuredComm", v)} options={communicationOptions} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Email" value={fields.insuredEmail} onChange={(v: string) => updateField("insuredEmail", v)} mode={mode} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h6">Master Policy Underwriter(s) and Contacts</Typography>
          </Grid>

          <Grid size={4}>
            <EditableField label="Organization Name" value={fields.underwriterOrg} onChange={(v: string) => updateField("underwriterOrg", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="User" value={fields.underwriterUser} onChange={(v: string) => updateField("underwriterUser", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Address" value={fields.underwriterAddress} onChange={(v: string) => updateField("underwriterAddress", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Phone Number" value={fields.underwriterPhone} onChange={(v: string) => updateField("underwriterPhone", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Alternative Phone Number (Cell or Office)" value={fields.underwriterAltPhone} onChange={(v: string) => updateField("underwriterAltPhone", v)} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableSelect label="Preferred Communication Platform" value={fields.underwriterComm} onChange={(v: string) => updateField("underwriterComm", v)} options={communicationOptions} mode={mode} />
          </Grid>
          <Grid size={4}>
            <EditableField label="Email" value={fields.underwriterEmail} onChange={(v: string) => updateField("underwriterEmail", v)} mode={mode} />
          </Grid>
        </Grid>

      </Stack>
    </Box>
  );
}
