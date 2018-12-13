import React, { Component } from 'react';
import Header from './common/header';
import NormalLoginForm from './pages/login';


class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
