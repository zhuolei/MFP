import React, { Component } from 'react';
import Header from './common/header';
import NormalLoginForm from './pages/login';


class FirstPage extends Component {
  render() {
    return (
      <React.Fragment>
      <Header />
      <div style={{float: 'right'}}>
      <NormalLoginForm />
      </div>
      </React.Fragment>
    );
  }
}

export default FirstPage;