import Papa from 'papaparse'

import {
  getFile,
  getHeaders,
  SET_FILE,
  SET_HEADERS,
  setPreview
} from './file'

import {
  reset
} from './editor'

const reloadPreview = (file, hasHeaders, dispatch, resetEditor) => {
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

      const fixedData = data.map(row => row.map(val => {
        val = val.trim()
        let start, end
        for (start = 0; val[start] === '"'; start++);
        for (end = val.length - 1; val[end] === '"'; end--);
        return val.substr(start, end - start + 1)
      }))

      console.log('setting preview', fixedData)
      dispatch(setPreview(fixedData))
      if (resetEditor) {
        dispatch(reset(fixedData[0].length))
      }
    }
  })
}

export default function previewMiddleware ({ getState, dispatch }) {
  return next => action => {

    if (action.type === SET_FILE) {
      reloadPreview(action.file, getHeaders(getState()), dispatch, true)
    }

    if (action.type === SET_HEADERS) {
      reloadPreview(getFile(getState()), action.hasHeaders, dispatch, false)
    }

    return next(action)
  }
}