import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link } from 'react-router-dom';
import './App.css';
import firebase from './firebase';
import LoginBar from './Login';
import HomePage from './HomePage';
import CreateChecklist from './CreateChecklist'; 
import SingleCheckList from './Subpages/SingleCheckList';

class App extends Component {

  state = {
    username: '',
    userId: sessionStorage.uID || '',
    loggedIn: 'false',
    savedPg: sessionStorage.curPage || ''
  }

  constructor() {
    super();
    firebase.auth().onAuthStateChanged(((usr) => {
      if(usr) {
          this.setState({ username: usr.displayName, userId: usr.uid, loggedIn: 'true' });
          sessionStorage.uID = this.state.userId;
        } else {
          this.setState({loggedIn: 'false'})
        }
    }));
  }

  createChecklist = (ckName, ckType, ckTitle, fields) => {
    let db = firebase.database().ref(`users/${this.state.userId}`);
      db.update({
      [ckTitle]:
      {
        checklistName: ckName,
        checklistFor: ckType,
        checklistFields: fields
      }
    });
  }

  saveNewTarget = (checkToView) => {
    this.setState({savedPg: checkToView});
    sessionStorage.curPage = checkToView;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <nav className="nav">
          <div className="inner-nav container">
            <div className="nav-left col-xs-12 col-sm-6 col-lg-8">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create-checklist">New Checklist</Link></li>
              </ul>
            </div>

            <div className="nav-right col-xs-12 col-sm-6 col-lg-4">
              <LoginBar/>
            </div>
          </div>
        </nav>

        <Route exact path="/" render={() => (
          <main className="homepg-section">
            {
              this.state.loggedIn === 'true' &&
              <HomePage saveTarget={this.saveNewTarget} userName={this.state.username} userID={this.state.userId} />
            }
            {
              this.state.loggedIn === 'false' &&
              <p className="not-loggedin-homepg container">Please login via google to view your checklists!</p>
            }
          </main>
        )}/>

        <Route exact path="/create-checklist" render={() => (
          <CreateChecklist makeList={this.createChecklist} />
        )}/>

        <Route path="/single-view/*" render={() => (
          <SingleCheckList target={this.state.savedPg} uid={this.state.userId} />
        )}/>

      </div>
    );
  }
}

export default App;
