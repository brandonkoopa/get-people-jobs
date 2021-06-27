import {
  ADD_SCORE,
  SET_SCORE
} from '../constants/ActionTypes'

export default function score(state = 0, action) {
  switch (action.type) {
    case ADD_SCORE:
      return state + action.payload
    case SET_SCORE:
      return action.payload
    default:
      return state
  }
}
