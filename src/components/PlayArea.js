import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME_OFF, GAME_ON, GAME_PAUSED, GAME_OVER } from '../constants/GameStates';
import { changeGameState, setJobs, setScore } from '../actions';
import Bubble from './Bubble';
import IndeedLogo from './IndeedLogo';
import Spikes from './Spikes';
import Wave from './Wave';
import { useInterval}  from '../hooks/useInterval';

const getRandomBubbleX = (size) => {
  return Math.floor(Math.random() * ((document.getElementById('play-area').offsetWidth - size - 2) - 0 + 1)) + 0;
}

const getRandomSize = () => {
  return Math.floor(Math.random() * (100 - 10 + 1)) + 10;
}

const PlayArea = props => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const score = useSelector((state) => state.score);
  const speed = useSelector((state) => state.speed);
  const jobs = useSelector(state => state.jobs);
  const [bubbles, setBubbles] = React.useState([]);
  let spawnSpeed = 5000 / (speed);
  let bubbleUpdateSpeed = 1000 / (speed * 10); // 10-100 pixels per second.
  let countForID = 0;

  useInterval(() => {
    if (gameState === GAME_OFF) {
      setBubbles([]);
      dispatch(setScore(0));
      dispatch(setJobs(0));
    }
  }, gameState);

  useInterval(() => {
    if (gameState === GAME_ON) {
      document.dispatchEvent(new Event('UPDATE_BUBLES'));
    }
  }, bubbleUpdateSpeed);

  useInterval(() => {
    if (gameState === GAME_ON) {
      addBubble();
    }
  }, spawnSpeed);

  React.useEffect(() => {
    if (score === 0) {
      setBubbles([]);
    }
  }, [score]);

  const gameOver = () => {
    dispatch(changeGameState(GAME_OVER));
  }

  const removeBubble = (id) => {
    setBubbles(bubbles.filter(b => b.id !== id));
  }

  const getNextBubbleId = () => {
    return bubbles.length > 0 ? bubbles[bubbles.length-1].id+1 : 0;
  }

  const addBubble = () => {
    countForID += 1;
    const size = getRandomSize();
    const newBubbles = [...bubbles, { id: getNextBubbleId(), x: getRandomBubbleX(size), y: 0, size: size }];
    setBubbles(newBubbles);
  }

  return <div id="play-area" className="play-area">
    { gameState === GAME_OFF &&
    <div className="game-paused-off">
      <IndeedLogo/>
      <p className="game-title">
        <p>HELP PEOPLE</p>
        <p>GET JOBS</p>
      </p>
    </div>
    }
    { gameState === GAME_ON && <div className="game-on-overlay"><p>Go!</p></div> }
    { gameState === GAME_PAUSED && <div className="game-paused-overlay"><p>Paused</p></div> }
    { gameState === GAME_OVER && <div className="game-over-overlay"><p className="game-over-lbl">GAME OVER</p><p>You got {jobs} job{jobs === 1 ? '' : 's'} for {jobs === 1 ? 'somebody' : 'people'}!</p></div> }
    <Wave/>
    { gameState !== GAME_OFF && <Spikes/> }
    {
      bubbles.map((b) =><Bubble id={b.id} key={b.id} x={b.x} y={b.y} size={b.size} gameOver={gameOver} removeBubble={removeBubble} />)
    }
  </div>;
}

export default PlayArea;