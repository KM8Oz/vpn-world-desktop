import styled from "styled-components";
import { ConnectionBtn } from "../styledComponents"
import { useTranslation } from "react-i18next"
import { useSpring } from "react-spring";
function Connection({active, setConnected}:any){
    const { t } =  useTranslation();
    const stylebtn =  useSpring({
        // background: active ?'linear-gradient(225deg, #95e194, #b2ffaf)':'linear-gradient(225deg, #ececec, #c7c7c7)',
        // boxShadow: active ? '8px -8px 16px rgba(0,0,0,0), inset -5px 5px 2px 2px rgba(0,0,0,.09)':
        // `inset -5px 5px 10px 0px  rgb(126, 126, 126), -8px 8px 16px rgba(0,0,0,.09)`,
        boxShadow: active ? `2px 2px 4px 0px #ABE3A9 inset,-2px -2px 4px 0px #D3FFD2 inset`:
        `10px 10px 20px 0px #CDCDCD,-10px -10px 20px 0px #FFFFFFB2`,
        color: active ?'#00000099':'#00000059',
        config: { duration: 100 }
        // boxShadow: active ? 'inset 5px -5px 2px 2px rgba(180, 250, 180, 1), -8px 8px 16px rgba(0,0,0,0)':
        // `inset 5px -5px 10px 0px  rgba(166, 250, 164, 0), -8px 8px 16px rgba(0,0,0,.09)`
        })
    return (
        <Body>
            <ConnectionBtn style={stylebtn} active={active?.toString() as any} onClick={()=>setConnected((s: any)=>!s)}>
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