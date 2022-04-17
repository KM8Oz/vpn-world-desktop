import React from "react";
import styled from "styled-components";
import { ConnectionBtn } from "../styledComponents"
import { useTranslation } from "react-i18next"
import { useSpring } from "react-spring";
function Connection({active, setConnected}){
    const { t } =  useTranslation();
    const stylebtn =  useSpring({
        background: active ?'linear-gradient(225deg, #95e194, #b2ffaf)':'linear-gradient(225deg, #ececec, #c7c7c7)',
        boxShadow: active ? '-5px 5px 10px #a4f8a2,5px -5px 10px #a8fda6':'-5px 5px 10px #dedede,5px -5px 10px #e2e2e2'
    })
    return (
        <Body>
            <ConnectionBtn style={stylebtn} active={active?.toString()} onClick={()=>setConnected(s=>!s)}>
                {active ? t("disconnect"):t("connect")}
            </ConnectionBtn>
        </Body>
    )
}
const Body = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    justify-items: center;
`;
export {Connection}