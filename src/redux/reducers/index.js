import { combineReducers } from 'redux';
import postSlice from './postSlice';

const appReducer = combineReducers({ postSlice })

const rootReducer = (state, actions) => { return appReducer(state, actions); }

export default rootReducer;
