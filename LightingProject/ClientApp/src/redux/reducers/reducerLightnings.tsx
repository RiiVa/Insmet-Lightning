
import {Reducer,Action} from 'redux'



export const initialState: LightningState = {
    lightnings : [],
    formHistory : {
        end: '',
        init:'',
        cg:true,
        ic:true,
        peakCurrent:['',''],
        pulse:true,
        flash:true,
    },
    formLive : {
        cg:true,
        ic:true,
        peakCurrent:['',''],
        pulse:true,
        flash:true,
        timer: 1,
        
    },
    live : false,
    loggingIn : false,
    user : {
        username:'',
        token:''}

}
export enum ActionType{
    FilterLightHistory,
    FilterLightLive,
    ChangeFormHistory,
    ChangeFormLive,
    ChangeLive,
    Login,
    Logout

}

export interface DispatchAction extends Action<ActionType> {
    payload: Partial<LightningState>;
}


export const rootReducer: Reducer<LightningState, DispatchAction> = (state = initialState, action) => {
    
        switch(action.type) {
            case ActionType.FilterLightHistory:
                return {...state, lightnings:action.payload.lightnings as ILightning[] ,live:false as boolean};
                case ActionType.FilterLightLive:
                    return {...state,live: true as boolean, lightnings:action.payload.lightnings as ILightning[] ,};
            case ActionType.ChangeLive:
                return {...state, live:action.payload.live as boolean,formLive:action.payload.formLive as FormLive,};
            case ActionType.ChangeFormLive:
                return {...state, formLive:action.payload.formLive as FormLive, };
            case ActionType.ChangeFormHistory:
                return {...state,formHistory:action.payload.formHistory as FormHistory,};
            case ActionType.Login:
                return {...state,loggingIn:true,user : action.payload.user as IUser};
            case ActionType.Logout:
                return {...state,loggingIn:false};
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