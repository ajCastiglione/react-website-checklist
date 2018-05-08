import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import LoginBar from './Login';
import HomePage from './HomePage';

class App extends Component {

  state = {
    username: '',
    userId: '',
    loggedIn: 'false'
  }
  
  constructor() {
    super();
    firebase.auth().onAuthStateChanged(((usr) => {
      if(usr) {
          this.setState({ username: usr.displayName, userId: usr.uid, loggedIn: 'true' })
        } else {
          this.setState({loggedIn: 'false'})
        }
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <nav className="nav">
          <LoginBar/>
        </nav>
        <main className="homepg-section">
          {
            this.state.loggedIn === 'true' &&
            <HomePage userName={this.state.username} userID={this.state.userId} />
          }
          {
            this.state.loggedIn === 'false' &&
            <p className="container">Please login via google to view your checklists!</p>
          }
        </main>
      </div>
    );
  }
}

export default App;
