import { combineReducers } from 'redux'

import fileReducer, { NAME as file } from './file'
import editorReducer, { NAME as editor } from './editor'
import popupReducer, { NAME as popup } from './popup'
import connectionReducer, { NAME as connection } from './connection'

const reducers = {
  [file]: fileReducer,
  [editor]: editorReducer,
  [popup]: popupReducer,
  [connection]: connectionReducer
}

export default combineReducers(reducers)
