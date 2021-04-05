type InputHandlerParam = React.ChangeEvent<HTMLInputElement>;
type ClickHandlerParam = React.MouseEvent;

 interface IFilterLightning{
    end:string 
    init:string 
    
}
interface StateProps {
    lightnings : ILightning[]
    }
interface StatePropsFormLive{
    live : boolean,
    formLive : FormLive,
}
interface StatePropsHistory{
    // live : boolean,
    formHistory : FormHistory,
}
interface StatePropsLive{
    // live : boolean,
    live : boolean,
}
interface LDate{
    id:number
    date1:Date
}
interface ILightning{
    id:number
    idDateNavigation:LDate
    ltype:number
    latitude:number
    longitude:number
    peakcurrent:number
    icheight:number
    sensor:number
    icmulti:number
    cgmulti:number
    pulses:number[]

}


 interface LightningState  {
    lightnings : ILightning[],
    formHistory : FormHistory,
    formLive : FormLive,
    live : boolean

}
interface FormHistory{
    end:string,
    init : string,
    peakCurrent : string[]
    cg : boolean,
    ic : boolean,
    pulse : boolean,
    flash : boolean,
}

interface FormLive{
    peakCurrent : string[]
    timer : number,
    cg : boolean,
    ic : boolean,
    pulse : boolean,
    flash : boolean,
}

type FilterLightningAction = {
    type: string,
    payload: LightningState,
    
}
 
