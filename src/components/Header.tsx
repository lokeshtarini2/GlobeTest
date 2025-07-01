import Stack from '@mui/material/Stack';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';



export default function Header() {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '100%',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          pt: 1.5,
        }}
        spacing={1}
      >
        <NavbarBreadcrumbs />

        <Stack direction="row" sx={{ gap: 1 }}>
          <ColorModeIconDropdown />
        </Stack>
      </Stack>
  
    </>
  );
}
