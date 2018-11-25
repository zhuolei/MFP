import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    height: 65px;
    border-bottom: 1px solid #f0f0f0;
    background: #f7f7f7;
`

export const Logo = styled.a.attrs({
    href: '/'
})`
    position: absolute;
    left: 20px;
    display: block;
    width: 100px;
    height: 65px;
    font-size: 50px;
    font-family: Georgia;
    text-decoration: none;
    out-line: none;
    color: black;
    
`

export const Nav = styled.div`
    width: 800px;
    height: 100%;
    padding-right: 40px;
    box-sizing: border-box;
    margin: 0 auto;
`
export const NavItem = styled.div`
    line-height: 65px;
    padding: 0 15px;
    font-size: 17px;
    &.right{
        float: right;
        color: #969696;
    }
`
export const Addition = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 65px: 
`
export const Button = styled.div`
    float: right;
    margin-top: 19px;
    margin-right: 40px;
    padding: 0 20px;
    line-height: 38px;
    border-radius: 19px;
    border: 1px solid black;
    &.reg {
        color: black;
    }
`
