import React, { Component }  from 'react';
import firebase from '../firebase';


class CheckListPage extends Component {

    state = {
        targetChecklist: sessionStorage.curPage || this.props.target,
        uid: sessionStorage.uID || this.prop.uid
    }

    constructor(props) {
        super(props);

        let db = firebase.database().ref(`users/${this.state.uid}`);
        let queryRes = db.orderByKey().equalTo(this.state.targetChecklist).on('value', (snap) => {
            console.log(snap.val())
        });
    }

    render() {
        return (
            <div>
                {this.state.targetChecklist}
            </div>
        )
    }
}

export default CheckListPage;