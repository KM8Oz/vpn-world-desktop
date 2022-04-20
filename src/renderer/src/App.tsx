import React,{ useState, useMemo } from "react";
import styled from "styled-components";
import Logo from './icons/Logo';
import { useSpring, animated } from 'react-spring'
import { Sling as Hamburger } from 'hamburger-react'
import { Colors } from "./tools/colors";
import { useTranslation } from 'react-i18next';
import { About, Connection } from "./components"
import { useEffect } from "react";
function App() {
  const [isOpen, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const { i18n } = useTranslation();
  
  const styles = useSpring({ backgroundColor: isOpen ? Colors.default : connected ? Colors.positive  :Colors.empty })
  const about = useSpring({ transform: `scale(${!isOpen ? 1 : .9})`, opacity: isOpen ? 1 : 0, display: isOpen ? "flex" : "none" })
  const connection = useSpring({ transform: `scale(${isOpen ? 1 : .9})`, opacity: !isOpen ? 1 : 0, display: !isOpen ? "flex" : "none" })
  useEffect(() => {
    const lang = navigator.language;
    if (lang) {
      if (lang.search("ru") != -1) {
        i18n.changeLanguage("ru")
      } else {
        i18n.changeLanguage("en")
      }
    }
  }, [])
  useEffect(()=>{
    let win = window as any;
    if(win && win?.vpn){
      win.vpn.changeIcon("changeIcon",{status:connected})
    }
  },[connected])
  return (
    <Wrapper style={styles}>
      <Header>
        <LogoStyled fillColor={isOpen ? "#fff" : Colors.default} onClick={() => setOpen(false)} />
        <Hamburger size={24} color={"#444"} toggled={isOpen} toggle={setOpen} />
      </Header>
      <Body style={connection}>
        <Connection active={connected} setConnected={setConnected} />
      </Body>
      <Body style={about}>
        <About />
      </Body>
    </Wrapper>
  );
}
const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0px 1em;
  align-items: center;
`;
const Body = styled(animated.div)`
  grid-area: body;
`;
const LogoStyled = styled(Logo)`
  cursor: pointer;
  transition: all ease-in-out 100ms;
  transform: scale(1);
  :active{
  transform: scale(.98);
  }
`;
const Wrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr; 
  grid-template-rows: 0.3fr 1.7fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "header"
    "body";
`;

export default App;
