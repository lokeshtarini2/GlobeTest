import {
    Box,
    Grid,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import { useState } from "react";

export default function CompanyInformation() {
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
        attachments: "",
    });

    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <InputLabel>Company Name</InputLabel>

                        <TextField
                            fullWidth
                            value={gusData.companyName}
                            onChange={(e) =>
                                setGusData({ ...gusData, companyName: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={3}>
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

                    <Grid size={3}>
                        <InputLabel>GUS Executive Summary</InputLabel>

                        <TextField
                            fullWidth

                            value={gusData.executiveSummary}
                            onChange={(e) =>
                                setGusData({ ...gusData, executiveSummary: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={3}>
                        <InputLabel>GND Representative</InputLabel>

                        <TextField
                            fullWidth
                            value={gusData.gndRep}
                            onChange={(e) =>
                                setGusData({ ...gusData, gndRep: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid size={3}>
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

                    <Grid size={3}>
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

                </Grid>
            </Stack>
        </Box>
    );
}
