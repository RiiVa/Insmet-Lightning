import React, { Fragment , useState}  from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField, { StandardTextFieldProps, TextFieldClassKey, TextFieldProps } from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import {RootDispatcher} from '../../redux/actions/actionCreators'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';
import axios from 'axios'
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
type Props = {
  filterLight: (filter : IFilterLightning | any) => void
} 
function Page(  ) {
    const classes = useStyles();
    const [filter,setFilter] = useState<IFilterLightning | {}>()
    const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>)=>{
      console.log(filter)
      setFilter({
        ...filter,[e.currentTarget.id]: e.currentTarget.value,
      })
    }
    
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);

    const filterLightning = (e:React.FormEvent) =>{
      e.preventDefault()
      // console.log(filter)
      const formdata = new FormData()
      const filter2 = filter as IFilterLightning
      formdata.append('init', filter2.init )
      formdata.append('end',filter2.end )
      axios.post('/weatherforecast/Light',  formdata )
      .then(res => {
        console.log(res);
        console.log(res.data as ILightning[])
        rootDispatcher.filterLight(res.data as ILightning[])
      })
    }
    return (
       <Fragment>
         <form onSubmit={filterLightning} className={classes.container} noValidate>
           <ListItem className={classes.just}>
            {/* <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon> */}
           
            <TextField
            id="init"
            label="Initial Datetime"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            onChange={handleFilterData}
            className={classes.textField}
            
            InputLabelProps={{
            shrink: true,
            }}
            />
            {/* <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon> */}
            </ListItem>
           <ListItem className={classes.just}>
            <TextField
                id="end"
                label="End Datetime"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                onChange={handleFilterData}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </ListItem>
            <ListItem className={classes.just}>
            <Button type="submit" disabled={filter === undefined ? true : false} variant="contained" size="small" color="primary" >
            Filter 
            </Button>
            
            </ListItem>
            </form>
            
        </Fragment>
    )
}
export default Page;