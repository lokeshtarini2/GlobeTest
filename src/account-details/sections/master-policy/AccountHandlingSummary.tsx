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
import { useState } from "react";

const peopleNames = [
  "Alice Johnson",
  "Bob Smith",
  "Carol Lee",
  "David Kim",
  "Eva Brown",
  "Frank Zhang"
];

const policyStatuses = [
  "New", "Active", "Enquiry", "Bound", "Cancelled", "Closed", "Completed"
];

const EditableField = ({ label, value, onChange, mode = "edit", type = "text" }: any) => {
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
              type={type}
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

const EditableSelect = ({ label, value, onChange, options, mode = "edit" }: any) => {
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

export default function AccountHandlingSummary() {
  const [formData, setFormData] = useState({
    accountNumber: "ACC-123456",
    targetCompletionDate: "2025-06-30",
    completionDate: "2025-05-01",
    masterPolicyNumber: "MP-987654321",
    uniqueReferenceNumber: "REF-2025-001",
    accountLead: "Alice Johnson",
    gudTeam: "Bob Smith",
    gpaDpt: "Carol Lee",
    gps: "David Kim",
    gpaCt: "Eva Brown",
    policyStatus: "Active"
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <EditableField
            label="Account Number"
            value={formData.accountNumber}
            onChange={handleChange("accountNumber")}
          />
        </Grid>
        <Grid size={4}>
          <EditableField
            label="Target Completion Date"
            type="date"
            value={formData.targetCompletionDate}
            onChange={handleChange("targetCompletionDate")}
          />
        </Grid>
        <Grid size={4}>
          <EditableField
            label="Completion Date"
            type="date"
            value={formData.completionDate}
            onChange={handleChange("completionDate")}
          />
        </Grid>
        <Grid size={4}>
          <EditableField
            label="Master Policy Number"
            value={formData.masterPolicyNumber}
            onChange={handleChange("masterPolicyNumber")}
          />
        </Grid>
        <Grid size={4}>
          <EditableField
            label="Unique Reference Number"
            value={formData.uniqueReferenceNumber}
            onChange={handleChange("uniqueReferenceNumber")}
          />
        </Grid>
        <Grid size={4}>
          <EditableSelect
            label="Account Handling Lead"
            value={formData.accountLead}
            options={peopleNames}
            onChange={handleChange("accountLead")}
          />
        </Grid>
        <Grid size={4}>
          <EditableSelect
            label="GUD Team"
            value={formData.gudTeam}
            options={peopleNames}
            onChange={handleChange("gudTeam")}
          />
        </Grid>
        <Grid size={4}>
          <EditableSelect
            label="GPA-DPT"
            value={formData.gpaDpt}
            options={peopleNames}
            onChange={handleChange("gpaDpt")}
          />
        </Grid>
        <Grid size={4}>
          <EditableSelect
            label="GPS"
            value={formData.gps}
            options={peopleNames}
            onChange={handleChange("gps")}
          />
        </Grid>
        <Grid size={4}>
          <EditableSelect
            label="GPA-CT"
            value={formData.gpaCt}
            options={peopleNames}
            onChange={handleChange("gpaCt")}
          />
        </Grid>
        <Grid size={4}>
          <EditableSelect
            label="Policy Status"
            value={formData.policyStatus}
            options={policyStatuses}
            onChange={handleChange("policyStatus")}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
