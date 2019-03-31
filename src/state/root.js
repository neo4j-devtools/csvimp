import { combineReducers } from 'redux'

import fileReducer, { NAME as file } from './file'
import editorReducer, { NAME as editor } from './editor'
import popupReducer, { NAME as popup } from './popup'

const reducers = {
  [file]: fileReducer,
  [editor]: editorReducer,
  [popup]: popupReducer
}

export default combineReducers(reducers)
