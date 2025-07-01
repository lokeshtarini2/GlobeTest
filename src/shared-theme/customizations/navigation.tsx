import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { alpha, Components, Theme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { tabClasses } from '@mui/material/Tab';
import * as React from 'react';
import { brand, gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const navigationCustomizations: Components<Theme> = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        padding: '6px 8px',
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: '0px',
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
      },
      paper: ({ theme }) => ({
        marginTop: '4px',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },

  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: '1px solid',
        borderColor: gray[200],
        backgroundColor: (theme.vars || theme).palette.background.paper,
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        '&:hover': {
          borderColor: gray[300],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: 'none',
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        '&:before, &:after': {
          display: 'none',
        },

        ...theme.applyStyles('dark', {
          borderRadius: (theme.vars || theme).shape.borderRadius,
          borderColor: gray[700],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
          '&:hover': {
            borderColor: alpha(gray[700], 0.7),
            backgroundColor: (theme.vars || theme).palette.background.paper,
            boxShadow: 'none',
          },
          [`&.${selectClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[900],
          },
          '&:before, &:after': {
            display: 'none',
          },
        }),
      }),
      select: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        ...theme.applyStyles('dark', {
          display: 'flex',
          alignItems: 'center',
          '&:focus-visible': {
            backgroundColor: gray[900],
          },
        }),
      }),
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500,
        position: 'relative',
        textDecoration: 'none',
        width: 'fit-content',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: 0,
          left: 0,
          backgroundColor: (theme.vars || theme).palette.text.secondary,
          opacity: 0.3,
          transition: 'width 0.3s ease, opacity 0.3s ease',
        },
        '&:hover::before': {
          width: 0,
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '4px',
          borderRadius: '2px',
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {

      root: ({ theme }) => ({
        '& .MuiDrawer-paper': {
          background: `linear-gradient(180deg, ${gray[800]} 0%, ${gray[600]} 500%)`,
          color: '#fff',
          '& *': {
            color: '#fff', // ensures all child elements inherit white text
            '& .MuiButtonBase-root.Mui-selected': {
              backgroundColor: brand[500],
              color: '#fff',
              '&:hover': {
                backgroundColor: brand[600],
              },
            },
          },
          '& .MuiDrawer-docked': {
            backgroundColor: gray[900],
            color: '#fff',
          },
          '& .MuiDivider-root': {
            borderColor: alpha('#fff', 0.12),
          },
          '& .MuiSvgIcon-root': {
            color: '#fff',
          },
          '& .MuiIconButton-root': {
            color: '#fff',
            border: `1px solid ${alpha('#fff', 0.12)}`,
            backgroundColor: 'transparent',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'transparent',
              borderRadius: '50%',
              border: `1px solid ${alpha('#fff', 0.2)}`,
            }
          },
          '& .MuiPopover-root': {
            color: '#fff',
            backgroundColor: gray[900],
            '&:hover': {
              backgroundColor: alpha('#fff', 0.08),
            },
          },

          '& .MuiListItem-root': {
            color: '#fff',
            borderRadius: (theme.vars || theme).shape.borderRadius,
            '&:hover': {
              backgroundColor: alpha(brand[900], 0.15),
            },
          },
          '& .MuiListItemIcon-root': {
            color: '#fff',
          },
          '& .MuiListItemText-root': {
            color: '#fff',
          },
        },


      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },
        ...theme.applyStyles('dark', {
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: (theme.vars || theme).palette.grey[50],
          },
        }),
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 'fit-content',
        borderBottom: 'none',
        paddingBottom: '6px',
        ...theme.applyStyles('dark', {
          borderBottom: 'none',
        }),
      }),
      indicator: ({ theme }) => ({
        backgroundColor: 'transparent',
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 18px',
        textTransform: 'none',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        borderRadius: 25,
        marginRight: 7,
        fontWeight: 500,
        color: (theme.vars || theme).palette.text.secondary,
        transition: 'all 0.2s ease',
        ':hover': {
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        [`&.${tabClasses.selected}`]: {
          color: gray[900],
          backgroundColor: gray[100],
          fontWeight: 700,
        },
        ...theme.applyStyles('dark', {
          ':hover': {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
          [`&.${tabClasses.selected}`]: {
            color: '#fff',
            backgroundColor: gray[700],
          },
        }),
      }),
    },
  },


  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: '1px solid',
        borderColor: (theme.vars || theme).palette.divider,
        flex: 1,
        borderRadius: '99px',
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'transparent',
        border: `1px solid ${gray[400]}`,
        width: 12,
        height: 12,
        borderRadius: '50%',
        '& text': {
          display: 'none',
        },
        '&.Mui-active': {
          border: 'none',
          color: (theme.vars || theme).palette.primary.main,
        },
        '&.Mui-completed': {
          border: 'none',
          color: (theme.vars || theme).palette.success.main,
        },
        ...theme.applyStyles('dark', {
          border: `1px solid ${gray[700]}`,
          '&.Mui-active': {
            border: 'none',
            color: (theme.vars || theme).palette.primary.light,
          },
          '&.Mui-completed': {
            border: 'none',
            color: (theme.vars || theme).palette.success.light,
          },
        }),
        variants: [
          {
            props: { completed: true },
            style: {
              width: 12,
              height: 12,
            },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-completed': {
          opacity: 0.6,
          ...theme.applyStyles('dark', { opacity: 0.5 }),
        },
      }),
    },
  },
};
