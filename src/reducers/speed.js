import {
  SET_SPEED
} from '../constants/ActionTypes'

export default function score(state = 5, action) {
  switch (action.type) {
    case SET_SPEED:
      return action.payload
    default:
      return state
  }
}
