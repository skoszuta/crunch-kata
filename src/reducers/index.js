import { combineReducers } from 'redux';

import variablesReducer from './variables-reducer';

const rootReducer = combineReducers({
  variables: variablesReducer
});

export default rootReducer;
