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
import { Checkbox, CssBaseline, FormControlLabel, FormGroup, ListItem, TextField } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatcher } from '../../redux/actions/actionCreators';
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
        flexDirection: 'row',
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
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);
  const {formHistory} = useSelector<LightningState, StatePropsHistory>((state: LightningState) => {
    return {
        formHistory : state.formHistory
    }
});

  // const [filter,setFilter] = React.useState<IFilterLightning | {}>()
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [peakInit, setPeakInit] = React.useState('');
  //   const [peakEnd, setPeakEnd] = React.useState('');
  //   const [state, setState] = React.useState({
  //     ic: true,
  //     cg: true,
  //   });
    const { ic, cg } = formHistory;
    
    const error = ic || cg;
    const validation = () => {
      // if (filter === undefined) return true;
      if ( formHistory.init === '' || formHistory.end === '') return true;
      if(Date.parse(formHistory.end) > Date.parse(moment().toString()) ) return true;
      
      // console.log(moment(formHistory.init))
      // console.log(moment(formHistory.end))
      // console.log(moment(formHistory.end).diff(moment(formHistory.init),'days'))
      if(moment(formHistory.end).diff(moment(formHistory.init),'days')> 1) return true;
      if( Date.parse(formHistory.init)>= Date.parse(formHistory.end) )return true;
      
      if (!error ) return true; 
      return false;
    }
    const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>)=>{
      // console.log(filter)
      // setFilter({
      //   ...filter,[e.currentTarget.id]: e.currentTarget.value,
      // })
      // console.log(e)
      rootDispatcher.formHistory({...formHistory,[e.currentTarget.id]:e.currentTarget.value})
      console.log(formHistory)
    }
    const handleTypeFlash = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // setState({ ...state, [name]: event.target.checked });
      rootDispatcher.formHistory({...formHistory,[name]:event.target.checked})
      
    };
    
    const handlePeakInit = (event: React.ChangeEvent<HTMLInputElement>) => {
      // setPeakInit(event.target.value);
      rootDispatcher.formHistory({...formHistory,peakCurrent:[event.target.value,formHistory.peakCurrent[1]]})
    };
    const handlePeakEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
      // setPeakEnd(event.target.value);
      rootDispatcher.formHistory({...formHistory,peakCurrent:[formHistory.peakCurrent[0],event.target.value]})
    };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  

  const handleHistory = (e:React.FormEvent) => {
    e.preventDefault()
      // console.log(filter)
      const formdata = new FormData()
      
      // console.log(peakInit,"peakInit");
      // console.log(peakEnd,"peakEnd");
      // console.log(cg,"cg");
      // console.log(ic,"ic");
      // console.log(moment().format())
      // console.log(moment('2021-03-19 22:00').format('YYYY[-]MM[-]DD[T]HH[:]mm'))
      // const testMeteoro = moment('2021-03-19 22:00')
      // const testMeteoroEnd = moment('2021-03-19 22:10')
      // console.log(moment().subtract(formLive.timer/1000,'seconds').format('YYYY[-]MM[-]DD[T]HH[:]mm[:]ss'))
      // formdata.append('init', moment().subtract(-1,'minutes').format('YYYY[-]MM[-]DD[T]HH[:]mm') )
      // formdata.append('end', moment().format('YYYY[-]MM[-]DD[T]HH[:]mm') )

    //  formdata.append('init',(filter as IFilterLightning).init)
    //  formdata.append('end',(filter as IFilterLightning).end)
    //   formdata.append('peak',  (peakInit === '')? '0':peakInit  )
    //   formdata.append('peak', (peakEnd === '')?'0':peakEnd );
    console.log()
    formdata.append('init',formHistory.init)
     formdata.append('end',formHistory.end)
      formdata.append('peak',  (formHistory.peakCurrent[0] === '')? '0':formHistory.peakCurrent[0] )
      formdata.append('peak', (formHistory.peakCurrent[1] === '')? '0':formHistory.peakCurrent[1] );
      if(cg && ic)formdata.append('type', '2'  ) ;
      else{if (cg)formdata.append('type', '0'  ) ;
      if (ic)formdata.append('type', '1'  ) ;}
      axios.post('/weatherforecast/Light',  formdata )
      .then(res => {
        // console.log(res);
        if(res.status === 500){
          alert('Connection Alert')
        }
        else{
        console.log(res.data as ILightning[])
        rootDispatcher.filterLightHistory(res.data as ILightning[])
        // rootDispatcher.changeLive(false)
        }
      })
      
    rootDispatcher.changeLive(false)
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
          <CssBaseline/>
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
            onChange={handleFilterData}
            className={classes.textField}
            value={formHistory.init}
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
                onChange={handleFilterData}
                value={formHistory.end}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <ListItem >
            <TextField id="peakInit" label="PeakInit" value={formHistory.peakCurrent[0]} onChange={handlePeakInit}/>
            <TextField id="peakEnd" label="PeakEnd" value={formHistory.peakCurrent[1]} onChange={handlePeakEnd}/>
            </ListItem>
            <ListItem className={classes.just}>
              <FormGroup className={classes.just}>
                <FormControlLabel
                  control={<Checkbox checked={ic} onChange={handleTypeFlash('ic')} value="ic" color='primary'/>}
                  label="IC"
                />
                <FormControlLabel
                  control={<Checkbox checked={cg} onChange={handleTypeFlash('cg')} value="cg" color='primary' />}
                  label="CG"
                />
                
              </FormGroup>
            </ListItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleHistory} disabled={validation()} color="primary">
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
