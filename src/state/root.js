import { combineReducers } from 'redux'

import appReducer, { NAME as app } from './app'

const reducers = {
  [app]: appReducer
}

export default combineReducers(reducers)
