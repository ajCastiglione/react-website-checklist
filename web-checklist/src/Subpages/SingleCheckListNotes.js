import React, { Component } from 'react';
import firebase from '../firebase';

export default class ChecklistNotes extends Component {
    
    state = {
        input: '',
        list: this.props.list,
        uid: sessionStorage.uID,
        notes: [],
        fullList: [],
    }

    componentDidMount() {
        let tempArr = [];
        let db = firebase.database().ref(`users/${this.state.uid}`);
        db.orderByKey().equalTo(this.state.list).on('value', (snap) => {
            let vals = snap.val();
            let keys = Object.keys(vals);
            for(let k of keys) {
                let clName = vals[k].checklistName;
                let clType = vals[k].checklistFor;
                let clFields = vals[k].checklistFields;
                let clNotes = vals[k].checklistNotes;
                tempArr.push({ name: clName, type: clType, fields: clFields, notes: clNotes });
            }
            this.setState({ fullList: tempArr }, () => { console.log(this.state.fullList) });
        });
    }

    render() {
        return (
            <section className="checklist-notes-section">
                <h2>Notes: </h2>
                <div className="form-group">
                    <textarea className="form-control" rows="5" id="comment" onChange={this.props.handleInput}></textarea>
                    <button className="add-field-btn" onClick={this.saveNewField}>Save note</button>
                </div>
            </section>
        )
    }
}