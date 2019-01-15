import React, { Component } from 'react';
import Header from './common/header';
import NormalLoginForm from './pages/login';
import './resource/assets/firstpage.svg'

class FirstPage extends Component {
  render() {
    return (
      <React.Fragment >
      <Header />
      <div style={{width:'100%', margin:'center'}}>
      <NormalLoginForm/>
      </div>
      </React.Fragment>
    );
  }
}

export default FirstPage;
