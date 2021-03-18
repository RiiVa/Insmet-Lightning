// TODO
// falta poner el error de los tipos de rayos
// validar en el frontend las fechas validas, poner un limite del ano actual ademas del rango de las fechas
// validar en el backend si la lista es vacia no existe ningun rayo guardado en la bd con esas caracteristicas





import React, { Fragment , useState,useEffect}  from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux'
import {RootDispatcher} from '../../redux/actions/actionCreators'

import Button from '@material-ui/core/Button';
import axios from 'axios'
import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Switch } from '@material-ui/core';
import { FormGroup } from 'reactstrap';
import { Checkbox } from '@material-ui/core';
import { PlaylistPlay } from '@material-ui/icons';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
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
// type Props = {
//   filterLight: (filter : IFilterLightning | any) => void
// } 

// function valuetext(value: number) {
//   return `${value}`;
// }

function Page(  ) {
    const classes = useStyles();
    
    
    
    const [peakInit, setPeakInit] = React.useState('');
    const [peakEnd, setPeakEnd] = React.useState('');
    const [state, setState] = React.useState({
      ic: true,
      cg: true,
    });
    const { ic, cg } = state;
    const error = ic || cg;
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    };
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

    
    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);
    const interval = 60000
    const delay = 70000
    const timerAction = () =>{
      // e.preventDefault()
      // console.log(filter)
      const formdata = new FormData()
      
      console.log(peakInit,"peakInit");
      console.log(peakEnd,"peakEnd");
      console.log(cg,"cg");
      console.log(ic,"ic");
      console.log(moment().format('YYYY[-]MM[-]DD[T]HH[:]MM[:]SS'),'time')
      formdata.append('init', moment().subtract(-1,'minutes').format('YYYY[-]MM[-]DD[T]HH[:]MM') )
      formdata.append('end', moment().format('YYYY[-]MM[-]DD[T]HH[:]MM') )
     
      formdata.append('peak',  (peakInit === '')? '0':peakInit  )
      formdata.append('peak', (peakEnd === '')?'0':peakEnd );
      
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
        rootDispatcher.filterLight(res.data as ILightning[])
        }
      })
    }
    useEffect(() => {
      let intervalId:NodeJS.Timeout;
      console.log("useEffect trigger", delay, interval);
  
      const timerId = setTimeout(() => {
        console.log("-- exec time --");
        timerAction();
  
        intervalId = setInterval(() => {
          console.log(" -- exec interval --");
          timerAction();
        }, interval);
  
        return () => {
          console.log("clearing interval");
          clearInterval(intervalId);
        };
      }, delay);
  
      return () => {
        console.log("clearing-both");
        clearInterval(intervalId);
        clearTimeout(timerId);
      };
    }, [delay, interval]);

    return (
       <Fragment>
         <form className={classes.container} noValidate>
           <ListItem className={classes.just}>
            {/* <ListItemIcon>
                // <DashboardIcon />
            </ListItemIcon> */}
           
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
                  // control={<Checkbox checked={ic} onChange={handleTypeFlash('ic')} value="ic" color='primary'/>}
                  control={<Switch checked={ic} onChange={handleTypeFlash('ic')} name="checkedA" color="primary"/>}
                  label="IC"
                />
                <FormControlLabel
                  // control={<Checkbox checked={cg} onChange={handleTypeFlash('cg')} value="cg" color='primary' />}
                  control={<Switch checked={cg} onChange={handleTypeFlash('cg')} name="checkedA" color="primary"/>}
                  label="CG"
                />
                
              </FormGroup>
            </ListItem>
            <ListItem className={classes.just}>
            <FormControl component="fieldset">
              
              <RadioGroup row aria-label="position" name="position" defaultValue="1">
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="1 min"
                
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="15 min"
                
              />
              <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label="30 min"
              
            />
            <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="60 min"
            
            />
              </RadioGroup>
              </FormControl>
              </ListItem>
              <ListItem className={classes.just}>
              
              
              <IconButton color='primary' >
                <PlayCircleFilledIcon/>
              </IconButton>
            </ListItem>
            </form>
            
        </Fragment>
    )
}
export default Page;