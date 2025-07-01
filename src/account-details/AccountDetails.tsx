import CssBaseline from '@mui/material/CssBaseline';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import AppTheme from '../shared-theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, treeViewCustomizations } from '../theme/customizations';
import AccountDetailsTabs from './AccountDetailsTabs';



const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};

export default function AccountDetails(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />

      <AccountDetailsTabs />


    </AppTheme>
  );
}
