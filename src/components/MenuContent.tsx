import {
  Dashboard,
  Home,
  Settings,
  Storage,
  Work
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  useTheme
} from '@mui/material';
import { Link, useLocation } from 'react-router';

const mainListItems = [
  { text: 'Home', link: '/home', icon: <Home /> },
  { text: 'Applications', link: '/applications', icon: <Work /> },
  { text: 'Workspace', link: '/workspace', icon: <Dashboard /> },
  // { text: 'Report', link: '/report', icon: <Assignment /> },
  { text: 'Database', link: '/database', icon: <Storage /> },
  { text: 'Admin', link: '/admin', icon: <Settings /> },
];

export default function MenuContent({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <List sx={{ gap: 0.5 }}>
        {mainListItems.map((item, index) => {
          const isSelected = location.pathname === item.link;

          const button = (
            <ListItemButton
              selected={isSelected}
              sx={{
                height: 40,
                justifyContent: collapsed ? 'center' : 'flex-start',
                mY: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mx: collapsed ? 0 : 0.5,
                  mr: collapsed ? 0 : 0.5,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                />
              )}
            </ListItemButton>
          );

          return (
            <div key={index}>
              <ListItem disablePadding sx={{ display: 'block', borderRadius: '0 !important' }}>
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {collapsed ? (
                    <Tooltip title={item.text} placement="right">
                      {button}
                    </Tooltip>
                  ) : (
                    button
                  )}
                </Link>
              </ListItem>

            </div>
          );
        })}
      </List>
    </Stack>
  );
}
