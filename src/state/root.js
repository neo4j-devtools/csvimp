import { combineReducers } from 'redux'

import fileReducer, { NAME as file } from './file'
import editorReducer, { NAME as editor } from './editor'

const reducers = {
  [file]: fileReducer,
  [editor]: editorReducer
}

export default combineReducers(reducers)
