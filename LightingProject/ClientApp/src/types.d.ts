type InputHandlerParam = React.ChangeEvent<HTMLInputElement>;
type ClickHandlerParam = React.MouseEvent;

 interface IFilterLightning{
    end:string 
    init:string 
    
}
interface StateProps {
    lightnings : ILightning[]
    }
interface ILightning{

    ltime:Date
    ltype:number
    latitude:number
    longitude:number
    peakcurrent:number
    icheight:number
    numsensors:number
    icmultiplicity:number
    cgmultiplicity:number

}


 interface LightningState  {
    lightnings : ILightning[] 
}
type FilterLightningAction = {
    type: string,
    payload: LightningState,
    
}
 
