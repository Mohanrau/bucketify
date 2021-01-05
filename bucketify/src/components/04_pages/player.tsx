import React, { useState, useRef } from 'react';

// Styles
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// Template
import PageContainer from '../02_organisms/pageContainer';

// Icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Router
import { useHistory } from 'react-router-dom';

// Components
import { Typography, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

// My components
// import MyTypographyH3 from '../01_atoms_and_molecules/myTypographyh3';

// Make custom styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // Back arrow icon
    backArrowIcon: {
      zIndex: 10,
      position: 'absolute',
      top: '5.5rem',
      left: '2rem',
      color: 'white',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    albumTitle: {
      // fontSize: '1rem',
      // fontWeight: 600,
      textAlign: 'center',
      margin: 'auto',
      // margin: 'auto auto 1rem auto',
      maxWidth: '80%',
    },
    albumArtWork: {
      margin: '0 auto 0 auto',
      textAlign: 'center',
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: '75%',
      },
      [theme.breakpoints.up('md')]: {
        width: '60%',
      },
    },
    albumArtWorkImage: {
      margin: '1rem 0 1rem 0',
      width: '100%',
      paddingTop: '100%',
      // height: '90%',
      display: 'inline-block',
    },
    alignLeft: {
      textAlign: 'left',
    },
    alignRight: {
      textAlign: 'right',
    },
    seekbar: {
      height: '5px',
      margin: '0.5rem auto 0.5rem auto',
      borderRadius: '4px',
      background: 'linear-gradient(#ff6904, #ff6904) no-repeat #eee',
      backgroundSize: '0%',
    },
    // timeWrapper: {
    // },
    time: {
      display: 'inline-block',
      width: '50%',
      fontSize: '0.75rem',
    },
    controlButtonWrapper: {
      margin: '0 0 1rem 0',
      textAlign: 'center',
    },
    controlButton: {
      display: 'inline-block',
      margin: '0 0.5rem 0 0.5rem',
    },
  })
);

