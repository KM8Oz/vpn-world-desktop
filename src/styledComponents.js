import styled from "styled-components";
import { Colors } from "./tools/colors";
import { animated } from "react-spring";
const ConnectionBtn = styled(animated.div)`
border-radius: 99px;
margin: auto;
height: 142px;
width: 142px;
display: flex;
justify-content: center;
align-items: center;
color: #00000059;
font-weight: 900;
cursor: pointer;
user-select: none;
`;
const Button = styled.div`
  height: 39px;
  background-color: ${({ backColor }) => backColor || Colors.empty};
  color: ${({ textColor }) => textColor || "#444"};
  width: 80%;
  max-width: 343px;
  border-radius: 8px;
  display: flex;
  margin: 5px auto;
  text-align: center;
  display: flex;
  user-select:unset;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  transition: all ease-in-out 100ms;
  transform: scale(1);
  cursor: pointer;
  font-weight: 600;
  &:active{
    transform: scale(.96);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export {
  Button,
  ConnectionBtn
}