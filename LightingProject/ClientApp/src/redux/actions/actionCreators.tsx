import {FILTER_LIGHTNING} from "./actionTypes"
import {Dispatch} from 'redux'
import {DispatchAction, ActionType} from '../reducers/reducerLightnings'

// export const actionCreator = {
// filterLightning: (payload:LightningState) => async (dispatch:any,getState:any) => {
//   dispatch({type:FILTER_LIGHTNING, payload})
// }
// }


export class RootDispatcher {
      private readonly dispatch: Dispatch<DispatchAction>;
      constructor(dispatch: Dispatch<DispatchAction>){
          this.dispatch = dispatch; 
      }
      filterLight = (lightnings: ILightning[]) => this.dispatch({type: ActionType.FilterLight, payload: {lightnings}});
  }