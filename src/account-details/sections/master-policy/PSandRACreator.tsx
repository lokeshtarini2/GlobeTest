import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { useState } from "react";

const policyTypes = [
  "Policy Specification",
  "Reinsurance Agreement"
];

const countries = [
  "United States", "Canada", "United Kingdom", "India", "Germany", "France", "Australia"
];

const raTemplates = [
  "Template 1",
  "Template 2",
  "Template 3"
];

export default function PSandRACreator() {
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [raTemplate, setRaTemplate] = useState("");

  const handleGenerateTemplate = () => {
    // Add logic for generating the template based on selections here
    console.log("Generating template for:", type, country, raTemplate);
  };

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Grid container spacing={2} sx={{ m: 0, p: 0 }}>
        {/* Underwriter Section */}
        <Grid size={12} sx={{ m: 0, pl: 0 }}>
          <Typography variant="h6">Document Generator</Typography>
        </Grid>
        <Grid size={4}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            size="small"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a document type
            </MenuItem>
            {policyTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>

        </Grid>

        <Grid size={4}>
          <InputLabel>Country</InputLabel>

          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            size="small"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a country
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>

        </Grid>

        <Grid size={4}>
          <InputLabel>RA Template</InputLabel>

          <Select
            value={raTemplate}
            onChange={(e) => setRaTemplate(e.target.value)}
            fullWidth
            size="small"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a template
            </MenuItem>
            {raTemplates.map((template) => (
              <MenuItem key={template} value={template}>{template}</MenuItem>
            ))}
          </Select>

        </Grid>

        {/* Generate Template Button */}
        <Grid size={12} display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateTemplate}
          >
            Generate Template
          </Button>
        </Grid>
      </Grid>


    </Box>
  );
}
