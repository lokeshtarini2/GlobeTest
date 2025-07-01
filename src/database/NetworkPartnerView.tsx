import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    CssBaseline,
    Divider,
    Grow,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Stack, useTheme } from '@mui/system';
import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import SideMenu from '../components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { chartsCustomizations, dataGridCustomizations, treeViewCustomizations } from '../theme/customizations';

// Lazy load account section components
const AdmittedCoverage = lazy(() => import('./np-sections/account/AdmittedCoverage'));
const BankingDetails = lazy(() => import('./np-sections/account/BankingDetails'));
const Binding = lazy(() => import('./np-sections/account/Binding'));
const ClaimHandlingRequirements = lazy(() => import('./np-sections/account/ClaimHandlingRequirements'));
const ClausesAndExclusions = lazy(() => import('./np-sections/account/ClausesAndExclusions'));
const CompanyAccountingRequirements = lazy(() => import('./np-sections/account/CompanyAccountingRequirements'));
const CompanyReinsuranceRequirements = lazy(() => import('./np-sections/account/CompanyReinsuranceRequirements'));
const CountryNuances = lazy(() => import('./np-sections/account/CountryNuances'));
const DistributionChannels = lazy(() => import('./np-sections/account/DistributionChannels'));
const GoodStandard = lazy(() => import('./np-sections/account/GoodStandard'));
const OtherComments = lazy(() => import('./np-sections/account/OtherComments'));
const PlacementRequirements = lazy(() => import('./np-sections/account/PlacementRequirements'));
const PolicyIssuance = lazy(() => import('./np-sections/account/PolicyIssuance'));
const ProposalForm = lazy(() => import('./np-sections/account/ProposalForm'));
const UnderwritingCapacityLimit = lazy(() => import('./np-sections/account/UnderwritingCapacityLimit'));

// Lazy load organization section components
const CedingCommission = lazy(() => import('./np-sections/org/CedingCommission'));
const CompanyContactInformation = lazy(() => import('./np-sections/org/CompanyContactInfomation').then(module => ({ default: module.CompanyContactInformation })));
const CompanyFinancialInformation = lazy(() => import('./np-sections/org/CompanyFinancialInformation'));
const CompanyGeneralInformation = lazy(() => import('./np-sections/org/CompanyGeneralInformation').then(module => ({ default: module.CompanyGeneralInformation })));
const CompanyInformation = lazy(() => import('./np-sections/org/CompanyInformation'));
const CompanyLicensingInformation = lazy(() => import('./np-sections/org/CompanyLicensingInformation'));
const CompanyRatingInformation = lazy(() => import('./np-sections/org/CompanyRatingInformation'));
const LinesOfBusiness = lazy(() => import('./np-sections/org/LinesOfCoverage'));
const Tariff = lazy(() => import('./np-sections/org/Tariff'));
const Taxes = lazy(() => import('./np-sections/org/Taxes'));
const VettingInformation = lazy(() => import('./np-sections/org/VettingInformation'));

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...treeViewCustomizations,
};

// Loading component for lazy-loaded sections
const SectionLoader = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <CircularProgress size={24} />
    </Box>
);

// Component wrapper that handles intersection observer for lazy loading
const LazySection: React.FC<{
    children: React.ReactNode;
    fallback: React.ReactNode;
    rootMargin?: string;
}> = ({ children, fallback, rootMargin = "100px" }) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref}>
            {isInView ? (
                <Suspense fallback={fallback}>
                    {children}
                </Suspense>
            ) : (
                fallback
            )}
        </div>
    );
};


const orgSections = {
    'Company Information': <CompanyInformation />,
    'Vetting Information': <VettingInformation />,
    'General Information': <CompanyGeneralInformation />,
    'Licensing Information': <CompanyLicensingInformation />,
    'Financials Information': <CompanyFinancialInformation />,
    'Rating Information': <CompanyRatingInformation />,
    'Contact Information': <CompanyContactInformation />,
    'Appetite': <LinesOfBusiness />,
    'Taxes': <Taxes />,
    'Commissions': <CedingCommission />,
    'Tariff, Rate, Min Premium Requirements': <Tariff />
};

const accSections = {
    'Admitted Coverage Requirements': <AdmittedCoverage />,
    'Underwriting Capacity': <UnderwritingCapacityLimit />,
    'Questionnaires': <ProposalForm />,
    'Country Nuances': <CountryNuances />,
    'Distribution Channels': <DistributionChannels />,
    'Placement Requirements': <PlacementRequirements />,
    'Requirements for Binding': <Binding />,
    'Local Wordings': <GoodStandard />,
    'Requirements for Policies': <PolicyIssuance />,
    'Required Clauses': <ClausesAndExclusions />,
    'Reinsurance Requirements': <CompanyReinsuranceRequirements />,
    'Accounting Requirements': <CompanyAccountingRequirements />,
    'Banking Details': <BankingDetails />,
    'Claims Handling Requirements': <ClaimHandlingRequirements />,
    'Other Comments': <OtherComments />
};

