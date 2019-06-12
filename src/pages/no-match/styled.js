import styled from "styled-components";
import Nofound from "../../static/img/404.png";

export const Wrapper = styled.div`
    height: 400px;
    width: 400px;
    margin: auto;
    position: relative;
    h2{
        font-family:"华文隶书";
        font-size: 34px;
        position: absolute;
        left: 50px;
        top: 50px;
    }
`;

export const Image = styled.img`
    width: 300px;
    height: 313px;
    position: absolute;
    top: 80px;
    background-image: url(${Nofound});
    background-size: cover;
`;

