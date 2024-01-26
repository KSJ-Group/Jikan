import { useEffect, useState, useContext } from 'react';
import styles from '../styles/Clock/Clock.module.css';
import moment from 'moment';
import { SettingsContext } from '../contexts/SettingsContext';
import { StylesContext } from '../contexts/StylesContext';
import Head from "next/head";
import styled from "styled-components";
import Draggable from 'react-draggable';

interface Props {
  size: string;
  opacity: number;
  color: string;
  children: any;
}

interface Font {
  font: any;
  size: string;
  children: any;
}

const ClockDiv = styled.div<Props>`
  padding: 0 2vw;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${props => `rgb(${props.color}, ${props.opacity / 100})` || 'rgb(0, 0, 0, 0.4)'};

  @media screen and (max-width: 450px) {
    margin-top: -300px;
  }

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  &:hover {
    strong {
      display: block;
    }
  }
`

const DragIcon = styled.strong`
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
`

const DragImg = styled.img<{ src: string, alt: string }>`
  height: 20px;
  width: 20px;
  transform: rotate(45deg);
  filter: invert(1);
  user-drag: none;
  -webkit-user-drag: none;
`

const ClockFont = styled.div<Font>`
  font-family: ${(props) => props.font}, monospace;
  font-size: ${(props) => {
    if (props.size === 'small') {
      return '5vw';
    } else if (props.size === 'medium') {
      return '9vw';
    } else if (props.size === 'large') {
      return '15vw';
    }
  }};
  font-weight: bold;
  color: white;
`

let interval: number;

const Clock = () => {
  const [time, setTime] = useState<string>('');
  const [is24andSeconds, a] = useState<boolean>();
  const [is24, b] = useState<boolean>();
  const [is12andSeconds, c] = useState<boolean>();
  const [is12, d] = useState<boolean>();
  const { showSeconds, is24Hour } = useContext(SettingsContext);
  const { selectedFont, size, opacity, color, pos, setPos } = useContext(StylesContext);

  const resetPosition = () => {
    setPos({ x: 0, y: 0 });
  }

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setPos({ x, y });
  };

  useEffect(() => {
    setTime(moment().format('h:mm A'));
    window.addEventListener('resize', resetPosition);
    return () => window.removeEventListener('resize', resetPosition);
  }, [])

  useEffect(() => {
    clearInterval(interval);
    interval = 0;
    interval = window.setInterval(updateTime, 1000);
    if (is24Hour) {
      if (showSeconds) {
        a(true);
        b(false);
        c(false);
        d(false);
      } else {
        a(false);
        b(true);
        c(false);
        d(false);
      }
    } else {
      if (showSeconds) {
        a(false);
        b(false);
        c(true);
        d(false);
      } else {
        a(false);
        b(false);
        c(false);
        d(true);
      }
    }
  }, [showSeconds, is24Hour])

  const updateTime = (): void => {
    if (is24Hour) {
      if (showSeconds) {
        setTime(moment().format('H:mm:ss'));
        a(true);
        b(false);
        c(false);
        d(false);
      } else {
        setTime(moment().format('H:mm'));
        a(false);
        b(true);
        c(false);
        d(false);
      }
    } else {
      if (showSeconds) {
        setTime(moment().format('h:mm:ss A'));
        a(false);
        b(false);
        c(true);
        d(false);
      } else {
        setTime(moment().format('h:mm A'));
        a(false);
        b(false);
        c(false);
        d(true);
      }
    }
  }

  return (
    <>
      <Head>
        {time ? <title>Jikan | {time}</title> :
          <title>Jikan | Clock</title>}
      </Head>
      <Draggable grid={[10, 10]} handle="strong" bounds="parent" position={pos} onDrag={onControlledDrag}>
        <ClockDiv size={size} opacity={opacity} color={color}>
          <DragIcon><DragImg src="/images/draggable-icon.png" alt="drag icon" /></DragIcon>
          {is24andSeconds ? <ClockFont size={size} font={selectedFont} className={styles.timeA}>{time}</ClockFont> : null}
          {is24 ? <ClockFont size={size} font={selectedFont} className={styles.timeB}>{time}</ClockFont> : null}
          {is12andSeconds ? <ClockFont size={size} font={selectedFont} className={styles.timeC}>{time}</ClockFont> : null}
          {is12 ? <ClockFont size={size} font={selectedFont} className={styles.timeD}>{time}</ClockFont> : null}
        </ClockDiv>
      </Draggable>
    </>
  );
};

export default Clock;