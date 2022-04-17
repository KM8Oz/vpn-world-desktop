import React from "react";
import styled from "styled-components";
import { Button } from "../styledComponents"
import { useTranslation, withTranslation } from 'react-i18next';
function About (){
    const { t } = useTranslation();
    return (
        <Body>
            <Button backColor="#FFFFFF" textColor="#000000">
                {t("contactus")}
            </Button>
            <Button backColor="#FFFFFF" textColor="#000000">
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