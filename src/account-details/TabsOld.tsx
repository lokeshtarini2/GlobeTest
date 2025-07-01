import {
    AccountTree,
    AttachFile,
    ConfirmationNumber,
    ContactPage,
    Description,
    Event,
    EventBusy,
    FileCopy,
    GroupAdd,
    Home,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
    Language,
    Payments,
    People,
    Policy
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CircularProgress,
    Divider,
    Drawer,
    IconButton,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    useColorScheme
} from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { Grid, Stack } from '@mui/system';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
    TreeItem2Content,
    TreeItem2IconContainer,
    TreeItem2Label,
    TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { unstable_useTreeItem2 as useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import * as React from 'react';
import { Link, useSearchParams } from 'react-router';
import Flag from 'react-world-flags';
import { gray } from '../shared-theme/themePrimitives';



interface CustomTreeViewBaseItem extends Omit<TreeViewBaseItem, 'children'> {
    url?: string;
    icon?: React.ReactNode;
    children?: CustomTreeViewBaseItem[];
}

const ITEMS: CustomTreeViewBaseItem[] = [
    {
        id: '1',
        label: 'Master Policy',
        children: [
            {
                id: '1.1',
                label: 'Master Policy Terms',
                url: './sections/master-policy/MasterPolicyTerms',
                icon: <Description fontSize="small" />,
            },
            {
                id: '1.3',
                label: 'Account Handling Summary',
                url: './sections/master-policy/AccountHandlingSummary',
                icon: <AccountTree fontSize="small" />,
            },
            {
                id: '1.4',
                label: 'PS & RA Creator',
                url: './sections/master-policy/PSandRACreator',
                icon: <Policy fontSize="small" />,
            },
            {
                id: '1.5',
                label: 'MAS',
                url: './sections/master-policy/MAS',
                icon: <Language fontSize="small" />,
            },
            {
                id: '1.6',
                label: 'Attachments',
                url: './sections/master-policy/Attachments',
                icon: <AttachFile fontSize="small" />,
            },
        ],
    },
    {
        id: '2',
        label: 'Country Policy',
        children: [
            {
                id: '2.1',
                label: 'Original Local Insured',
                url: './sections/country-policy/OriginalLocalInsured',
                icon: <People fontSize="small" />,
            },
            {
                id: '2.2',
                label: 'Foreign Broker',
                url: './sections/country-policy/ForeignBroker',
                icon: <ContactPage fontSize="small" />,
            },
            {
                id: '2.3',
                label: 'Local Policy Terms',
                url: './sections/country-policy/LocalPolicyTerms',
                icon: <Policy fontSize="small" />,
            },
            {
                id: '2.4',
                label: 'Other Information',
                url: './sections/country-policy/OtherInformation',
                icon: <Description fontSize="small" />,
            },
            {
                id: '2.5',
                label: 'Add Contacts',
                url: './sections/country-policy/AddContacts',
                icon: <GroupAdd fontSize="small" />,
            },
            {
                id: '2.6',
                label: 'Globex Input',
                url: './sections/country-policy/GlobexInput',
                icon: <FileCopy fontSize="small" />,
            },
        ],
    },
];


const COMPONENT_MAP: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
    '1.1': () => import('./sections/master-policy/MasterPolicyTerms'),
    '1.3': () => import('./sections/master-policy/AccountHandlingSummary'),
    '1.4': () => import('./sections/master-policy/PSandRACreator'),
    '1.5': () => import('./sections/master-policy/MAS'),
    '1.6': () => import('./sections/master-policy/Attachments'),
    '2.1': () => import('./sections/country-policy/OriginalLocalInsured'),
    '2.2': () => import('./sections/country-policy/ForeignBroker'),
    '2.3': () => import('./sections/country-policy/LocalPolicyTerms'),
    '2.4': () => import('./sections/country-policy/OtherInformation'),
    '2.5': () => import('./sections/country-policy/AddContacts'),
    '2.6': () => import('./sections/country-policy/GlobexInput'),
};


const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
        },
    });
    return <AnimatedCollapse style={style} {...props} />;
}


