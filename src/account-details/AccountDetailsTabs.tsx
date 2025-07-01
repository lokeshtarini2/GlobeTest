import {
    AttachFile,
    CloudDownload,
    ConfirmationNumber, DragHandle,
    Event,
    EventBusy,
    Gavel,
    Info,
    Keyboard,
    KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Payments,
    PersonAdd,
    Summarize,
    TableChart,
    TableChartRounded,
    ViewList
} from '@mui/icons-material';
import {
    Card,
    Drawer,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Tooltip, useColorScheme
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';


import * as React from 'react';
import { Link, useSearchParams } from 'react-router';
import Flag from 'react-world-flags';


import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from '@hello-pangea/dnd';

import {
    List,
    ListItem,
    ListItemButton
} from '@mui/material';
import { Grid } from '@mui/system';
import { brand, gray } from '../shared-theme/themePrimitives';
import AddContacts from './sections/country-policy/AddContacts';
import ForeignBroker from './sections/country-policy/ForeignBroker';
import GlobexInput from './sections/country-policy/GlobexInput';
import LocalPolicyTerms from './sections/country-policy/LocalPolicyTerms';
import OriginalLocalInsured from './sections/country-policy/OriginalLocalInsured';
import OtherInformation from './sections/country-policy/OtherInformation';
import AccountHandlingSummary from './sections/master-policy/AccountHandlingSummary';
import Attachments from './sections/master-policy/Attachments';
import MAS from './sections/master-policy/MAS';
import MasterPolicyTerms from './sections/master-policy/MasterPolicyTerms';
import PSandRACreator from './sections/master-policy/PSandRACreator';
import SpreadsheetPanel from './SpreadsheetPanel';




const drawerWidth = 190;
const collapsedWidth = 64;

const AnimatedDrawer = animated(Drawer);




export default function AccountDetailsTabs() {

    const { mode } = useColorScheme();

    const [countryTabs, setCountryTabs] = React.useState<{ code: string; label: string }[]>([
        { code: 'ca', label: 'Canada' },
        { code: 'de', label: 'Germany' },
        { code: 'jp', label: 'Japan' },
        { code: 'in', label: 'India' },
        { code: 'cn', label: 'China' },
        { code: 'mx', label: 'Mexico' },
        { code: 'it', label: 'Italy' },
        { code: 'es', label: 'Spain' },
        { code: 'ru', label: 'Russia' },
        { code: 'kr', label: 'South Korea' },
        { code: 'za', label: 'South Africa' },
        { code: 'ng', label: 'Nigeria' },
        { code: 'eg', label: 'Egypt' },
        { code: 'tr', label: 'Turkey' },
        { code: 'id', label: 'Indonesia' },
        { code: 'pk', label: 'Pakistan' },
        { code: 'bd', label: 'Bangladesh' },
        { code: 'vn', label: 'Vietnam' },
        { code: 'ph', label: 'Philippines' },
        { code: 'th', label: 'Thailand' },
        { code: 'my', label: 'Malaysia' },
        { code: 'sg', label: 'Singapore' },
        { code: 'nz', label: 'New Zealand' },
        { code: 'sa', label: 'Saudi Arabia' },
        { code: 'ae', label: 'United Arab Emirates' },
    ]);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || 'Unknown';
    const [selectedCountry, setSelectedCountry] = React.useState<string>('ca');
    const [company, setCompany] = React.useState('');
    const [activeTabSet, setActiveTabSet] = React.useState<'masterPolicy' | 'country' | 'fileContent'>('masterPolicy');
    const [filterText, setFilterText] = useState('');
    const [viewMode, setViewMode] = useState<any>('list');


    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reordered = Array.from(countryTabs);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);

        setCountryTabs(reordered);
    };


    const fileContentTabs = [
        { label: 'Account Handling Summary', icon: <Summarize sx={{ fontSize: '1rem' }} /> },
        { label: 'PS & RA Creator', icon: <CloudDownload sx={{ fontSize: '1rem' }} /> },
        { label: 'MAS', icon: <TableChart sx={{ fontSize: '1rem' }} /> },
        { label: 'Attachments', icon: <AttachFile sx={{ fontSize: '1rem' }} /> }
    ];
    const masterPolicyTabs = [
        { label: 'Master Policy Terms', icon: <Gavel sx={{ fontSize: '1rem' }} /> },
    ];
    const countryTabsList = [
        { label: 'Original Local Insured', icon: <Event sx={{ fontSize: '1rem' }} /> },
        { label: 'Foreign Broker', icon: <Payments sx={{ fontSize: '1rem' }} /> },
        { label: 'Local Policy Terms', icon: <ConfirmationNumber sx={{ fontSize: '1rem' }} /> },
        { label: 'Other Information', icon: <Info sx={{ fontSize: '1rem' }} /> },
        { label: 'Add Contacts', icon: <PersonAdd sx={{ fontSize: '1rem' }} /> },
        { label: 'Globex Input', icon: <Keyboard sx={{ fontSize: '1rem' }} /> }
    ];

    const [masterPolicyTabIndex, setMasterPolicyTabIndex] = React.useState(0);
    const [countryTabIndex, setCountryTabIndex] = React.useState(0);

    const allCountries = [
        { code: 'us', label: 'United States' },
        { code: 'gb', label: 'United Kingdom' },
        { code: 'fr', label: 'France' },
        { code: 'br', label: 'Brazil' },
        { code: 'au', label: 'Australia' },
        { code: 'ar', label: 'Argentina' },
        { code: 'cl', label: 'Chile' },
        { code: 'co', label: 'Colombia' },
        { code: 'pe', label: 'Peru' },
        { code: 'uy', label: 'Uruguay' },
    ];

    const [open, setOpen] = useState(true);

    const handleViewModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newViewMode: 'spreadsheet' | 'list' | null
    ) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };


    const styles = useSpring({
        width: viewMode === 'spreadsheet' ? 0 : (open ? drawerWidth : collapsedWidth),
        config: { tension: 250, friction: 30 },
    });

    return (
        <Box >
            {/* Only render the drawer if not in spreadsheet view */}
            {viewMode !== 'spreadsheet' && (
                <AnimatedDrawer
                    style={styles}
                    variant="permanent"
                    slotProps={{
                        paper: {
                            sx: { width: open ? drawerWidth : collapsedWidth, height: viewMode === 'spreadsheet' ? 60 : '100%' },
                        }
                    }}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        height: viewMode === 'spreadsheet' ? 65 : '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: open ? 'space-between' : 'center',
                            p: 0,
                            px: 1,
                            height: '65px',
                            minHeight: '65px',
                            maxHeight: '65px',
                            boxSizing: 'border-box',
                            width: '100%',
                        }}
                    >
                        {open && (
                            <Link to="/home">
                                <Box
                                    component="img"
                                    sx={{
                                        width: '90px',
                                        height: 'auto',
                                        p: 0.5,
                                        mt: 0.5,
                                        maxHeight: '48px',
                                    }}
                                    src="/logo.png"
                                    alt="Logo"
                                />
                            </Link>
                        )}
                        <IconButton onClick={() => setOpen(prev => !prev)} size="small">
                            {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
                        </IconButton>
                    </Box>
                    <Divider />
                    {/* Hide the rest of the panel in spreadsheet view */}
                    {viewMode === 'list' && (
                        <Stack spacing={1} sx={{ px: 1, py: 0 }}>
                            <Box>
                                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }} spacing={1}>
                                    {/* Toggle Buttons for Master Policy and File Content */}
                                    <ToggleButton
                                        value="masterPolicy"
                                        selected={activeTabSet === 'masterPolicy' && viewMode !== 'spreadsheet'}
                                        onClick={() => {
                                            setActiveTabSet('masterPolicy');
                                            setSelectedCountry(''); // Deselect country when Master Policy is selected
                                            if (viewMode === 'spreadsheet') setViewMode('list');
                                        }}
                                        sx={{
                                            minWidth: 0,
                                            py: 1,
                                            width: '100%',
                                            height: 40,
                                            fontSize: '1rem',
                                            backgroundColor: activeTabSet === 'masterPolicy' && viewMode !== 'spreadsheet' ? brand[300] : undefined,
                                            fontWeight: activeTabSet === 'masterPolicy' && viewMode !== 'spreadsheet' ? 700 : 500,
                                            '&:hover': {
                                                backgroundColor: activeTabSet === 'masterPolicy' && viewMode !== 'spreadsheet' ? brand[300] : undefined,
                                            },
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {open ? <><Gavel sx={{ fontSize: '1.2rem', mr: 1 }} /> Master Policy</> : <Gavel sx={{ fontSize: '1.2rem' }} />}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="fileContent"
                                        selected={activeTabSet === 'fileContent' && viewMode !== 'spreadsheet'}
                                        onClick={() => {
                                            setActiveTabSet('fileContent');
                                            setSelectedCountry(''); // Deselect country when File Content is selected
                                            if (viewMode === 'spreadsheet') setViewMode('list');
                                        }}
                                        sx={{
                                            minWidth: 0,
                                            py: 1,
                                            width: '100%',
                                            height: 40,
                                            fontSize: '1rem',
                                            backgroundColor: activeTabSet === 'fileContent' && viewMode !== 'spreadsheet' ? brand[300] : undefined,
                                            fontWeight: activeTabSet === 'fileContent' && viewMode !== 'spreadsheet' ? 700 : 500,
                                            '&:hover': {
                                                backgroundColor: activeTabSet === 'fileContent' && viewMode !== 'spreadsheet' ? brand[300] : undefined,
                                            },
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {open ? <><Summarize sx={{ fontSize: '1.2rem', mr: 1 }} /> File Content</> : <Summarize sx={{ fontSize: '1.2rem' }} />}
                                    </ToggleButton>
                                </Stack>
                            </Box>
                            <Stack direction={"row"} spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 1 }}>
                                {open && (
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        placeholder="Search countries"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                        sx={{ input: { color: 'white', height: 40, boxSizing: 'border-box' }, pt: -1, '& .MuiInputBase-input::placeholder': { color: 'white' }, height: 40 }}
                                    />
                                )}


                                <Select
                                    displayEmpty
                                    value=""
                                    color="secondary"

                                    onChange={(e) => {
                                        const selectedCode = e.target.value;
                                        const country = allCountries.find((c) => c.code === selectedCode);
                                        if (country && !countryTabs.find((tab) => tab.code === selectedCode)) {
                                            setCountryTabs((prev) => [...prev, country]);
                                        }
                                    }}
                                    renderValue={() => (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                            Add
                                        </Box>
                                    )}
                                    IconComponent={() => null}
                                    sx={(theme) => ({
                                        width: 50,
                                        pl: 2,
                                        textAlign: 'center',
                                        height: 40,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[700],
                                        border: `1px solid ${theme.palette.grey[600]}`,
                                        boxShadow: 0,
                                        '&:hover': {
                                            backgroundColor: theme.palette.grey[600],
                                            boxShadow: 0,
                                            border: `1px solid ${theme.palette.grey[600]}`,
                                        },
                                    })}
                                >
                                    {allCountries
                                        .filter((country) => !countryTabs.some(tab => tab.code === country.code))
                                        .map((country) => (
                                            <MenuItem key={country.code} value={country.code}>
                                                <Flag code={country.code.toUpperCase()} style={{ width: 25 }} />
                                                <Typography sx={{ ml: 1 }}>{country.label}</Typography>
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Stack>

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="countryTabs" >
                                    {(provided) => (
                                        <List
                                            dense
                                            sx={{
                                                m: 0,
                                                p: 0,
                                                gap: 0.5,
                                                maxHeight: '100%', // Remove scrolling, let the sidebar grow
                                                overflowY: 'visible', // No scroll
                                            }}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {countryTabs
                                                .filter(country => country.label.toLowerCase().includes(filterText.toLowerCase()))
                                                .map((country, index) => (

                                                    <Draggable key={country.code} draggableId={country.code} index={index}>
                                                        {(providedDraggable) => (
                                                            <ListItem
                                                                disablePadding
                                                                sx={{ m: 0, p: 0, gap: 0 }}
                                                                ref={providedDraggable.innerRef}
                                                                {...providedDraggable.draggableProps}
                                                                {...providedDraggable.dragHandleProps}
                                                            >
                                                                <ListItemButton
                                                                    selected={activeTabSet === 'country' && selectedCountry === country.code}
                                                                    onClick={() => {
                                                                        setSelectedCountry(country.code);
                                                                        setActiveTabSet('country');
                                                                    }}
                                                                >
                                                                    <ListItemText
                                                                        primary={
                                                                            <Tooltip title={open ? "" : country.label} disableHoverListener={open} placement="right">
                                                                                <Stack
                                                                                    direction="row"
                                                                                    spacing={1}
                                                                                    alignItems="center"
                                                                                    justifyContent={open ? "flex-start" : "center"}
                                                                                >
                                                                                    <Avatar sx={{ width: 30, height: 30, m: 0, p: 0, overflow: 'hidden' }}>
                                                                                        <Flag code={country.code.toUpperCase()} style={{ width: '70%', height: '70%' }} />
                                                                                    </Avatar>
                                                                                    {open && <Typography sx={{ color: '#FFF !important' }}>{country.label}</Typography>}
                                                                                </Stack>
                                                                            </Tooltip>
                                                                        }
                                                                    />
                                                                    {open && <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}><DragHandle fontSize="small" /></Box>}
                                                                </ListItemButton>
                                                            </ListItem>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Stack>
                    )}
                </AnimatedDrawer>
            )}

            <Grid
                sx={{
                    top: 65,
                    left: viewMode === 'spreadsheet' ? 0 : (open ? '190px' : '65px'),
                    position: 'relative',
                    zIndex: 1000,
                    width: viewMode === 'spreadsheet' ? '100%' : (open ? 'calc(100% - 190px)' : 'calc(100% - 65px)'),
                    overflow: 'hidden'
                }}
            >

                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            zIndex: 1200,
                            width: viewMode === 'spreadsheet' ? '100%' : (open ? 'calc(100% - 190px)' : 'calc(100% - 65px)'),
                            background: mode === 'dark' ? `linear-gradient(180deg, ${gray[800]} 0%, ${gray[900]} 400%)` : `linear-gradient(180deg, ${gray[100]} 0%, ${gray[200]} 500%)`,
                            borderBottom: `1px solid ${mode === 'dark' ? gray[700] : gray[200]}`,
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            height: 65,

                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>

                            <Stack direction="column">

                                {viewMode === 'spreadsheet' ? (
                                    <Typography variant="h6">
                                        Spreadsheet View
                                    </Typography>
                                ) : (
                                    <>
                                        {activeTabSet === 'country' && selectedCountry && (
                                            <Stack direction="row" alignItems="center">
                                                <Flag code={selectedCountry.toUpperCase()} style={{ width: '20px', height: '15px' }} />
                                                <Typography variant="h6" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                                    {countryTabs.find((country) => country.code === selectedCountry)?.label || 'Unknown Country'}
                                                </Typography>
                                            </Stack>
                                        )}
                                        {activeTabSet === 'masterPolicy' && (
                                            <Typography variant="h6">
                                                Master Policy
                                            </Typography>
                                        )}
                                        {activeTabSet === 'fileContent' && (
                                            <Typography variant="h6">
                                                File Content
                                            </Typography>
                                        )}
                                    </>
                                )}
                                {searchParams.get('partnerMarket') && searchParams.get('coverage') && (
                                    <Typography variant="caption">
                                        {searchParams.get('coverage')} • {searchParams.get('partnerMarket')}
                                    </Typography>
                                )}
                            </Stack>
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                            {[
                                {
                                    icon: <Event sx={{ fontSize: '1rem' }} />,
                                    label: "Start Date",
                                    value: "08/12/2022",
                                    color: mode === 'dark' ? gray[700] : '#1976d2'
                                },
                                {
                                    icon: <EventBusy sx={{ fontSize: '1rem' }} />,
                                    label: "End Date",
                                    value: "08/12/2026",
                                    color: mode === 'dark' ? gray[700] : '#2e7d32'
                                },
                                {
                                    icon: <ConfirmationNumber sx={{ fontSize: '1rem' }} />,
                                    label: "Ref. Number",
                                    value: "MBLH6490L",
                                    color: mode === 'dark' ? gray[700] : '#d32f2f'
                                },
                                {
                                    icon: <Payments sx={{ fontSize: '1rem' }} />,
                                    label: "Premium",
                                    value: "USD 1,000,000",
                                    color: mode === 'dark' ? gray[700] : '#ed6c02'
                                }
                            ].map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        m: 0,
                                        p: 0,
                                        height: '45px',
                                        width: '100px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        backgroundColor: mode === 'dark' ? gray[900] : `${item.color}10`,
                                        border: `0.5px solid ${item.color}`,
                                        transition: 'transform 0.2s ease-in-out',
                                    }}
                                >
                                    <Stack
                                        spacing={0.3}
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Stack direction="row" spacing={0.3} justifyContent="center" alignItems="center">
                                            {item.icon}
                                            <Typography variant="caption" sx={{ fontWeight: 400, color: 'text.secondary', fontSize: '0.7rem' }}>
                                                {item.label}
                                            </Typography>
                                        </Stack>
                                        <Divider sx={{ width: '100%' }} />
                                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                                            {item.value}
                                        </Typography>
                                    </Stack>
                                </Card>
                            ))}
                            <Select
                                value={company}
                                onChange={handleChange}
                                displayEmpty
                                sx={{
                                    height: '45px',

                                    backgroundColor: mode === 'dark' ? gray[900] : `${gray[200]}`,
                                    border: `0.5px solid ${mode === 'dark' ? gray[700] : gray[400]}`,
                                    textAlign: 'center',
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                    },
                                }}
                            >
                                <ListSubheader sx={{ fontSize: '0.7rem', fontWeight: 400 }}>Current</ListSubheader>
                                <MenuItem value="">
                                    <ListItemText
                                        primary="March 2025"
                                        secondary={`Account ${id}`}
                                        primaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 600 }}
                                        secondaryTypographyProps={{ fontSize: '0.6rem', fontWeight: 400 }}
                                    />
                                </MenuItem>
                                <Divider sx={{ mx: -1 }} />
                                <ListSubheader sx={{ fontSize: '0.7rem', fontWeight: 400 }}>Previous</ListSubheader>
                                <MenuItem value={10}>
                                    <ListItemText
                                        primary="March 2024"
                                        secondary="Account 4897"
                                        primaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 600 }}
                                        secondaryTypographyProps={{ fontSize: '0.6rem', fontWeight: 400 }}
                                    />
                                </MenuItem>
                                <MenuItem value={20}>
                                    <ListItemText
                                        primary="March 2023"
                                        secondary="Account 6578"
                                        primaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 600 }}
                                        secondaryTypographyProps={{ fontSize: '0.6rem', fontWeight: 400 }}
                                    />
                                </MenuItem>
                            </Select>

                            {/* Toggle Button for List/Spreadsheet View */}
                            <Stack direction="row" spacing={2}>
                                <ToggleButtonGroup
                                    value={viewMode}
                                    exclusive
                                    onChange={handleViewModeChange}
                                    aria-label="view mode toggle"

                                >
                                    <Tooltip title="List View" arrow>
                                        <ToggleButton value="list" aria-label="list view" sx={{ py: 1.2 }}>
                                            <ViewList sx={{ color: viewMode === 'list' ? 'black' : undefined }} />
                                        </ToggleButton>
                                    </Tooltip>
                                    <Tooltip title="Spreadsheet View" arrow>
                                        <ToggleButton value="spreadsheet" aria-label="spreadsheet view" sx={{ py: 1.2 }}>
                                            <TableChartRounded sx={{ color: viewMode === 'spreadsheet' ? 'black' : undefined }} />
                                        </ToggleButton>
                                    </Tooltip>
                                </ToggleButtonGroup>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box sx={{ pt: viewMode === 'spreadsheet' ? 0 : 1, px: viewMode === 'spreadsheet' ? 0 : 1.5, width: '100%', overflow: 'hidden' }}>
                        {/* Show SpreadsheetPanel if in spreadsheet view, else show tabs as before */}
                        {viewMode === 'spreadsheet' ? (
                            <SpreadsheetPanel />
                        ) : (
                            <>
                                {activeTabSet === 'fileContent' && (
                                    <Tabs value={masterPolicyTabIndex} onChange={(e, newValue) => setMasterPolicyTabIndex(newValue)}>
                                        {fileContentTabs.map((tab, index) => (
                                            <Tab
                                                key={index}
                                                label={tab.label}
                                                icon={tab.icon}
                                                iconPosition="start"
                                                value={index}
                                            />
                                        ))}
                                    </Tabs>
                                )}
                                {activeTabSet === 'country' && (
                                    <Tabs value={countryTabIndex} onChange={(e, newValue) => setCountryTabIndex(newValue)}>
                                        {countryTabsList.map((tab, index) => (
                                            <Tab
                                                key={index}
                                                label={tab.label}
                                                icon={tab.icon}
                                                iconPosition="start"
                                                value={index}
                                            />
                                        ))}
                                    </Tabs>
                                )}
                                {/* No tabs for masterPolicy */}
                                {activeTabSet === 'masterPolicy' && null}
                                <Box >
                                    {activeTabSet === 'masterPolicy' && <MasterPolicyTerms />}
                                    {activeTabSet === 'fileContent' && (
                                        <>
                                            {masterPolicyTabIndex === 0 && <AccountHandlingSummary />}
                                            {masterPolicyTabIndex === 1 && <PSandRACreator />}
                                            {masterPolicyTabIndex === 2 && <MAS />}
                                            {masterPolicyTabIndex === 3 && <Attachments />}
                                        </>
                                    )}
                                    {activeTabSet === 'country' && (
                                        <>
                                            {countryTabIndex === 0 && <OriginalLocalInsured />}
                                            {countryTabIndex === 1 && <ForeignBroker />}
                                            {countryTabIndex === 2 && <LocalPolicyTerms />}
                                            {countryTabIndex === 3 && <OtherInformation />}
                                            {countryTabIndex === 4 && <AddContacts />}
                                            {countryTabIndex === 5 && <GlobexInput />}
                                        </>
                                    )}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

