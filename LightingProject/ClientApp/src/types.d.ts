type InputHandlerParam = React.ChangeEvent<HTMLInputElement>;
type ClickHandlerParam = React.MouseEvent;

 interface IFilterLightning{
    end:string 
    init:string 
    
}
interface StateProps {
    lightnings : ILightning[]
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
    lightnings : ILightning[] 
}
type FilterLightningAction = {
    type: string,
    payload: LightningState,
    
}
 
