export const NAME = 'editor'
export const RESET = NAME + '/RESET'
export const REORDER_COLUMN = NAME + '/REORDER_COLUMN'

export const initialState = {
  order: []
}

/**
 * Selectors
 */
export function getOrder (state) {
  return state[NAME].order
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  const {
    numColumns,
    fromIndex,
    toIndex
  } = action

  switch (action.type) {
    case RESET:
      let order = []
      for (let i = 0; i < numColumns; i++) {
        order.push(i)
      }
      return {
        ...state,
        order
      }

    case REORDER_COLUMN:
      let newOrder = state.order.slice()
      newOrder.splice(toIndex, 0, newOrder.splice(fromIndex, 1)[0])
      return {
        ...state,
        order: newOrder
      }

    default:
      return state
  }
}

/**
 * Actions
 */
export const reset = (numColumns) => {
  return {
    type: RESET,
    numColumns
  }
}

export const reorder = (fromIndex, toIndex) => {
  return {
    type: REORDER_COLUMN,
    fromIndex,
    toIndex
  }
}
