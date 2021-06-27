import { combineReducers } from 'redux';
import gameState from './gameState';
import jobs from './jobs';
import score from './score';
import speed from './speed';

const rootReducer = combineReducers({
  gameState,
  jobs,
  score,
  speed,
})

export default rootReducer
