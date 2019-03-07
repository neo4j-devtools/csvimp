import { combineReducers } from 'redux'

import fileReducer, { NAME as file } from './file'

const reducers = {
  [file]: fileReducer
}

export default combineReducers(reducers)
