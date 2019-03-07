export const NAME = 'app'
export const SET_FILE = NAME + '/SET_FILE'

export const initialState = {
  csvfile: null
}

/**
 * Selectors
 */
export function getFile (state) {
  return state[NAME].csvfile
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  const {
    filename
  } = action

  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        filename
      }
    default:
      return state
  }
}

/**
 * Actions
 */
export const setCsvFile = filename => {
  return {
    type: SET_FILE,
    filename
  }
}

