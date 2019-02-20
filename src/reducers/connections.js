import {} from '../actions'

export const initialState = {}

export function connections (state = initialState, action) {
  switch (action.type) {
    case Constants_1.PEER_CONNECTION_ADDED:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          connectionState: '',
          peerAddress: action.payload.peerAddress,
          receivingAudioMediaId: '',
          receivingVideoMediaId: '',
          sendingAudioMediaId: '',
          sendingVideoMediaId: ''
        }
      }
    case Constants_1.PEER_CONNECTION_UPDATED: {
      if (!state[action.payload.id]) {
        return state
      }

      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          peerAddress: action.payload.peerAddress,
          ...action.payload.updated
        }
      }
    }
    case Constants_1.PEER_CONNECTION_REMOVED: {
      const result = { ...state }
      delete result[action.payload.id]
      return result
    }
    default:
      return state
  }
}

// Selectors
export const getConnections = state => state.connections
