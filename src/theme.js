import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
        h1: { fontWeight: 900, fontSize: '2.7rem', letterSpacing: 0.18, color: '#153962' },
        h2: { fontWeight: 900, fontSize: '2.1rem', letterSpacing: 0.13, color: '#1679ef' },
        h3: { fontWeight: 800, fontSize: '1.7rem', letterSpacing: 0.07, color: '#2563eb' },
        h4: { fontWeight: 700, fontSize: '1.35rem', color: '#1867b3' },
        h5: { fontWeight: 700, fontSize: '1.05rem', color: '#27548a' },
        h6: { fontWeight: 700, fontSize: '0.98rem', color: '#1877ee' },
        subtitle1: { fontWeight: 600, color: '#386384', fontSize:'1.03rem' },
        subtitle2: { fontWeight: 700, color: '#3561ac', fontSize:'0.94rem' },
        button: { textTransform: 'none', fontWeight: 800, fontSize: '1rem', letterSpacing: 0.03 },
    },
    palette: {
        primary: {
            main: '#2563eb', // Vivid Blue
            light: '#60a5fa',
            dark: '#1749b7',
            contrastText: '#fff',
        },
        secondary: {
            main: '#475569', // Slate
            light: '#94a3b8',
            dark: '#30486c',
            contrastText: '#fff',
        },
        success: { main: '#10b981' },
        warning: { main: '#f59e0b' },
        error:   { main: '#ef4444' },
        background: {
            default: '#f7fafc', // very light slate
            paper: '#ffffff',
        },
        text: {
            primary: '#102136',
            secondary: '#64748b',
            disabled: '#adb7cf',
        },
        divider: '#e5eaf5',
    },
    shape: {
        borderRadius: 14,
    },
    shadows: [
        'none',
        '0 1.5px 4px 0 #c9e6fb24', // 1
        '0 2px 8px 0 #2563eb14',   // 2
        '0 5px 16px 0 #38b4ff17',  // 3
        '0 8px 24px 0 #38f4ff18',  // 4
        '0 10px 36px 0 #1679ef22', // 5
        ...Array(20).fill('0 10px 36px 0 #1679ef15')
    ],
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 22,
                    boxShadow: '0 8px 36px -8px #38b4ff18',
                    border: '1.5px solid #e2e8f0',
                    background: 'linear-gradient(115deg,#f8fafc 80%,#eaf7ff 140%)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight:700,
                    boxShadow: 'none',
                    padding: '8px 26px',
                    fontSize: '1rem',
                    background: 'linear-gradient(92deg, #2563eb 44%, #60e2ff 130%)',
                    '&:hover': {
                        boxShadow: '0 4px 16px -6px #37edff2b',
                        background: 'linear-gradient(102deg, #60e2ff 30%, #2563eb 120%)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(92deg, #1679ef 0%, #41ffb3 100%)',
                },
                containedSecondary: {
                    background: 'linear-gradient(92deg, #475569 0%, #94a3b8 100%)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 16px 0 #2563eb13',
                    borderBottom: '1.5px solid #e2e8f0',
                    minHeight: 72,
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: '1.5px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 24px 0 #2563eb06',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 700,
                    background: 'linear-gradient(90deg,#edf6fb 60%,#dbeafe 120%)',
                    color: '#1749b7',
                },
                colorSuccess: {
                    color: '#197123',
                    background: 'linear-gradient(90deg,#e6fdf4,#d2f8e8)',
                },
                colorWarning: {
                    color: '#947511',
                    background: 'linear-gradient(90deg,#fef8e4,#fff5d6)',
                },
                colorError: {
                    color: '#b91c1c',
                    background: 'linear-gradient(90deg,#ffe8e8,#ffd1d1)',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 500,
                    background: '#fff',
                },
                input: {
                    padding: '11px 14px',
                    borderRadius: 8,
                    fontSize: '1rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 8px 30px -10px #2563eb05',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 22,
                    boxShadow: '0 16px 60px -12px #3bcfff19',
                },
            },
        },
    },
});

export default theme;
