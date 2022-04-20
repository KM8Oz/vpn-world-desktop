import styled from "styled-components";
import { Button } from "../styledComponents"
import { useTranslation } from 'react-i18next';
function About() {
    const sendLink = (link:any) => {
        let win = window as any;
        if (win && win?.vpn) {
            win.vpn.changeIcon("openlink", { link: link })
        }
    }
    const { t } = useTranslation();
    return (
        <Body>
            <Button backColor="#FFFFFF" onClick={()=>sendLink(t("contact"))} textColor="#000000">
                {t("contactus")}
            </Button>
            <Button backColor="#FFFFFF"  onClick={()=>sendLink(t("terms"))} textColor="#000000">
                {t("termsCondi")}
            </Button>
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
export { About }