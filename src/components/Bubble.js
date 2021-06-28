import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, addScore } from '../actions';
import { isOverlapping } from '../lib/common';
import { GAME_OFF, GAME_ON, GAME_PAUSED, GAME_OVER } from '../constants/GameStates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHammer, faBriefcase, faBriefcaseMedical, faLaptopCode, faBroom, faWrench, faPhoneAlt, faVideo, faCameraRetro, faWallet, faSchool, faPaintRoller, faUserTie, faCashRegister, faCommentsDollar, faUserNurse, faDollarSign, faCreditCard, faHotel, faHospital, faMarker, faRobot } from "@fortawesome/free-solid-svg-icons";
library.add(faHammer, faBriefcase, faBriefcaseMedical, faLaptopCode, faBroom, faWrench, faPhoneAlt, faVideo, faCameraRetro, faWallet, faSchool, faPaintRoller, faUserTie, faCashRegister, faCommentsDollar, faUserNurse, faDollarSign, faCreditCard, faHotel, faHospital, faMarker, faRobot);
const icons = [ 'broom', 'hammer', 'briefcase', 'briefcase-medical', 'laptop-code', 'wrench', 'phone-alt', 'video', 'camera-retro', 'wallet', 'school', 'paint-roller', 'user-tie', 'cash-register', 'comments-dollar', 'user-nurse', 'dollar-sign', 'credit-card', 'hotel', 'hospital', 'marker', 'robot' ];

const getRandomIcon = () => {
  return icons[Math.floor(Math.random() * icons.length)];
}

const Bubble = props => {
  const [iconString] = useState(getRandomIcon());
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const { id, gameOver, removeBubble, size } = props;
  const moveIncrement = 1;
  const bubbleElement = useRef(null);
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const value = 10 - (Math.round(size/10)) + 1;
  const spikesElement = document.getElementById('spikes');
  let yCounter = 0;

  useEffect(() => {
    document.addEventListener('UPDATE_BUBLES', updateBubble);

    return () => {
      document.removeEventListener('UPDATE_BUBLES', updateBubble);
    };
  }, []);

  const updateBubble = e => {
    yCounter += moveIncrement;
    setY(yCounter);

    if (bubbleElement.current !== null) {
      if (isOverlapping(bubbleElement.current, spikesElement)) {
        gameOver();
      }
    }
  }

  const pop = () => {
    if (gameState === GAME_ON) {
      dispatch(addScore(value));
      dispatch(addJob(1));
      removeBubble(id);
    }
  }

  return (
    <div
      className="bubble"
      onClick={pop}
      ref={bubbleElement}
      style={{
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`
      }}
    >
      <div className="bubble_icon-container" style={{transform: `translateY(-50%) scale(${size/50})`}}>
        <FontAwesomeIcon icon={iconString} />
      </div>
    </div>
  );
}

export default Bubble;