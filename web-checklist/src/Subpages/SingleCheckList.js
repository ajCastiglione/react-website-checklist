import React, { Component }  from 'react';
import firebase from '../firebase';

class CheckListPage extends Component {

    state = {
        targetChecklist: sessionStorage.curPage || this.props.target,
        uid: sessionStorage.uID || this.prop.uid,
        queryArr: JSON.parse(sessionStorage.singleQuery) || []
    }

    componentDidMount() {
        let tempArr = [];
        let db = firebase.database().ref(`users/${this.state.uid}`);
        db.orderByKey().equalTo(this.state.targetChecklist).on('value', (snap) => {
            let vals = snap.val();
            let keys = Object.keys(vals);
            for(let k of keys) {
                let clName = vals[k].checklistName;
                let clType = vals[k].checklistFor;
                let clFields = vals[k].checklistFields;
                tempArr.push({ name: clName, type: clType, fields: clFields });
            }
            this.setState({ queryArr: tempArr });
            sessionStorage.singleQuery = JSON.stringify(this.state.queryArr);
        });
    }

    render() {
        return (
            <section className="container cf single-checklist-page-container">
                <h2>Viewing checklist for {this.state.targetChecklist}</h2>
                <p>returned array</p>
                    {
                        console.log(this.state.queryArr[0])
                    }
            </section>
        )
    }
}

export default CheckListPage;