import { createStore } from 'redux';
import {DispatchAction, rootReducer} from './reducers/reducerLightnings'
export const store = createStore<LightningState,DispatchAction,null,null>(rootReducer);


