import React from 'react';
import AppBar from '@material-ui/core/AppBar';


import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
// import { mainListItems, secondaryListItems } from '../Dashboard/listItems';
import IForm from '../form/index';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import './style.css';
import LiveTvIcon from '@material-ui/icons/LiveTv';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/icons/Menu';
import { ListItem, TextField } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#1e1e1edb',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width:0,
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    textField: {
      //   marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 215,
      },
      just:{
          justifyContent: 'center',
          paddingLeft: 8,
          paddingRight:8,
      },
  }));
  
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props:any) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

function Page() {

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <React.Fragment>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} >
            <Toolbar className= {classes.toolbar}>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <LiveTvIcon />
          </IconButton>
                <Typography variant="h6" color= "inherit" noWrap className={classes.title}>
                    LightningInsmet
                </Typography>
          <div>
          <IconButton 
          color="inherit"
            onClick={handleClickOpen}
          >
          
            <HistoryIcon />
          </IconButton>
          <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select params to find lightings data
          </DialogContentText>
          
            {/* <ListItemIcon>
                // <DashboardIcon />
            </ListItemIcon> */}
           
            <TextField
            id="init"
            label="Initial Datetime"
            type="datetime-local"
            // onChange={handleFilterData}
            className={classes.textField}
            
            InputLabelProps={{
            shrink: true,
            }}
            />
            {/* <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon> */}
            
            <TextField
                id="end"
                label="End Datetime"
                type="datetime-local"
                className={classes.textField}
                // onChange={handleFilterData}
                InputLabelProps={{
                shrink: true,
                }}
            />
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
          
        </div>
            </Toolbar>

        </AppBar>

        <Drawer
        variant="permanent"
        classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        >
        <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
        </IconButton>
        </div>
        <Divider />
        <List><IForm/></List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        </React.Fragment>
    )
}
export default Page;
