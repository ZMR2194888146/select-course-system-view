import styled from "styled-components";
import HeaderBG from "../../static/img/header_bg.png";

export const HeaderWrapper = styled.div`
   width: 100%;
   background-image: url(${HeaderBG});
   background-size: 100%;
   .titleBar{
      margin-left: 20px;
      height: 60px;
      position: relative;  
   }
   .infoBar{
      display: block;
      position: absolute;
      top: 3px;
      right: 6px;
      font-size: 12px;
   }
   .menuContent{
      padding-left: 10em;
   }
   .menuItem{
      width: 10vw;
   }
   h2{
    
      font-family: "华文行楷"; 
      line-height: 60px;
      font-size: 36px;
   }
`;