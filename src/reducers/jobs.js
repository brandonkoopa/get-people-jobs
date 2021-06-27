import {
  ADD_JOB,
  SET_SCORE
} from '../constants/ActionTypes'

export default function jobs(state = 0, action) {
  switch (action.type) {
    case ADD_JOB:
      return state + action.payload
    case SET_SCORE:
      return action.payload
    default:
      return state
  }
}
