import Papa from 'papaparse'

import {
  getFile,
  getHeaders,
  SET_FILE,
  SET_HEADERS,
  setPreview
} from './file';

const reloadPreview = (file, hasHeaders, dispatch) => {
  if (file === null) {
    return
  }

  console.log('reloadPreview', file)
  Papa.parse(file, {
    preview: hasHeaders ? 6 : 5,
    header: false,
    /*
    step: (result) => {
      // do stuff with result
      console.log('step', result)
    },
    */      
    complete: (results, file) => {
      let data = results.data

      if (!hasHeaders) {
        data = [
          data[0].map((_, i) => `Column ${i + 1}`),
          ...data
        ]
      }

      console.log('setting preview', data)
      dispatch(setPreview(data))
    }
  })
}

export default function previewMiddleware ({ getState, dispatch }) {
  return next => action => {

    if (action.type === SET_FILE) {
      reloadPreview(action.file, getHeaders(getState()), dispatch)
    }

    if (action.type === SET_HEADERS) {
      reloadPreview(getFile(getState()), action.hasHeaders, dispatch)
    }

    return next(action)
  }
}