const Player: React.FC = () => {
  const classes = useStyles();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('md'));
  const history = useHistory();

  /**
   *  States used in this component.
   */
  // Whether is fetching data now.
  // const [isFetching, setIsFetching] = useState(false);

  // Whether is fetching album cover.
  const [isFetchingAlbumCover, setIsFetchingAlbumCover] = useState(true);

  // Get play list from localstorage.

  // References to elements that controls audio player.
  const audio = useRef<HTMLAudioElement>(null);

  const handleClickPlayButton: () => void = () => {
    if (!audio || !audio.current) {
      return;
    }
    audio.current.play();
  };

  return (
    <>
      <PageContainer>
        <ArrowBackIosIcon
          className={classes.backArrowIcon}
          onClick={() => {
            history.goBack();
          }}
        />
        <Typography variant="h5" component="h3" className={classes.albumTitle}>
          Title
        </Typography>

        <Box className={classes.albumArtWork}>
          {isFetchingAlbumCover ? (
            <Skeleton variant="rect" className={classes.albumArtWorkImage} />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX////Ly8vIyMjNzc3a2trU1NT7+/vy8vLg4ODr6+vX19fMzMz09PTu7u7e3t7R0dHl5eW0uPxiAAAETElEQVR4nO2Z65qjKhAAAxoVvOD7P+1yFxI1kxm/czazVX82G5FQ0jSNc7sBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPynrO0X6P7vUf6EVopXSPHZhi8FLZ9uaO5nmM83lMNpg0n+dsMew7+dbNgPi9pr8GsMWyml2VN8Npymqficr01qXdfpVtPFtuU99W25yfaLth+1dVvyFaNHoqGSQq67DZ4N71Lmn8oxPhnpMX3VVknpvxirTXWQcnuYZXeWVYSOUpkR/+u5v2vniIZaCL3fYMfQbjDpc5NiXMaRCDmXbZOhqR7gKDbDTlaZYIkdCdl0sa24xPD+MLIXhnm4ydCOaLGtusF+KFtvhmLMX66yMFxdUVVeGt2l6S7jY2yEmfrIT6J0qUPllWHWiIY27IY0RLnsG26PsBGFoasoZA7trWcd72zEt2ZuIxp25cqo2DO0UdbGwQYzs81QU0xWZZhH6nrMvzZJuY75ofT5Sd26dor95SXxPVIutZliv8FepmmXOPBoaNdSm67aS0XzzbARKUq0+5wM7ezbPJ4eyvocSpcZ2mHu73p7hvqWkk0wdBORrq5SFuk0G8rFxHl3jbeIcRlulimCl+dzzIWGB+wbrtEpGPaFoZJlztoMhzVO7iLHbU30vvWYgn7X8Jp1uIOSOoxhz9Clf/dtNsyreK5WdGF4C2usc4k4twkBmsW0GJ8Nm2EJfCuVHhu6GkAfG9pYa3cN+0NDu0JvPoqLvBZSVr7HLlH3T2ccjQmGeT882M++aajcNuVUDgxvIdm8Yzj5Ky5xZsM5Xk6JNhn6PT98toaNZxR1ufRDQxVebtgq4sgwJJtnQ3VoaLe4xjl1m2E0chnV/0Ybw9WWuMokw8vW4dBsUaDS2xs5Hxoql16ec6k6yKWDb9Zrd3My7OzczcoyxA7KTKOT4VW5dChKyix4ZuiTTdoPt0Km3tIqQ3uH8btiMnS/E8vZMFNDcfNdmEsNF7/u5gfBU8NJCh1GfitqcS12d3zfbo4mydBsRXW4q9xqYt10leES191cC54aummPz0fngmUS1bqpDd2hYt4MO7d/dJ4Y553MPqkquMhw2dZdJXhu6E82fuR2cuJhx4iqwH0wVGG40bAMaBOu6LRo5nTiuCbTFK+FpaleEZ8bzvlsZ3uQrVLudFcN6MEwEg1NMT3R1uYe2QxqveesYCv5u4mUp5a3DKtZe3jffWrozudx5G04uQpZH6STYbNjWGbgELGWafQdiaIm+PkJeF2O33bvGQ46j3bSOsVkr91I9EPdMWvtA3HR1eHMf6u0LjpedKxNV/c+pBnSpVZvnFfQJ4bDe4Yfxr9huLy3Dj8Ml2mmk7/N/J43wofMn2/4BT7b8PXfgD/ccBmb13y0IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAj/kDuk4loESEngUAAAAASUVORK5CYII="
              //TODO Change to album title at alt atribute.
              alt="AlbumArtCover"
              className={classes.albumArtWorkImage}
            />
          )}
        </Box>

        <section className={classes.alignLeft}>
          <p>
            <b> tracks name </b>
          </p>

          <p>artist name</p>
        </section>

        <audio preload="true" ref={audio}>
          <source src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3" />
          <p>※ ご利用のブラウザでは再生することができません。</p>
        </audio>
        <div id="seekbar" className={classes.seekbar}></div>

        <div id="time-wrapper">
          <span id="current" className={classes.alignLeft + ' ' + classes.time}>
            00:00
          </span>
          <span id="duration" className={classes.alignRight + ' ' + classes.time}>
            00:00
          </span>
        </div>

        <div id="control-button" className={classes.controlButtonWrapper}>
          {/* <a className={classes.controlButton} id=""> */}
          <SkipPreviousIcon fontSize="large" color="secondary" className={classes.controlButton} />
          {/* </a> */}

          {/* <a className={classes.controlButton} id="play"> */}
          <PlayCircleFilledIcon
            fontSize="large"
            color="secondary"
            className={classes.controlButton}
            onClick={handleClickPlayButton}
          />
          {/* </a> */}
          {/* <a class="btn-floating btn-large pulse hide" id="stop">
            <i class="medium material-icons">pause</i>
          </a> */}
          {/* <a className={classes.controlButton} id=""> */}
          <SkipNextIcon fontSize="large" color="secondary" className={classes.controlButton} />
          {/* </a> */}
        </div>
      </PageContainer>
    </>
  );
};
export default Player;