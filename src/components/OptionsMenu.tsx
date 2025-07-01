import * as React from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from './MenuButton';
import { Link } from 'react-router';

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  margin: '0px 0',
  color: theme.palette.common.white,
  borderRadius: '0px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[700], 0.3),
  },
}));

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${paperClasses.root}`]: {
            bgcolor: theme.palette.grey[900], // Dark background
            color: theme.palette.common.white,
            borderColor: alpha(theme.palette.grey[700], 0.7),
          },
          [`& .${listClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: 0,
            borderColor: alpha(theme.palette.grey[700], 0.7),
          },
        }}
      >
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Divider />
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem
            onClick={handleClose}
            sx={{
              [`& .${listItemIconClasses.root}`]: {
                ml: '15px',
                minWidth: 0,
                color: theme.palette.common.white,
              },
            }}
          >
            <ListItemText primaryTypographyProps={{ style: { color: theme.palette.common.white } }}>
              Logout
            </ListItemText>
            <ListItemIcon>
              <LogoutRoundedIcon fontSize="small" sx={{ color: theme.palette.common.white }} />
            </ListItemIcon>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
