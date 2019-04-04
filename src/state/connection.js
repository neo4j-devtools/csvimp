export const NAME = 'connection'
export const CONNECTED = NAME + '/CONNECTED'
export const DISCONNECTED = NAME + '/DISCONNECTED'

export const initialState = {
  connected: false
}

/**
 * Selectors
 */
export function getConnected (state) {
  return state[NAME].connected
}

export function getDriver (state) {
  return state[NAME].driver || null
}

export function getInfo (state) {
  return state[NAME].name && state[NAME].description 
    ? {
        name: state[NAME].name,
        description: state[NAME].description
      }
    : null
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  const {
    driver,
    name,
    description
  } = action

  switch (action.type) {
    case CONNECTED:
      return {
        driver,
        name,
        description,
        connected: true
      }

    case DISCONNECTED:
      return {
        connected: false
      }

    default:
      return state
  }
}

/**
 * Actions
 */
export const setConnected = (driver, name, description) => {
  return {
    type: CONNECTED,
    driver,
    name,
    description
  }
}

export const setDisconnected = () => {
  return {
    type: DISCONNECTED
  }
}
