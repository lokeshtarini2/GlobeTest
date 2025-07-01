import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { animated, useSpring } from '@react-spring/web';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 190;
const collapsedWidth = 64;

const AnimatedDrawer = animated(Drawer);

export default function SideMenu({ forceCollapsed = false }: { forceCollapsed?: boolean }) {
  const [open, setOpen] = useState(() => {
    if (forceCollapsed) return false;
    const cookie = Cookies.get('sideMenuOpen');
    return cookie === undefined ? true : cookie === 'true';
  });

  // Update cookie whenever open changes
  const handleToggle = () => {
    if (forceCollapsed) return;
    setOpen((prev) => {
      Cookies.set('sideMenuOpen', String(!prev), { expires: 365 });
      return !prev;
    });
  };

  useEffect(() => {
    if (forceCollapsed) setOpen(false);
  }, [forceCollapsed]);

  const styles = useSpring({
    width: open ? drawerWidth : collapsedWidth,
    config: { tension: 250, friction: 30 },
  });

  return (
    <Box sx={{ display: { xs: 'none', md: 'block', borderRadius: 0, p: 0, m: 0 } }}>
      <AnimatedDrawer
        style={styles}
        variant="permanent"
        className="side-menu"
        slotProps={{
          paper: {
            sx: { width: open ? drawerWidth : collapsedWidth },
          }
        }}
        sx={{
          width: '100%',
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        {/* Logo and Toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            py: 2,
            px: 1,
            height: '65px',
          }}
        >
          {open && (

            <Link to="/home"><Box component="img" sx={{ width: '90px', height: 'auto', p: 0.5, mt: 0.5 }} src="/logo.png" alt="Logo" /></Link>

          )}
          {!forceCollapsed && (
            <IconButton sx={{ borderColor: 'transparent' }} onClick={handleToggle} size="small">
              {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
            </IconButton>
          )}
          {forceCollapsed && (
            <Box component="img" src="/fav.png" alt="Collapsed" sx={{ width: 15, height: 15 }} />
          )}
        </Box>
        <Divider />

        {/* Menu */}
        <Box
          sx={{
            overflow: 'auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            m: 0,
            p: 0,
          }}
        >
          <MenuContent collapsed={!open} />
        </Box>
        <Divider />

        {/* Footer */}
        <Stack
          direction="row"
          sx={{
            py: 2,
            px: 2,
            gap: 1,
            alignItems: 'center',
            justifyContent: open ? 'flex-start' : 'center',
          }}
        >
          {open && (
            <>
              <Avatar
                sizes="small"
                alt="John"
                src="/static/images/avatar/7.jpg"
                sx={{ width: 36, height: 36 }}
              />
              <Box
                sx={{
                  mr: 'auto',
                  overflowX: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100px',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    lineHeight: '16px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  John
                </Typography>
              </Box>
            </>
          )}
          <OptionsMenu />
        </Stack>
      </AnimatedDrawer>
    </Box>
  );
}
