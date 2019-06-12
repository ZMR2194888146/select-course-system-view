import React from 'react';
import { Wrapper, Image } from "./styled";

class NoMatch extends React.Component{
    render(){
        return(
            <Wrapper>
                <Image/>
                <h2>404!</h2>
            </Wrapper>
        );
    }
}

export default NoMatch;