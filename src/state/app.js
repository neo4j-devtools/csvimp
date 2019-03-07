export const NAME = 'app'
export const SET_ACTIVE = 'connections/SET_ACTIVE'
export const SET_INACTIVE = 'connections/SET_INACTIVE'
export const SET_ATTEMPTING_CONNECTION = 'connections/SET_ATTEMPTING_CONNECTION'
export const SET_USER_HAS_WRITE_PERMISSIONS = 'connections/SET_USER_HAS_WRITE_PERMISSIONS'
export const SET_AVAILABLE_ROLES = 'connections/SET_AVAILABLE_ROLES'
export const SET_USER_ROLES = 'connections/SET_USER_ROLES'
export const SET_STORE_ID = 'connections/SET_STORE_ID'
export const UPDATE_CONNECTION_DETAILS = 'connections/UPDATE_CONNECTION_DETAILS'
export const SET_DISCOVERED_ADDRESS = 'connections/SET_DISCOVERED_ADDRESS'

export const initialState = {
  activeConnection: null,
  discoveredAddress: null
}

/**
 * Selectors
 */
export function getConnectionState (state) {
  return state[NAME].connectionState || initialState.connectionState
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE:
      return { ...state, activeConnection: 'ASDF' }
    default:
      return state
  }
}

/**
 * Actions
 */
export const setActiveConnection = () => {
  return {
    type: SET_ACTIVE
  }
}

