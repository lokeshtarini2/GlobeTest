import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import PublicRoundedIcon from '@mui/icons-material/Public';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});


interface SelectAttachmentProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
  }
  
  export default function SelectAttachment({ value, onChange }: SelectAttachmentProps) {
    return (
      <Select
        value={value}
        onChange={onChange}
        fullWidth
        labelId="custom-select"
      id="custom-select"

      inputProps={{ 'aria-label': 'Select item' }}
      
      sx={{
        minWidth: 215,
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
        },
      }}
      >
        <ListSubheader sx={{ pt: 0 }}>Account</ListSubheader>
        <MenuItem value="account">
          <ListItemAvatar>
            <Avatar>
              <AttachFileRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Master Policy Attachment"
            secondary="Add attachment to account"
          />
        </MenuItem>
  
        <ListSubheader>Placement</ListSubheader>
        <MenuItem value="el-salvador">
          <ListItemAvatar>
            <Avatar>
              <PublicRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="El Salvador" />
        </MenuItem>
        <MenuItem value="saudi-arabia">
          <ListItemAvatar>
            <Avatar>
              <PublicRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Saudi Arabia" />
        </MenuItem>
        <MenuItem value="mexico">
          <ListItemAvatar>
            <Avatar>
              <PublicRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Mexico" />
        </MenuItem>
      </Select>
    );
  }