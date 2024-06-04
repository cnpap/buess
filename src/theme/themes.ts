import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';
import { theme as sharedTheme } from "@pagopa/mui-italia";

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
      primary: {
        main: '#3f51b5',
      },
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#111',
        paper: '#171717',
      },
      primary: {
        main: '#333',
      },
    },
  }),
};

export default themes;
