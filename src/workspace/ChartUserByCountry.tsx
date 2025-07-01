import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';
import type { } from '@mui/material/themeCssVarsAugmentation';

import { Add, Archive, Check, Close, Handshake, QuestionAnswer } from '@mui/icons-material';

const data = [
  { label: 'General Enquiry', value: 50000 },
  { label: 'New', value: 35000 },
  { label: 'Closed', value: 10000 },
  { label: 'Bound', value: 5000 },
  { label: 'Completed', value: 5000 },
  { label: 'Cancelled', value: 5000 },
];

const countries = [
  {
    name: 'General Enquiry',
    value: 50,
    flag: <QuestionAnswer />,
    color: 'hsla(231, 28%, 52%, 0.8)', // Muted Indigo (Primary)
  },
  {
    name: 'New',
    value: 35,
    flag: <Add />,
    color: 'hsla(340, 70%, 55%, 0.8)', // Muted Pink (Secondary)
  },
  {
    name: 'Closed',
    value: 10,
    flag: <Archive />,
    color: 'hsla(0, 65%, 50%, 0.8)',   // Muted Red (Error)
  },
  {
    name: 'Bound',
    value: 5,
    flag: <Handshake />,
    color: 'hsla(122, 25%, 45%, 0.8)', // Muted Green (Success)
  },
  {
    name: 'Completed',
    value: 12,
    flag: <Check />,
    color: 'hsla(207, 80%, 55%, 0.8)', // Muted Blue (Info)
  },
  {
    name: 'Cancelled',
    value: 12,
    flag: <Close />,
    color: 'hsla(36, 90%, 60%, 0.8)',  // Muted Orange (Warning)
  },
];

interface StyledTextProps {
  variant: 'primary' | 'secondary';
}

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextProps>(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

const colors = [
  'hsla(231, 28%, 52%, 0.8)', // Muted Indigo (Primary)
  'hsla(340, 70%, 55%, 0.8)', // Muted Pink (Secondary)
  'hsla(122, 25%, 45%, 0.8)', // Muted Green (Success)
  'hsla(36, 90%, 60%, 0.8)',  // Muted Orange (Warning)
  'hsla(207, 80%, 55%, 0.8)', // Muted Blue (Info)
  'hsla(0, 65%, 50%, 0.8)',   // Muted Red (Error)
];

export default function ChartUserByCountry() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Status
        </Typography>
        <Box sx={{ flexDirection: { sm: 'column', md: 'row' }, alignItems: 'center', display: 'flex', width: '100%' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 30,
              right: 30,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 50,
                outerRadius: 80,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={170}
            width={170}
            slotProps={{
              legend: { hidden: true },
            }}
            sx={{ flexGrow: 2 }}
          >
            <PieCenterLabel primaryText="9,863" secondaryText="Total" />
          </PieChart>
          <Box sx={{ flexGrow: 2, ml: 3 }}>
            {countries.map((country, index) => (
              <Stack
                key={index}
                direction="row"
                sx={{ alignItems: 'center', gap: 2, pb: 2, width: '100%' }}
              >
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                      {country.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {country.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    aria-label="Number of users by country"
                    value={country.value}
                    sx={{
                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: country.color,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
}
