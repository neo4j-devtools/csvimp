export const NAME = 'popup'
export const SHOW = NAME + '/SHOW'
export const HIDE = NAME + '/HIDE'

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

    case HIDE:
      return {
        ...state,
        visible: false
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

export const hidePopup = () => {
  return {
    type: HIDE
  }
}
