export const NAME = 'popup'
export const SHOW = NAME + '/SHOW'
export const SET_PREVIEW = NAME + '/SET_PREVIEW'
export const SET_HEADERS = NAME + '/SET_HEADERS'

export const initialState = {
  visible: false
}

/**
 * Selectors
 */
export function getVisible (state) {
  return state[NAME].visible
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  const {
  } = action

  switch (action.type) {
    case SHOW:
      return {
        ...state,
        visible: true
      }

    default:
      return state
  }
}

/**
 * Actions
 */
export const showPopup = () => {
  return {
    type: SHOW
  }
}
