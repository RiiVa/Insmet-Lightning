
import {Reducer,Action} from 'redux'



export const initialState: LightningState = {
    lightnings : [],
    formHistory : {
        end: '',
        init:'',
        cg:true,
        ic:true,
        peakCurrent:[],
        pulse:true,
        flash:true,
    },
    formLive : {
        cg:true,
        ic:true,
        peakCurrent:[],
        pulse:true,
        flash:true,
        timer: 15000,
        
    },
    live : false

}
export enum ActionType{
    FilterLight,
    ChangeFormHistory,
    ChangeFormLive,
    ChangeLive,
}

export interface DispatchAction extends Action<ActionType> {
    payload: Partial<LightningState>;
}


export const rootReducer: Reducer<LightningState, DispatchAction> = (state = initialState, action) => {
    
        switch(action.type) {
            case ActionType.FilterLight:
                return {...state, lightnings:action.payload.lightnings as ILightning[] ,};
            case ActionType.ChangeLive:
                return {...state, live:action.payload.live as boolean,};
            case ActionType.ChangeFormLive:
                return {...state, formLive:action.payload.formLive as FormLive, live: true,};
            case ActionType.ChangeFormHistory:
                return {...state,formHistory:action.payload.formHistory as FormHistory, live:false,};
            
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