import {
  ADD_JOB,
  SET_JOBS,
  ADD_SCORE,
  SET_SCORE,
  SET_SPEED,
  CHANGE_GAME_STATE
} from '../constants/ActionTypes';

export const addJob = value => ({ type: ADD_JOB, payload: value })
export const setJobs = value => ({ type: ADD_JOB, payload: value })
export const addScore = value => ({ type: ADD_SCORE, payload: value })
export const setScore = value => ({ type: SET_SCORE, payload: value })
export const setSpeed = value => ({ type: SET_SPEED, payload: value })
export const changeGameState = value => ({ type: CHANGE_GAME_STATE, payload: value })
