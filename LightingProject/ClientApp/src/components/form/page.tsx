import React, { Fragment }  from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
    //   marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    just:{
        justifyContent: 'center',
    },
  }),
);
  
function Page() {
    const classes = useStyles();
    return (
       <Fragment>
           <ListItem >
            {/* <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon> */}
           <form className={classes.container} noValidate>
            <TextField
            id="datetime-init"
            label="Initial Datetime"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            
            InputLabelProps={{
            shrink: true,
            }}
            />
            {/* <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon> */}
           
            <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </form>
            </ListItem>
            <ListItem className={classes.just}>
            <Button variant="contained" size="small" color="primary" >
            Filter 
            </Button>
            </ListItem>
        </Fragment>
    )
}
export default Page;