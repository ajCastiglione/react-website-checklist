import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link } from 'react-router-dom';
import './App.css';
import firebase from './firebase';
import LoginBar from './Login';
import HomePage from './HomePage';
import CreateChecklist from './Subpages/CreateChecklist'; 
import SingleCheckList from './Subpages/SingleCheckList';
import Footer from './Footer';
import RemoveList from './Subpages/RemoveList';

class App extends Component {

  state = {
    username: '',
    userId: sessionStorage.uID || '',
    loggedIn: 'false',
    savedPg: sessionStorage.curPage || '',
    savedType: sessionStorage.curType || '',
    navShown: false
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

  saveNewTarget = (checkToView, checkType) => {
    this.setState({savedPg: checkToView, savedType: checkType });
    sessionStorage.curPage = checkToView;
    sessionStorage.curType = checkType;
  }

  handleNavClick = (e) => {
    e.preventDefault();
    this.setState({ navShown: !this.state.navShown });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Checklist</h1>
        </header>

        <nav className="nav">
          <div className="inner-nav container">
            <div className="nav-left col-xs-12 col-sm-7 col-lg-8">
              <ul>
                <li id='mobile-only'><a href="/null" onClick={this.handleNavClick}><i className="fas fa-bars"></i></a></li>
                <li className={this.state.navShown === false ? '' : 'showMobileNav'}><Link to="/">Home</Link></li>
                <li className={this.state.navShown === false ? '' : 'showMobileNav'}><Link to="/create-checklist">Create List</Link></li>
                <li className={this.state.navShown === false ? '' : 'showMobileNav'}><Link to="/remove-checklist">All Checklists</Link></li>
              </ul>
            </div>

            <div className="nav-right col-xs-12 col-sm-5 col-lg-4">
              <LoginBar loggedInStatus={this.state.loggedIn}/>
            </div>
          </div>
        </nav>

        <Route exact path="/" render={() => (
          <main className="homepg-section">
            {
              this.state.loggedIn === 'true' ?
              <HomePage saveTarget={this.saveNewTarget} userName={this.state.username} userID={this.state.userId} />
              :
              <p className="not-loggedin container">Please login via google to view your checklists!</p>              
            }
          </main>
        )}/>

        <Route exact path="/create-checklist" render={() => (
          <section className="create-a-checklist">
        {
          this.state.loggedIn === 'true' ?
          <CreateChecklist makeList={this.createChecklist} />
          :
          <p className="not-loggedin container">Please login via google to create a list!</p>
        }
          </section>
        )}/>

        <Route path="/single-view/*" render={() => (
          <section className="single-view-app-container">
            {
              this.state.loggedIn === 'true' ?
            <SingleCheckList target={this.state.savedPg} typeOfList={this.state.savedType} uid={this.state.userId} />
            :
            <p className="not-loggedin container">Please login via google to access this page!</p>
            }
          </section>
        )}/>

        <Route path="/remove-checklist" render={() => (
          <RemoveList saveTarget={this.saveNewTarget} userName={this.state.username} userID={this.state.userId}/>
        )}/>

        <footer className="footer">
          <Footer />
        </footer>

      </div>
    );
  }
}

export default App;
