export const NAME = 'file'
export const SET_FILE = NAME + '/SET_FILE'
export const SET_PREVIEW = NAME + '/SET_PREVIEW'
export const SET_HEADERS = NAME + '/SET_HEADERS'

export const initialState = {
  file: null,
  hasHeaders: false,
  preview: null
}

/**
 * Selectors
 */
export function getFileName (state) {
  return state[NAME].file ? state[NAME].file.name : null
}

export function getInfo (state) {
  return state[NAME].file
    ? {
        size: state[NAME].file.size,
        modified: state[NAME].file.modified
      }
    : null
}

export function getFile (state) {
  return state[NAME].file
}

export function getHeaders (state) {
  return state[NAME].hasHeaders
}

export function getPreview (state) {
  return state[NAME].preview
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  const {
    file,
    hasHeaders,
    preview
  } = action

  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        file
      }

    case SET_HEADERS:
      return {
        ...state,
        hasHeaders
      }

    case SET_PREVIEW:
      return {
        ...state,
        preview: [...preview]
      }

    default:
      return state
  }
}

/**
 * Actions
 */
export const setCsvFile = (file) => {
  return {
    type: SET_FILE,
    file
  }
}

export const setHeaders = (hasHeaders) => {
  return {
    type: SET_HEADERS,
    hasHeaders
  }
}

export const setPreview = (preview) => {
  return {
    type: SET_PREVIEW,
    preview
  }
}