type SidebarSection = {
    group: 'Organization Details' | 'Account Handling Details';
    label: string;
    component: React.ReactNode;
};

const sections: SidebarSection[] = [
    ...Object.entries(orgSections).map(([label, component]) => ({
        group: 'Organization Details' as const,
        label,
        component
    })),
    ...Object.entries(accSections).map(([label, component]) => ({
        group: 'Account Handling Details' as const,
        label,
        component
    }))
];

export default function NPToken(props: { disableCustomTheme?: boolean }) {
    const groupedSections = useMemo(() => {
        return sections.reduce<Record<SidebarSection['group'], SidebarSection[]>>((acc, item) => {
            acc[item.group] = acc[item.group] || [];
            acc[item.group].push(item);
            return acc;
        }, {
            'Organization Details': [],
            'Account Handling Details': []
        });
    }, []);

    const [activeSection, setActiveSection] = useState<string>('');
    const mainRef = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const sidebarItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [snackbars, setSnackbars] = useState<Array<{ id: string; message: string }>>([]);
    const theme = useTheme();

    const handleSave = (label: string) => {
        const id = Date.now().toString();
        setSnackbars(prev => [...prev, { id, message: `Saved ${label}` }]);
    };

    const handleSnackbarClose = (id: string) => {
        setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                        break;
                    }
                }
            },
            {
                root: mainRef.current,
                rootMargin: '0px 0px -70% 0px',
                threshold: 0
            }
        );

        const elements = sections.map(({ label }) => document.getElementById(label)).filter(Boolean) as HTMLElement[];
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current && sidebarRef.current) {
                const scrollTop = mainRef.current.scrollTop;
                // If scrolled to the top (within 50px threshold), scroll sidebar to top
                if (scrollTop <= 50) {
                    sidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        };

        const mainElement = mainRef.current;
        if (mainElement) {
            mainElement.addEventListener('scroll', handleScroll);
            return () => mainElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (!sidebarRef.current) return;
        const container = sidebarRef.current;
        const activeItem = sidebarItemRefs.current[activeSection];
        if (!activeItem) return;

        const containerRect = container.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        if (itemRect.top < containerRect.top) {
            activeItem.scrollIntoView({ block: 'start', behavior: 'smooth' });
        } else if (itemRect.bottom > containerRect.bottom) {
            activeItem.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
    }, [activeSection]);

    const handleScrollTo = (label: string) => {
        const el = document.getElementById(label);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
        () => Object.fromEntries(sections.map(({ label }) => [label, true]))
    );

    const toggleSection = (label: string) => {
        setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                {/* Sidebar */}
                <SideMenu forceCollapsed={true} />
                <Box
                    ref={sidebarRef}
                    sx={{
                        width: sidebarOpen ? 280 : 0,
                        minWidth: sidebarOpen ? 200 : 0,
                        flexShrink: 0,
                        bgcolor: 'background.paper',
                        borderRight: sidebarOpen ? 1 : 0,
                        borderColor: 'divider',
                        overflowY: sidebarOpen ? 'auto' : 'hidden',
                        transition: 'width 0.2s',
                        position: 'relative',

                    }}
                >
                    {/* Sidebar Toggle Button (when open) */}
                    {sidebarOpen && (
                        <IconButton
                            size="small"
                            onClick={() => setSidebarOpen(false)}
                            sx={{
                                position: 'absolute',
                                top: 15,
                                right: 11,
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                border: 0.5,
                                borderColor: 'divider',

                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <ChevronLeft fontSize="small" />
                        </IconButton>
                    )}
                    {sidebarOpen && (
                        <List component="nav" sx={{ p: 0, m: 0 }}>
                            <Chip label="Expiration: 256 days" sx={{ px: 2, py: 2.5, m: 1, my: 1.5 }} />
                            {Object.entries(groupedSections).map(([group, items]) => (
                                <Box key={group}>
                                    <ListItemButton disabled>
                                        <Stack spacing={1} direction="row" alignItems="center">
                                            <ListItemIcon>
                                                {group === 'Organization Details' ? <BusinessIcon /> : <AccountCircleIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={group} />
                                        </Stack>
                                    </ListItemButton>
                                    {items.map((item) => (
                                        <ListItemButton
                                            key={item.label}
                                            onClick={() => handleScrollTo(item.label)}
                                            sx={{
                                                pl: 4,
                                                bgcolor: activeSection === item.label ? 'action.selected' : 'inherit',
                                                fontWeight: activeSection === item.label ? 'bold' : 'normal',
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: activeSection === item.label ? 'bold' : 'normal',
                                                },
                                                '&:hover': {
                                                    bgcolor: activeSection === item.label ? 'action.selected' : 'action.hover',
                                                }
                                            }}
                                            ref={(el) => {
                                                sidebarItemRefs.current[item.label] = el;
                                            }}
                                        >
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    ))}
                                    <Divider />
                                </Box>
                            ))}
                        </List>
                    )}
                </Box>

                {/* Sidebar Toggle Button (when closed) */}
                {!sidebarOpen && (

                    <Box
                        onClick={() => setSidebarOpen(true)}
                        sx={{
                            cursor: 'pointer',
                            left: -30,
                            position: 'fixed',
                            zIndex: 100,
                            transition: 'left 0.2s ease',
                            '&:hover, &:focus-within': {
                                left: 40,
                            },
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                    >
                        <Chip label="Expand" sx={{
                            pl: 2, pr: 5, py: 2.5, m: 1, my: 1.5, position: 'fixed'
                        }} />
                        <IconButton
                            size="small"

                            className="sidebar-toggle-btn"
                            sx={{
                                transition: 'transform 0.2s ease, box-shadow 0.2s',
                                position: 'absolute',
                                top: 15,
                                left: 89,
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                border: 0.5,
                                borderColor: 'divider',

                            }}
                        >
                            <ChevronRight fontSize="small" />
                        </IconButton>
                    </Box>

                )}

                {/* Main Content */}
                <Box
                    component="main"
                    ref={mainRef}
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.5)`
                            : alpha(theme.palette.background.default, 1),
                        overflowY: 'auto',
                        height: '100vh',
                        scrollBehavior: 'smooth',
                        transition: 'margin-left 0.2s',
                        ml: sidebarOpen ? 0 : 3,
                    })}
                >


                    {Object.entries(groupedSections).map(([group, items]) => (
                        <Box key={group} sx={{ p: 2 }}>
                            <Typography variant="h3">{group}</Typography>
                            {items.map(({ label, component }) => (
                                <Box
                                    id={label}
                                    key={label}
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        my: 2.5,
                                        boxShadow: 0.1,
                                        border: 1,
                                        borderColor: 'divider',
                                        transition: 'box-shadow 0.2s, transform 0.2s',
                                        '&:hover': {
                                            boxShadow: 0.2,

                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            borderRadius: 2,
                                            p: 2,
                                            borderBottomLeftRadius: expandedSections[label] ? 0 : 2,
                                            borderBottomRightRadius: expandedSections[label] ? 0 : 2,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'action.hover',
                                            },
                                        }}
                                        onClick={() => toggleSection(label)}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h4">{label}</Typography>
                                            <IconButton size="small" onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSection(label);
                                            }}>
                                                {expandedSections[label] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </IconButton>
                                        </Box>
                                    </Box>


                                    <Collapse in={expandedSections[label]}>
                                        <Divider />
                                        <Box
                                            sx={{
                                                borderBottomLeftRadius: 2,
                                                borderBottomRightRadius: 2,

                                            }}
                                        >
                                            <Box py={3} px={2}>
                                                <LazySection fallback={<SectionLoader />}>
                                                    {component}
                                                </LazySection>
                                            </Box>
                                            <Divider />
                                            <Box
                                                sx={{

                                                    px: 2,
                                                    py: 2,

                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    borderRadius: 2,
                                                    borderTopLeftRadius: 0,
                                                    borderTopRightRadius: 0,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    color="secondary"
                                                    onClick={() => handleSave(label)}
                                                >
                                                    Save
                                                </Button>

                                            </Box>
                                        </Box>
                                    </Collapse>
                                </Box>

                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
            {snackbars.map((snackbar, index) => (
                <Snackbar
                    key={snackbar.id}
                    open={true}
                    onClose={() => handleSnackbarClose(snackbar.id)}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    TransitionComponent={Grow}
                    sx={{
                        '& .MuiSnackbar-root': {
                            position: 'relative',
                        },
                        bottom: 16 + (index * 70),
                    }}
                >
                    <Alert
                        onClose={() => handleSnackbarClose(snackbar.id)}
                        severity="success"
                        variant="filled"
                        sx={{
                            width: '100%',
                            '& .MuiAlert-action': {
                                alignItems: 'center',
                                padding: 0,

                                marginLeft: 1.5
                            },
                            '& .MuiAlert-action .MuiIconButton-root': {

                                alignSelf: 'center',
                            }
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            ))}
        </AppTheme>
    );
}