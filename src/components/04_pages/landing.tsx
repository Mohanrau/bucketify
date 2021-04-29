import React, { useRef, useContext, useEffect } from 'react';
import { AuthState } from '@aws-amplify/ui-components';

import Box from '@material-ui/core/Box';

// Style
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// react-spring
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { useSpring, animated } from 'react-spring';

// Material-ui
import {
  Container,
  Paper,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Typography,
  Button,
  Link,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

// Image
import demoGifPC from '../../images/bucketify_demo_pc.gif';
import architecture from '../../images/architecture.drawio.svg';
import scanBucketImage from '../../images/scan-bucket-image.png';

// MyComponents
import ResponsiveButton from '../01_atoms_and_molecules/responsiveButton';

// Material-ui
import Grid from '@material-ui/core/Grid';

// Router
import { useHistory } from 'react-router-dom';
import { Link as LinkRouter } from 'react-router-dom';

// Context
import { AuthContext, LanguageContext } from '../../App';

// Translation
import { useTranslation } from 'react-i18next';

//Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    landingTopWrapper: {
      backgroundImage: 'url("images/bg-landing-resized.jpg")',
      backgroundSize: 'cover',
      height: '100%',
      backgroundPosition: '50% 50%',
    },
    landingMiddleParallaxLayer: {
      zIndex: -2,
    },
    landingMiddleWrapper: {
      backgroundImage: 'url("images/bg-landing5.jpg")',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      backgroundPosition: '50% 50%',
    },

    topWrapperCatchCopy: {
      color: 'white',
      textShadow: '1px 2px 3px #4b4b4b',
      fontFamily: 'Oswald',
    },
    buttonWrapper: {
      textAlign: 'center',
      padding: '3rem 0 1rem 0',
    },
    sectionWrapper: {
      // width: '90%',
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        align: 'center',
      },
    },
    sectionHeader: {
      padding: '2rem 0 1.5rem 0rem',
    },
    defaultBackGroundWrapper: {
      backgroundColor: theme.palette.background.default,
      whiteSpace: 'pre-wrap',
    },
    introductionDemoWrapper: {
      textAlign: 'center',
    },
    introductionDemo: {
      width: '95%',
      borderRadius: '7px',
    },
    paperPadding: {
      padding: '1.75rem 1.5rem 1.75rem 1.5rem',
    },
    introductionFeaturesList: {
      backgroundColor: theme.palette.background.paper,
    },
    transParentBackground: {
      backgroundColor: 'transparent',
    },
    howItWorksWrapperEdgeTop: {
      paddingBottom: 'calc(10vw + 10px)',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 5,
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        borderBottom: '10vw solid ' + theme.palette.secondary.main,
        borderLeft: '100vw solid transparent',
      },
    },
    howItWorksWrapper: {
      backgroundColor: theme.palette.secondary.main,
      zIndex: 5,
    },
    howItWorksText: {
      paddingBottom: theme.spacing(3),
    },
    howItWorksWrapperEdgeBottom: {
      paddingTop: 'calc(10vw)',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 5,
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        borderTop: '10vw solid ' + theme.palette.secondary.main,
        borderRight: '100vw solid transparent',
      },
    },
    howItWorksImageWrapper: {
      textAlign: 'center',
      margin: 'auto',
    },
    threeDirectionCard: {
      width: '80%',
      height: 'auto',
      background: '#f0f8ff',
      borderRadius: '10px',
      boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
      transition: 'box-shadow 0.5s',
      willChange: 'transform',
      border: '15px solid #FFC045',
      margin: 'auto',
      '&:hover': {
        boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.4)',
      },
    },
    howItWorksImage: {
      width: '100%',
      backgroundColor: '#f0f8ff',
      padding: '20px',
      borderRadius: '10px',
    },

    howToUseWrapper: {
      // backgroundColor: '#f0f8ff',
      // height: '75%',
    },
    howToUseCodeBlock: {
      margin: theme.spacing(2),
      padding: theme.spacing(3),
      backgroundColor: '#f0f8ff',
      color: theme.palette.primary.main,
    },
    howToUseImage: {
      margin: theme.spacing(2),
      width: '80%',
      borderRadius: theme.spacing(2),
      boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    linkText: {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
    stepperSpacert: {
      marginBottom: theme.spacing(4),
    },
    linkTextDecoration: {
      textDecoration: 'none',
    },
  })
);