const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: any,
    ref: React.Ref<HTMLLIElement>
) {
    const { id, itemId, label, children, icon, ...other } = props;
    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
    } = useTreeItem2({
        id,
        itemId,
        children,
        label,
        rootRef: ref,
    });

    const isParent = !itemId.includes('.');

    return (
        <TreeItem2Provider itemId={itemId}>
            <TreeItem2Root {...getRootProps({ ...other, disabled: isParent })}>
                <TreeItem2Content
                    {...getContentProps({
                        className: clsx('content', {
                            expanded: status.expanded,
                            selected: status.selected,
                            focused: status.focused,
                            disabled: isParent,
                        }),
                        onClick: (e: any) => {
                            if (isParent) {
                                e.preventDefault();
                            }
                        },
                    })}
                    sx={{
                        cursor: 'pointer',

                        backgroundColor: isParent ? 'action.hover' : 'inherit',
                        '&:hover': {
                            backgroundColor: isParent ? 'action.hover' : 'action.selected',
                        },
                    }}
                >
                    {status.expandable && (
                        <TreeItem2IconContainer {...getIconContainerProps()}>
                            <TreeItem2Icon status={status} />
                        </TreeItem2IconContainer>
                    )}
                    <TreeItem2Label {...getLabelProps()} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: status.selected ? 600 : 400 }} >
                            {label}
                        </Typography>
                    </TreeItem2Label>
                </TreeItem2Content>
                {children && <TransitionComponent {...getGroupTransitionProps({ className: 'groupTransition' })} />}
            </TreeItem2Root>
        </TreeItem2Provider>
    );
});


