// TODO
// falta poner el error de los tipos de rayos
// validar en el frontend las fechas validas, poner un limite del ano actual ademas del rango de las fechas
// validar en el backend si la lista es vacia no existe ningun rayo guardado en la bd con esas caracteristicas





import React, { Fragment , useState}  from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import {RootDispatcher} from '../../redux/actions/actionCreators'

import Button from '@material-ui/core/Button';
import axios from 'axios'
import { FormControlLabel } from '@material-ui/core';
import { FormGroup } from 'reactstrap';
import { Checkbox } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
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
    
  }),
);
type Props = {
  filterLight: (filter : IFilterLightning | any) => void
} 

// function valuetext(value: number) {
//   return `${value}`;
// }

function Page(  ) {
    const classes = useStyles();
    const [filter,setFilter] = useState<IFilterLightning | {}>()
    
    
    const [peakInit, setPeakInit] = React.useState('');
    const [peakEnd, setPeakEnd] = React.useState('');
    const [state, setState] = React.useState({
      ic: true,
      cg: true,
    });
    const { ic, cg } = state;
    const error = ic || cg;
    
    // borrar cuando se le muestre a osa

    // const [peakCurrent, setPeakC] = React.useState<number[]>([-10000, 10000]);
    // const handlePeakCurrent = (event: any, newValue: number | number[]) => {
    //   setPeakC(newValue as number[]);
    // };

    // 
    const handleTypeFlash = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [name]: event.target.checked });
    };
    
    const handlePeakInit = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPeakInit(event.target.value);
    };
    const handlePeakEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPeakEnd(event.target.value);
    };

    const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>)=>{
      console.log(filter)
      setFilter({
        ...filter,[e.currentTarget.id]: e.currentTarget.value,
      })
    }
    const validation = () => {
      if (filter == undefined) return true;
      if ( (filter as IFilterLightning).init == undefined || (filter as IFilterLightning).end == undefined) return true;
      
      if( Date.parse((filter as IFilterLightning).init)>= Date.parse((filter as IFilterLightning).end) )return true;
      
      if (!error ) return true; 
      return false;
    }
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);

    const filterLightning = (e:React.FormEvent) =>{
      e.preventDefault()
      // console.log(filter)
      const formdata = new FormData()
      const filter2 = filter as IFilterLightning
      console.log(peakInit,"peakInit");
      console.log(peakEnd,"peakEnd");
      console.log(cg,"cg");
      console.log(ic,"ic");
      
      formdata.append('init', filter2.init )
      formdata.append('end',filter2.end )
     
      formdata.append('peak',  (peakInit == '')? '0':peakInit  )
      formdata.append('peak', (peakEnd == '')?'0':peakEnd );
      
      if(cg && ic)formdata.append('type', '2'  ) ;
      else{if (cg)formdata.append('type', '0'  ) ;
      if (ic)formdata.append('type', '1'  ) ;}
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
                // <DashboardIcon />
            </ListItemIcon> */}
           
            <TextField
            id="init"
            label="Initial Datetime"
            type="datetime-local"
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
                className={classes.textField}
                onChange={handleFilterData}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </ListItem>
            {/* <ListItem className={classes.just}>
              <Slider
              aria-label = 'hello'
              value={peakCurrent}
              onChange={handlePeakCurrent}
                min = {-100000}
                max = {100000}
                valueLabelDisplay='auto'
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </ListItem> */}
            <ListItem >
            <TextField id="peakInit" label="PeakInit" value={peakInit} onChange={handlePeakInit}/>
            <TextField id="peakEnd" label="PeakEnd" value={peakEnd} onChange={handlePeakEnd}/>
            </ListItem>
            <ListItem className={classes.just}>
              <FormGroup>
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

            <ListItem className={classes.just}>
            <Button type="submit" disabled={validation()} variant="contained" size="small" color="primary" >
            Filter 
            </Button>
            
            </ListItem>
            </form>
            
        </Fragment>
    )
}
export default Page;