const Landing: React.FC = () => {
  const classes = useStyles();
  const parallaxRef = useRef<Parallax>(null);

  // translation
  const LanguageContextHooks = useContext(LanguageContext);
  const [t, i18n] = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(LanguageContextHooks.languageState);
  }, [LanguageContextHooks.languageState, i18n]);

  const AuthStateHooks = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    console.log('Check whether the user has already signed in or not.');

    // If ther user already signed in, push history /accounts.
    if (AuthStateHooks.authState === AuthState.SignedIn) {
      console.log('you have already signd in. push history to accounts');
      history.push('/accounts');
    }
  }, [history, AuthStateHooks.authState]);

  const theme = useTheme();
  const isMatchesDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  // State
  const [activeStep, setActiveStep] = React.useState(0);

  // Effect when hover on 3d card.
  const calc = (x: number, y: number): number[] => [
    -(y - window.innerHeight / 2) / 90, // degree
    (x - window.innerWidth / 2) / 90, // degree
    1.05, // expand rate
  ];
  const trans = (x: number, y: number, s: number): string =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const [props, setSpringImage] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  //How To Use StepperContent
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const corsPolicy = `[
  {
      "AllowedHeaders": [
          "*"
      ],
      "AllowedMethods": [
          "GET"
      ],
      "AllowedOrigins": [
          "https://www.bucketify.net"
      ],
      "ExposeHeaders": []
  }
]`;
  const iamPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket",
              "s3:ListBucketVersions",
              "s3:GetObject"
          ],
          "Resource": [
              "arn:aws:s3:::<Your bucket name>",
              "arn:aws:s3:::<Your bucket name>/*"
          ]
      }
  ]
}
`;
  const steps = [
    t('Create Your AWS account'),
    t('Create your S3 bucket'),
    t('Create IAM user'),
    t('SignUp and SignIn to Bucketify'),
    t('Scan your bucket'),
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            {t('Create Your AWS account detail')}
            <Link
              href="https://portal.aws.amazon.com/billing/signup#/start"
              target="_blank"
              className={clsx(classes.linkText)}
            >
              {t('Create Your AWS account link text')}
            </Link>
            .
          </>
        );
      case 1:
        return (
          <>
            {t('Create Your S3 bucket detail')}
            <Link
              href="https://s3.console.aws.amazon.com/s3/home"
              target="_blank"
              className={clsx(classes.linkText)}
            >
              {t('Create Your S3 bucket link text')}
            </Link>
            .<br />
            <div
              dangerouslySetInnerHTML={{
                __html: t('Create Your S3 bucket detail2'),
              }}
            />
            <Paper elevation={3} className={clsx(classes.howToUseCodeBlock)}>
              {corsPolicy}
            </Paper>
          </>
        );
      case 2:
        return (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: t('Create Your IAM user detail'),
              }}
            />

            <Paper elevation={3} className={clsx(classes.howToUseCodeBlock)}>
              {' '}
              {iamPolicy}
            </Paper>
          </>
        );
      case 3:
        return (
          <>
            <span
              dangerouslySetInnerHTML={{
                __html: t('SignUp and SignIn to Bucketify detail'),
              }}
            />
            <Link
              href="https://www.bucketify.net/accounts"
              target="_blank"
              className={clsx(classes.linkText)}
            >
              {t('SignUp and SignIn to Bucketify link text')}
            </Link>
            .<br />
          </>
        );
      case 4:
        return (
          <>
            {t('Scan your bucket detail')}
            <br />
            <img src={scanBucketImage} className={clsx(classes.howToUseImage)} />
          </>
        );
      default:
        return <>'Unknown step'</>;
    }
  };

  return (
    <Box>
      {/* https://www.react-spring.io/docs/props/parallax */}

      <Parallax pages={!isMatchesDownSm ? 5 : 5 + 1.4} ref={parallaxRef}>
        {/* Top Wrapper */}
        <ParallaxLayer offset={0} speed={0} factor={1.25}>
          <Box className={clsx(classes.landingTopWrapper)}></Box>
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0.75}>
          <Typography
            variant="h1"
            component="h2"
            align="center"
            className={clsx(classes.topWrapperCatchCopy)}
          >
            Everything
            <br />
            is
            <br />
            in your bucket.
          </Typography>
        </ParallaxLayer>
        <ParallaxLayer offset={0.65} speed={0.75}>
          <Box className={clsx(classes.buttonWrapper)}>
            <ResponsiveButton
              onClick={() => {
                if (parallaxRef !== null && parallaxRef.current !== null) {
                  parallaxRef.current.scrollTo(1);
                }
              }}
              variant="contained"
              color="secondary"
            >
              {t('Learn More')}
            </ResponsiveButton>
          </Box>
        </ParallaxLayer>

        {/* Introduction */}
        <ParallaxLayer offset={1} speed={1} factor={0.75}>
          <Box className={clsx(classes.defaultBackGroundWrapper)}>
            <Container maxWidth="lg" className={clsx(classes.sectionWrapper)}>
              <Typography variant="h3" component="h3" className={classes.sectionHeader}>
                {t('Introduction')}
              </Typography>

              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  alignItems="center"
                  justify="center"
                  className={classes.introductionDemoWrapper}
                >
                  <Box>
                    <img src={demoGifPC} className={clsx(classes.introductionDemo)} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={clsx(classes.paperPadding)} elevation={3} square={false}>
                    <Typography variant="h5" component="h5">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: t('Introduction detail'),
                        }}
                      />
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" className={classes.sectionHeader}>
                    {t('Features')}
                  </Typography>
                  <div>
                    <List className={clsx(classes.introductionFeaturesList)}>
                      <ListItem>
                        <ListItemIcon>
                          <CloudDownloadIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={t('Streaming playback')}
                          secondary={t('Streaming playback detail')}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LibraryMusicIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={t('Auto generated libraries')}
                          secondary={t('Auto generated libraries detail')}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <QueueMusicIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={t('Playlists stored on the cloud')}
                          secondary={t('Playlists stored on the cloud detail')}
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Box className={clsx(classes.buttonWrapper)}>
                    <ResponsiveButton
                      onClick={() => {
                        if (parallaxRef !== null && parallaxRef.current !== null) {
                          parallaxRef.current.scrollTo(!isMatchesDownSm ? 2 : 2 + 1);
                        }
                      }}
                      variant="outlined"
                      color="secondary"
                    >
                      {t('How It Works button')}
                    </ResponsiveButton>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ParallaxLayer>

        {/* How It Works */}
        <ParallaxLayer offset={!isMatchesDownSm ? 2 : 2 + 1} speed={0.5}>
          <Box className={clsx(classes.transParentBackground)}>
            <Box className={clsx(classes.howItWorksWrapperEdgeTop)}></Box>
            <Box className={clsx(classes.howItWorksWrapper)}>
              <Container maxWidth="lg" className={clsx(classes.sectionWrapper)}>
                <Typography variant="h3" component="h3" className={classes.sectionHeader}>
                  {t('How It Works')}
                </Typography>
                <Typography variant="body1" className={clsx(classes.howItWorksText)}>
                  {t('How It Works detail')}
                </Typography>
                <Box className={clsx(classes.howItWorksImageWrapper)}>
                  <animated.div
                    className={clsx(classes.threeDirectionCard)}
                    onMouseMove={({ clientX: x, clientY: y }) =>
                      setSpringImage({ xys: calc(x, y) })
                    }
                    onMouseLeave={() => setSpringImage({ xys: [0, 0, 1] })}
                    // @ts-ignore
                    style={{ transform: props.xys.interpolate(trans) }}
                  >
                    <img src={architecture} className={classes.howItWorksImage} />
                  </animated.div>
                </Box>
                <Box className={clsx(classes.buttonWrapper)}>
                  <ResponsiveButton
                    onClick={() => {
                      if (parallaxRef !== null && parallaxRef.current !== null) {
                        parallaxRef.current.scrollTo(!isMatchesDownSm ? 3 : 3 + 1);
                      }
                    }}
                    variant="outlined"
                    color="primary"
                  >
                    {t('How To Use button')}
                  </ResponsiveButton>
                </Box>
              </Container>
            </Box>
            <Box className={clsx(classes.howItWorksWrapperEdgeBottom)}></Box>
          </Box>
        </ParallaxLayer>

        {/* How to use */}
        <ParallaxLayer
          offset={!isMatchesDownSm ? 2.8 : 2.8 + 1}
          speed={0}
          factor={1.25}
          // @ts-ignore
          class={clsx(classes.landingMiddleParallaxLayer)}
        >
          <Box className={clsx(classes.landingMiddleWrapper)}></Box>
        </ParallaxLayer>
        <ParallaxLayer offset={!isMatchesDownSm ? 3 : 3 + 1} speed={3} factor={1}>
          <Box className={clsx(classes.defaultBackGroundWrapper)}>
            <Container
              maxWidth="lg"
              className={clsx(classes.sectionWrapper, classes.stepperSpacert)}
            >
              <Typography variant="h3" component="h3" className={classes.sectionHeader}>
                {t('How To Use')}
              </Typography>

              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      onClick={() => {
                        setActiveStep(index);
                      }}
                    >
                      <Typography variant="h5" component="h4">
                        {label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body1" component="span">
                        {getStepContent(index)}
                      </Typography>
                      <div className={classes.actionsContainer}>
                        {/* <div> */}
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          {t('Back')}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? t('Finish') : t('Next')}
                        </Button>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: t('Your are ready'),
                      }}
                    />
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    {t('Reset')}
                  </Button>
                </Paper>
              )}
              <Box className={clsx(classes.buttonWrapper)}>
                <ResponsiveButton
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    // Do nothing.
                    return;
                  }}
                >
                  <LinkRouter to="/accounts" className={clsx(classes.linkTextDecoration)}>
                    {t('Start now')}
                  </LinkRouter>
                </ResponsiveButton>
              </Box>
            </Container>
          </Box>
        </ParallaxLayer>
        <ParallaxLayer offset={!isMatchesDownSm ? 4 : 4 + 1} speed={1.25} factor={1.5}>
          <Box className={clsx(classes.defaultBackGroundWrapper)}>
            <Container maxWidth="lg" className={clsx(classes.sectionWrapper)}>
              <Typography variant="h3" component="h3" className={classes.sectionHeader}>
                {t('Privacy Policy')}
              </Typography>

              <Paper className={clsx(classes.paperPadding)}>
                <Typography variant="body1" component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t('Privacy Policy detail'),
                    }}
                  />

                  {/* <LinkRouter to="/privacy" className={clsx(classes.linkText)}>
                    {t('Privacy Policy link')}
                  </LinkRouter> */}
                </Typography>
              </Paper>

              <Typography variant="h3" component="h3" className={classes.sectionHeader}>
                {t('Disclaimer')}
              </Typography>
              <Paper className={clsx(classes.paperPadding)}>
                <Typography variant="body1" component="div">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t('Disclaimer detail'),
                    }}
                  />
                </Typography>
              </Paper>
            </Container>
          </Box>
        </ParallaxLayer>
      </Parallax>
    </Box>
  );
};

export default Landing;