export default function AccountDetailsTabsOld() {
    const { mode } = useColorScheme();
    const [tab, setTab] = React.useState(0);
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
    const [countryTabs, setCountryTabs] = React.useState<{ code: string; label: string }[]>([
        { code: 'ca', label: 'Canada' },
        { code: 'de', label: 'Germany' },
        { code: 'jp', label: 'Japan' },
        { code: 'in', label: 'India' },
        { code: 'cn', label: 'China' },
    ]);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || 'Unknown';
    const partnerMarket = searchParams.get('partnerMarket') || 'Unknown Market';
    const coverage = searchParams.get('coverage') || 'Unknown Coverage';
    const [selectedItems, setSelectedItems] = React.useState<string[]>(['1.1']);
    const [selectedCountry, setSelectedCountry] = React.useState<string>('ca');
    const [company, setCompany] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
    };



    const handleCountrySelect = (event: SelectChangeEvent) => {
        const code = event.target.value as string;
        const country = allCountries.find(c => c.code === code);
        if (country && !countryTabs.find(ct => ct.code === code)) {
            setCountryTabs(prev => [...prev, country]);
        }
    };

    const selectedId =
        selectedItems.find((id) => id.includes('.')) ||
        ITEMS.flatMap(item => item.children || [])[0]?.id ||
        null;


    const itemMap = React.useMemo(() => {
        const map = new Map<string, { label: string; url: string, icon: any }>();
        for (const section of ITEMS) {
            for (const child of section.children || []) {
                map.set(child.id, { label: child.label, url: child.url!, icon: child.icon! });
            }
        }
        return map;
    }, []);

    const selectedItem = selectedId ? itemMap.get(selectedId) : null;
    const LazyComponent = selectedId && COMPONENT_MAP[selectedId]
        ? React.lazy(COMPONENT_MAP[selectedId])
        : null;

    const drawerWidth = 280;
    const collapsedWidth = 0;

    const AnimatedDrawer = animated(Drawer);

    const [open, setOpen] = React.useState(true);

    const styles = useSpring({
        width: open ? drawerWidth : collapsedWidth,
        config: { tension: 250, friction: 30 },
    });

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    zIndex: 1200,
                    width: '100%',
                    background: mode === 'dark' ? `linear-gradient(180deg, ${gray[800]} 0%, ${gray[900]} 400%)` : `linear-gradient(180deg, ${gray[100]} 0%, ${gray[200]} 500%)`,
                    borderBottom: `1px solid ${mode === 'dark' ? gray[700] : gray[200]}`,
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    height: 70,

                }}
            >
                <Link to="/applications">
                    <ListItemAvatar sx={{ minWidth: 'auto', mx: 1.5 }}>
                        <Avatar sx={{ width: 35, height: 35 }}>
                            <Home sx={{ fontSize: '1.2rem' }} />
                        </Avatar>
                    </ListItemAvatar>
                </Link>
                <Select
                    labelId="company-select"
                    id="company-simple-select"
                    value={company}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select company' }}
                    fullWidth
                    sx={{
                        maxHeight: 56,
                        width: 215,
                        '&.MuiList-root': {
                            p: '8px',
                        },
                    }}
                >
                    <ListSubheader sx={{ pt: 0 }}>Current</ListSubheader>
                    <MenuItem value="">
                        <ListItemText primary={`Account ${id}`} secondary="March 2025" />
                    </MenuItem>
                    <Divider sx={{ mx: -1 }} />
                    <ListSubheader>Previous</ListSubheader>
                    <MenuItem value={10}>
                        <ListItemText primary="Account 4897" secondary="March 2024" />
                    </MenuItem>
                    <MenuItem value={20}>
                        <ListItemText primary="Account 6578" secondary="March 2023" />
                    </MenuItem>
                </Select>
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
                                height: '55px',
                                width: '120px',
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
                                spacing={0.5}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                                    {item.icon}
                                    <Typography variant="body2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                                        {item.label}
                                    </Typography>
                                </Stack>
                                <Divider sx={{ width: '100%' }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {item.value}
                                </Typography>
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            </Box>

            <Box sx={{ width: '100%', display: { borderRadius: 0, p: 0, m: 0 } }}>


                <AnimatedDrawer
                    style={styles}
                    variant="permanent"
                    slotProps={{
                        paper: {
                            sx: {
                                width: open ? drawerWidth : collapsedWidth,

                                height: 'calc(100vh - 64px)',
                                top: 70, // push below nav
                                zIndex: 1100,

                            },
                        },
                    }}
                    sx={{
                        width: open ? drawerWidth : collapsedWidth,
                        flexDirection: 'column',
                    }}
                >
                    <Grid>
                        <Stack direction={"row"} sx={{ p: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Policy Specification</Typography>
                            <IconButton
                                onClick={() => setOpen((prev) => !prev)}
                                size="small"
                                sx={{
                                    background: '#000 !important',
                                    p: 0,
                                    ...(open
                                        ? {}
                                        : {
                                            position: 'fixed',
                                            backgroundColor: 'theme.palette.background.paper'
                                        }),
                                }}
                            >

                                {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}

                            </IconButton>
                        </Stack>
                        <Box>
                            <RichTreeView
                                items={ITEMS}
                                aria-label="pages"
                                multiSelect
                                defaultExpandedItems={['1', '2']}
                                selectedItems={selectedItems}
                                onSelectedItemsChange={(event, ids) => {
                                    const validIds = ids.filter(id => id.includes('.'));
                                    setSelectedItems(validIds);
                                }}
                                sx={{
                                    p: 0,
                                    m: 0,
                                    pb: '8px',
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    width: '280px',
                                    maxWidth: '280px',
                                }}
                                slots={{ item: CustomTreeItem }}
                            />
                        </Box>
                    </Grid>
                </AnimatedDrawer>

                <Grid
                    sx={{
                        pl: open ? '280px' : 6,
                        top: 70,
                        position: 'relative',
                        zIndex: 1000,
                        width: '100%',
                        maxWidth: '100%',
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                gap: 2,
                                width: '100%',
                                maxWidth: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{ flex: 1, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        width: '100%',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {!selectedId?.startsWith('1') && (
                                        <Box
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                overflow: 'hidden',
                                                width: '100%',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            {/* Country Tabs */}
                                            <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                                                <Tabs
                                                    value={selectedCountry}
                                                    onChange={(e, newValue) => setSelectedCountry(newValue)}
                                                    variant="scrollable"

                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: '100%',
                                                        overflowX: 'auto',
                                                        px: 2,
                                                        pt: 2,
                                                        my: 0,
                                                        minHeight: 32
                                                    }}
                                                >
                                                    {countryTabs.map((country) => (
                                                        <Tab
                                                            key={country.code}
                                                            value={country.code}
                                                            sx={{
                                                                height: 35,

                                                                px: 1.5,
                                                                py: 1.5,
                                                                textOverflow: 'ellipsis',
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                            label={
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    spacing={1}
                                                                    sx={{ m: 0, p: 0, overflow: 'hidden' }}
                                                                >
                                                                    <Flag code={country.code} style={{ width: 20, height: 15 }} />
                                                                    <Typography variant="body2" noWrap>
                                                                        {country.label}
                                                                    </Typography>
                                                                </Stack>
                                                            }
                                                        />
                                                    ))}
                                                </Tabs>
                                            </Box>

                                            {/* Country Selector */}
                                            <Box sx={{ px: 1, py: 1 }}>
                                                <Select
                                                    displayEmpty
                                                    value=""
                                                    onChange={(e) => {
                                                        const selectedCode = e.target.value;
                                                        const country = allCountries.find((c) => c.code === selectedCode);
                                                        if (country && !countryTabs.find((tab) => tab.code === selectedCode)) {
                                                            setCountryTabs((prev) => [...prev, country]);
                                                        }
                                                    }}
                                                    renderValue={() => 'Add a country'}
                                                    sx={{ width: 200 }}
                                                >
                                                    {allCountries
                                                        .filter((country) => !countryTabs.some(tab => tab.code === country.code))
                                                        .map((country) => (
                                                            <MenuItem key={country.code} value={country.code}>
                                                                <Flag code={country.code.toUpperCase()} style={{ width: 24, marginRight: 8 }} />
                                                                {country.label}
                                                            </MenuItem>
                                                        ))}

                                                </Select>

                                            </Box>
                                        </Box>
                                    )}
                                </Stack>
                            </Box>
                        </Box>

                        {/* Main Content */}
                        <Box sx={{ p: 0, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
                            <React.Suspense fallback={<CircularProgress />}>
                                {LazyComponent && <LazyComponent sectionId={selectedId} />}
                            </React.Suspense>
                        </Box>
                    </Box>
                </Grid>

            </Box >
        </>
    );
}
