import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    elevation: '3',
    height: '10rem'
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
  button: {
    width: '200px'
  },
  badge: {
    marginRight: '10px',
    color: theme.palette.primary.contrastText
  },
  card: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.secondary.main
  },
  cryptoCurrency: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.primary.contrastText
  },
  offerTableHead: {
    backgroundColor: theme.palette.primary.light
  },
}));

export default useStyles;