import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450, display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
    >

      <div>
        <Box component="img" sx={{ width: '180px' }} src="/logo.png" alt="Logo" />

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Donec velit nunc, sodales ac nisi ut, facilisis efficitur ligula.
        </Typography>
      </div>


    </Stack>
  );
}
