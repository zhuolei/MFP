import React, { Component } from 'react';
import {
    HeaderWrapper, 
    Logo,
    Nav,
    NavItem,
    Addition,
    Button
} from './style';

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <Logo>FMP</Logo>
                <Addition>
                    <Button className='reg'>Register</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}

export default Header;

