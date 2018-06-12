import React, { Component } from 'react';
import firebase from './firebase';

class LoginBar extends Component {

    constructor(props) {
        super(props);
        firebase.auth().onAuthStateChanged(((user) => {
            if(user) {
                this.setState({ loggedIn: 'true', userName: user.displayName, userImg: user.photoURL });
            } else {
                this.setState({ loggedIn: 'false' })
            }
        }));
    }

    state = {
        loggedIn: this.props.loggedInStatus,
        userName: '',
        userImg: ''
    }

    loginWindow = () => {
        let auth = firebase.auth();
        let provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
        auth.onAuthStateChanged((usr) => {
            if(usr) {
                this.setState({ userName: usr.displayName, userImg: usr.photoURL });
                this.setState({ loggedIn: 'true' });
            }
        });
    }

    logOut = () => {
        let auth = firebase.auth();
        auth.signOut();
        this.setState({ loggedIn: 'false' })
    }

    testIt = (data) => {
        if(firebase.auth().currentUser) {
            console.log(data.currentTarget.innerText = firebase.auth().currentUser.displayName);
        } else {
            console.log(data.currentTarget.innerText = "No one is logged in currently");
        } //Dont remember why I needed to grab which element was clicked on currently, hopefully it comes back to me soon.
    }

    render() {
        return (
            <div className="login-form">
            {
                this.state.loggedIn === 'false' ?
                <div className="sign-in">
                    <a className="sign-in-btn" onClick={this.loginWindow}>Login with Google</a>
                </div>
                :            
                <div className="sign-out">
                    <img src={this.state.userImg} alt="User profile pic"/> 
                    <a className="sign-out-btn" onClick={this.logOut}>{this.state.userName} - Sign Out</a>
                </div>
            }
            </div>
        )
    }
}

export default LoginBar;