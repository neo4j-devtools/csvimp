export const NAME = 'editor'
export const RESET = NAME + '/RESET'
export const REORDER_COLUMN = NAME + '/REORDER_COLUMN'
export const ADD_NODE = NAME + '/ADD_NODE'
export const UPDATE_NODE = NAME + '/UPDATE_NODE'

export const initialState = {
  order: [],
  nodes: []
}

/**
 * Selectors
 */
export function getOrder (state) {
  return state[NAME].order
}

export function getNodes (state) {
  return state[NAME].nodes
}

/**
 * Reducer
 */
export default function (state = initialState, action = {}) {
  const {
    numColumns,
    fromIndex,
    toIndex,
    index,
    node
  } = action

  switch (action.type) {
    case RESET:
      let order = []
      for (let i = 0; i < numColumns; i++) {
        order.push(i)
      }
      return {
        ...state,
        order,
        nodes: []
      }

    case REORDER_COLUMN:
      let newOrder = state.order.slice()
      newOrder.splice(toIndex, 0, newOrder.splice(fromIndex, 1)[0])
      return {
        ...state,
        order: newOrder
      }

    case ADD_NODE: {
      const { nodes, order } = state
      const numColumns = order.length
      let newNodes = nodes.slice()

      for (let i = 0; i <= nodes.length; i++) {
        const start = i === 0 ? 0 : nodes[i - 1].to
        const end = i === nodes.length ? numColumns : nodes[i].from
        if (node.from >= start && node.to <= end) {
          newNodes.splice(i, 0, node)
        }
      }
  
      return {
        ...state,
        nodes: newNodes
      }
    }

    case UPDATE_NODE:
      const { nodes } = state
      return {
        ...state,
        nodes: nodes.map((n, i) => i === index
          ? { ...n, ...node }
          : n
        )
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

export const addNode = (from, to) => {
  return {
    type: ADD_NODE,
    node: {
      from,
      to
    }
  }
}

export const updateNode = (index, data) => {
  return {
    type: UPDATE_NODE,
    index,
    node: data
  }
}
