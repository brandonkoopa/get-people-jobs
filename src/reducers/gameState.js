import {
  CHANGE_GAME_STATE
} from '../constants/ActionTypes';

import {
  GAME_OFF,
  GAME_ON,
  GAME_PAUSED,
  GAME_OVER
} from '../constants/GameStates';

export default function gameState(state = GAME_OFF, action) {
  switch (action.type) {
    case CHANGE_GAME_STATE:
      return action.payload
    default:
      return state
  }
}
