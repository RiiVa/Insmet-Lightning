// import {LatLngTuple} from 'leaflet';
// const initLightnings: Array<LatLngTuple> = [[28,43],[29,40]] 

// function reducer(state = initLightnings, {type,payload:data}){
//     switch(action.type){
//         default:
//             return state;
//     }
// }

import {FILTER_LIGHTNING} from '../actions/actionTypes';
import {Reducer,Action} from 'redux'



export const initialState: LightningState = {
    lightnings : []
}
export enum ActionType{
    FilterLight,
}

export interface DispatchAction extends Action<ActionType> {
    payload: Partial<LightningState>;
}


export const rootReducer: Reducer<LightningState, DispatchAction> = (state = initialState, action) => {
    
        switch(action.type) {
            case ActionType.FilterLight:
                return {...state, lightnings:action.payload.lightnings as ILightning[] ,};
            default:
                return state;
    };
}
// export const filterReducer: Reducer<LightningState,FilterLightningAction> = (state=initialState ,action) => {
//     switch(action.type){
//         case FILTER_LIGHTNING:
//             console.log(action.payload,"entro aqui")
//             return action.payload
//         default :
//             return state;
//     }
// }