import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

function formatSegment(segment: string) {
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    <Typography key="root" variant="body1">
      Globex World
    </Typography>,
    ...pathnames.map((segment: any, index: number) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      const label = formatSegment(segment);

      return isLast ? (
        <Typography
          key={to}
          variant="body1"
          sx={{ color: 'text.primary', fontWeight: 600 }}
        >
          {label}
        </Typography>
      ) : (
        <Link
          key={to}
          component={RouterLink}
          to={to}
          color="inherit"
          variant="body1"
        >
          {label}
        </Link>
      );
    }),
  ];

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs}
    </StyledBreadcrumbs>
  );
}
