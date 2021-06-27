import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGameState, setSpeed } from '../actions';
import Col from './Col';
import Row from './Row';
import { GAME_OFF, GAME_ON, GAME_PAUSED, GAME_OVER } from '../constants/GameStates';
import { getHiScoreLocalStorage, setHiScoreLocalStorage } from '../lib/common';

const Header = () => {
  const dispatch = useDispatch();
  const [speedSliderValue, setSpeedSliderValue] = useState(5);
  const gameState = useSelector(state => state.gameState);
  const score = useSelector(state => state.score);
  const jobs = useSelector(state => state.jobs);
  const [hiScore, setHiScore] = useState(getHiScoreLocalStorage());
  const minSpeed = 1;
  const maxSpeed = 10;
  const newGame = () => { dispatch(changeGameState(GAME_ON)); }
  const pauseGame = () => { dispatch(changeGameState(GAME_PAUSED)); }
  const resumeGame = () => { dispatch(changeGameState(GAME_ON)); }
  const restartGame = () => { dispatch(changeGameState(GAME_OFF)); }

  useEffect(() => {
    if (score > hiScore) {
      setHiScore(score);
      setHiScoreLocalStorage(score);
    }
  }, [score]);

  const speedSet = (e) => {
    setSpeedSliderValue(e.target.value);
    dispatch(setSpeed(e.target.value));
  }

  return (
  <div id="header" className="header">
    <Row>
      <Col flex={1}>
        <Row>
          <Col>
            <h2 className="score-lbl">SCORE</h2>
            <h3 id="score-value" className="score-value">{score}</h3>
          </Col>
          <Col>
            <h2 className="score-lbl">HI-SCORE</h2>
            <h3 id="score-value" className="score-value">{hiScore}</h3>
          </Col>
          <Col>
            <h2 className="score-lbl">JOBS</h2>
            <h3 id="score-value" className="score-value">{jobs}</h3>
          </Col>
        </Row>
      </Col>
      <Col>
        { gameState === GAME_OFF && <button id="btn-game-start" className="btn-game-start" onClick={newGame}>Start</button> }
        { gameState === GAME_ON && <button id="btn-game-pause" className="btn-game-pause" onClick={pauseGame}>Pause</button> }
        { gameState === GAME_PAUSED && <button id="btn-game-resume" className="btn-game-resume" onClick={resumeGame}>Resume</button> }
        { gameState === GAME_OVER && <button id="btn-game-again" className="btn-game-again" onClick={restartGame}>Again</button> }
      </Col>
    </Row>
    <input id="speed-slider" type="range" min={minSpeed} max={maxSpeed} step={1} value={speedSliderValue} className="slider" onInput={speedSet} />
    <h5 className="speed-lbl">SPEED: {speedSliderValue}</h5>
  </div>
  );
}

export default Header;