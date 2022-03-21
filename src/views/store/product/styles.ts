import { makeStyles } from '@material-ui/core/styles';

const background =
  'radial-gradient(circle,rgba(241, 243, 250, 1) 0%,rgba(255, 248, 254, 1) 100%)';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    background: background,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  card: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
    borderRadius: '10px',
  },
}));
