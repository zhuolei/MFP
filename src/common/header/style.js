import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    height: 65px;
    border-bottom: 1px solid #f0f0f0;
    background: #002140;
`

export const Logo = styled.a.attrs({
    href: '/#/login'
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
    color: white;
    
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
    margin-top: auto;
    margin-bottom: auto;
    height: 65px: 
`
export const Button = styled.div`
    float: right;
    margin-top: 19px;
    margin-right: 40px;
    padding: 0 20px;
    line-height: 38px;
    border-radius: 19px;
    border: 1px solid white;
    &.reg {
        color: white;
    }
`
