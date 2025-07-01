import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Copyright(props: any) {
  return (
    <Box sx={{ p: 2 }} >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, gap: 2 }}>
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Contact Us</Link>
      </Box>
      <Typography
        variant="body2"
        align="center"
        {...props}
        sx={[
          {
            color: 'text.secondary',
          },
        ]}
      >
        {'Copyright © '}
        {new Date().getFullYear()}
        {' Globex Underwriting Services. All rights reserved.'}
      </Typography>
    </Box >
  );
}
