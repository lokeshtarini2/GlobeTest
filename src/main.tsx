import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AccountDetails from './account-details/AccountDetails';
import Admin from './admin/Admin';
import Database from './database/Database';
import NPToken from './database/NetworkPartnerView';
import Home from './home/Home';
import Login from './login/Login';
import Profile from './profile/Profile';
import Report from './report/Report';
import theme from './theme';
import Workspace from './workspace/Workspace';
import AccountNew from './account-details/AccountNew';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/applications" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/report" element={<Report />} />
          <Route path="/database" element={<Database />} />
          <Route path="/database/token" element={<NPToken />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications/details" element={<AccountDetails />} />
          <Route path="/applications/new" element={<AccountNew />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);