import React, { Component } from 'react';
import firebase from '../firebase';

export default class ChecklistNotes extends Component {
    
    state = {
        input: '',
        list: this.props.list,
        uid: sessionStorage.uID,
        notes: [],
        fullList: [],
        warning: false,
        addNewNote: false,
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
            this.setState({ fullList: tempArr[0] }, () => this.setState({ notes: this.state.fullList.notes }));
        });
    }

    toggleInput = (e) => {
        e.preventDefault();
        this.setState({ addNewNote: !this.state.addNewNote })
    }; //Toggles textarea

    handleInput = (e) => {
        let { value } = e.target;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        this.setState({ input: value, warning: false });
    };

    handleDelete = (e, index) => {
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.list}`);
        e.preventDefault();
        let arr = this.state.notes;
        arr.splice(index, 1);
        this.setState({ notes: arr }, () => {
            db.update({ checklistNotes: this.state.notes });
        });
    }; //Removes selected entry

    submitData = (e) => {
        //Error handling portion
        if(this.state.input === "") return this.setState({ warning: true });
        //Updating the db with the new entry
        let arr = this.state.notes;
        arr.push(this.state.input);
        this.setState({ notes: arr }, () => {
            let db = firebase.database().ref(`users/${this.state.uid}/${this.state.list}`);
            db.update({ 'checklistNotes': this.state.notes });
        });
        //Clearing the input field and state after successful update
        document.querySelector('#comment').value = "";
        this.setState({ input: '', addNewNote: false });
    }; //Submits new note 

    render() {
        return (
            <section className="checklist-notes-section">
                <h2>Notes: </h2>
                <button onClick={this.toggleInput} className="notes-btn">{this.state.addNewNote ? 'Hide Note Field' : 'Add Note'}</button>
                {
                    this.state.addNewNote ? 
                    <div className="form-group">
                        {this.state.warning ? <div className="alert alert-warning"><h3>Input cannot be blank!</h3></div> : null }
                        <textarea className="form-control" rows="5" id="comment" onChange={this.handleInput}></textarea>
                        <button className="add-field-btn" onClick={this.submitData}>Save note</button>
                    </div>
                    :
                    null
                }
                

                {
                    this.state.notes.length !== 0 ?
                    <div className="checklist-notes">
                        {
                            this.state.notes.map((el, idx) => (
                                <div key={idx} className="checklist-note-single">
                                    <p className="checklist-single-note-content">{el}</p>
                                    <div className="checklist-single-note-btns">
                                        <button onClick={(e) => this.handleEdit(e,idx)} className="notes-btn">Edit</button>
                                        <button onClick={(e) => this.handleDelete(e,idx)} className="notes-btn">Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    null
                }

            </section>
        )
    }
}

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];