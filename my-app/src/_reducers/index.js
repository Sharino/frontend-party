import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { servers } from './servers.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
  authentication,
  servers,
  alert
});

export default rootReducer