import {fade} from '@material-ui/core/styles/colorManipulator';

export const FormStyle = theme => ({
    cont:{
      marginTop: theme.spacing(6)
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: "25px"
    },
    avatar: {
      margin: theme.spacing(1),
      width: theme.spacing(7),
      height: theme.spacing(7),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  });

export const adminstrationStyle = theme => ({
  sidenav: {
    width: '250px',
    position: 'fixed',
    zIndex: 1,
    left: '10px',
    height: '100%',
  },
  main:{
    fontSize: '20px',
    padding: '0px 10px',
    marginLeft: '260px',
    [theme.breakpoints.down("sm")]: {
      marginLeft: '0px'
  }
  },
  adminTitle:{
    padding: '15px'
  },
  avatarStyle:{
    textAlign: 'center',
    width: theme.spacing(7),
    height: 56,
    width: 56
  },
  anchorList: {
    width: 250,
  }
});
export const breakPoints = theme => ({
  showInSmallScreens: {
    display: 'none',
    [theme.breakpoints.down("sm")]: {
        display: 'inline-block'
    }
  },
  hideInSmallScreens: {
    display: 'block',
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    }
  },
  anchorList: {
    width: 250,
  },
  anchorFullList: {
    width: 'auto',
  }
});
export const HeaderStyle = theme => ({
    root: {
        width: "100%",
        marginBottom: 0
      },
      grow: {
        flexGrow: 1
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20
      },
      title: {
        marginRight: "10px",
        paddingRight: "10px"
      },
      search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        marginRight: theme.spacing(2),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto"
        }
      },
      searchIcon: {
        width: theme.spacing(9),
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      inputRoot: {
        color: "inherit",
        width: "100%"
      },
      inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(10),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: 120,
          "&:focus": {
            width: 200
          }
        }
      },
      linkStyle:{
        color: '#333333',
        textDecoration: 'none',
      },
      showInSmallScreens: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block'
        }
      },
      hideInSmallScreens: {
        display: 'block',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
      },
      anchorList: {
        width: 250,
      },
      anchorFullList: {
        width: 'auto',
      }
});

