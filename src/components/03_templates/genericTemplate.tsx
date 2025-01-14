import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
// import Container from "@material-ui/core/Container";

// Theme
import { ThemeProvider } from '@material-ui/core/styles';
import { AppName } from '../../common/const';
import makeCustomTheme from '../../common/theme';

// Organisms
import { Footer } from '../02_organisms/footer';
import { MyAppBar } from '../02_organisms/appBar';
import { MyDrawer } from '../02_organisms/drawer';

// Language Settings
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from '../../locales/en.json';
import jaJson from '../../locales/ja.json';

// gtag
import { useTracking } from '../../common/useTracking';

// Translate
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJson,
    },
    ja: {
      translation: jaJson,
    },
  },
  lng: 'ja',
  fallbackLng: 'ja',
  interpolation: { escapeValue: false },
});

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },

    stickyFooter: {
      marginTop: 'auto',
    },
  })
);

export interface IGenericTemplateProps {
  children: React.ReactNode;
}

const GenericTemplate: React.FC<IGenericTemplateProps> = ({ children }) => {
  const classes = useStyles();

  // gtag
  useTracking();

  // DrawerOpen
  const [isDrawerOpen, setOpen] = React.useState(false);
  const handleDrawerOpen = (isDrawerOpen: boolean) => {
    setOpen(!isDrawerOpen);
  };

  // Dark or Light Mode.
  const [isDarkMode, setDarkMode] = React.useState(
    localStorage.getItem(AppName + 'DarkMode') === 'on' ? true : false
  );
  const handleDarkModeToggle = (isDarkMode: boolean) => {
    localStorage.setItem(AppName + 'DarkMode', isDarkMode ? 'off' : 'on');
    setDarkMode(!isDarkMode);
  };

  // Make custom theme.
  const theme = makeCustomTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <CssBaseline />

        <MyAppBar
          isDarkMode={isDarkMode}
          isDrawerOpen={isDrawerOpen}
          handleDarkModeToggle={(isDarkMode) => handleDarkModeToggle(isDarkMode)}
          handleDrawerOpen={() => handleDrawerOpen(isDrawerOpen)}
        />

        <MyDrawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={() => handleDrawerOpen(isDrawerOpen)}
          isDarkMode={isDarkMode}
          handleDarkModeToggle={(isDarkMode) => handleDarkModeToggle(isDarkMode)}
        />
        <main className={classes.content}>
          <Box className={classes.appBarSpacer} />

          {children}
          <Box className={classes.stickyFooter}>
            <Footer />
          </Box>
        </main>
      </Box>
    </ThemeProvider>
  );
};

export default GenericTemplate;
