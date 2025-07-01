import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const WorkInProgressNotice: React.FC = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 500,
        mt: 4,
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: theme.palette.info.light,
        borderLeft: '6px solid',
        borderColor: theme.palette.info.main,
      }}
    >
      <InfoOutlinedIcon
        sx={{
          mr: 2,
          mt: 0.5,
          color: theme.palette.info.dark,
        }}
        fontSize="large"
      />
      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" gutterBottom>
          This page is under construction
        </Typography>
        <Typography variant="body1">
          We're currently working on this section. Please check back later for updates.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkInProgressNotice;
