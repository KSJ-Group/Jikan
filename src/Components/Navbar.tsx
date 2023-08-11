import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar/Navbar.module.css';
import Head from 'next/head';
import Settings from './Settings/Settings';
import { SettingsContext } from '../contexts/SettingsContext';
import styled from "styled-components";
import { StylesContext } from '../contexts/StylesContext';

interface Font {
  font: any;
}

interface Props {
  opacity: number;
  color: string;
}

const Nav = styled.nav<Props>`
  height: 60px;
  z-index: 10;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${props => `rgb(${props.color}, ${props.opacity / 100})` || 'rgb(0, 0, 0, 0.4)'};
`

const StyledFont = styled.span<Font>`
  font-family: ${(props) => props.font}, monospace;
  position: relative;
  top: 1px;
`

const Navbar: React.FC = () => {
  const [clockIsActive, setClockIsActive] = useState<boolean>(true);
  const [pomIsActive, setPomIsActive] = useState<boolean>(false);
  const { setIsClock, showSettings, setShowSettings, isMobile } = useContext(SettingsContext);
  const { selectedFont, opacity, color } = useContext(StylesContext);

  useEffect(() => {
    setIsClock(clockIsActive);
  }, [clockIsActive])
  const clickLinkClock = (): void => {
    if (!clockIsActive) {
      setClockIsActive(true);
      setPomIsActive(false);
    }
  }

  const clickLinkPom = (): void => {
    if (!pomIsActive) {
      setPomIsActive(true);
      setClockIsActive(false);
    }
  }

  useEffect(() => {
    if (window.location.href.includes('pomodoro')) {
      setClockIsActive(false);
      setPomIsActive(true);
    }
  }, []);

  useEffect(() => {
    if (clockIsActive) {
      document.getElementById('clock')?.classList.add('activeLink');
      document.getElementById('timer')?.classList.remove('activeLink');
      document.getElementById('clock')?.classList.remove('inactiveLink');
      document.getElementById('timer')?.classList.add('inactiveLink');
    } else if (pomIsActive) {
      document.getElementById('timer')?.classList.add('activeLink');
      document.getElementById('clock')?.classList.remove('activeLink');
      document.getElementById('timer')?.classList.remove('inactiveLink');
      document.getElementById('clock')?.classList.add('inactiveLink');
    }
  }, [clockIsActive, pomIsActive])

  useEffect(() => {
    const settings = document.querySelector('.offcanvas');
    if (showSettings) {
      settings?.classList.add('settings-styling');
    } else {
      settings?.classList.remove('settings-styling');
    }
  }, [showSettings])


  const toggleFullscreen = (): void => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"></script>

        <script>var Alert = ReactBootstrap.Alert; </script>

        <script src="https://kit.fontawesome.com/5a44324c7d.js" crossOrigin="anonymous"></script>
      </Head>
      <Nav opacity={opacity} color={color}>
        <div className={styles.mainLinks}>
          <Link href="/"><a className={styles.link} id='clock' onClick={clickLinkClock}><StyledFont font={selectedFont}>Clock</StyledFont></a></Link>
          <div className={styles.line}>|</div>
          <Link href="/pomodoro"><a className={styles.link} id='timer' onClick={clickLinkPom}><StyledFont font={selectedFont}>Pomodoro</StyledFont></a></Link>
        </div>
        {isMobile ? null :
          <div onClick={() => toggleFullscreen()} className={styles.fs}>
            <img src='/images/fullscreen.png' alt='fullscreen icon' className={styles.fullscreen} />
            <div className={styles.fsText}><StyledFont font={selectedFont}>Fullscreen</StyledFont></div>
          </div>
        }
        <div className={styles.settings} onClick={() => setShowSettings(!showSettings)}>
          <img className={styles.menuIcon} src='/images/menu.png' alt='menu icon' />
          <div className={styles.settingsWord}><StyledFont font={selectedFont}>Settings</StyledFont></div>
        </div>
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      </Nav>
    </>
  );
};

export default Navbar;