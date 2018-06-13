import React, { Component } from 'react';
import firebase from '../firebase';

export default class ChecklistNotes extends Component {
    
    state = {
        input: '',
        editId: null,
        editedText: '',
        currentText: '',
        list: this.props.list,
        uid: sessionStorage.uID,
        notes: [],
        fullList: [],
        warning: false,
        addNewNote: false,
        showEditTextarea: false,
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
            this.setState({ fullList: tempArr[0] }, () => {
                if(this.state.fullList.notes) this.setState({ notes: this.state.fullList.notes }, () => {
                    let arr = this.state.notes;
                    arr.sort((a,b) => {
                        let bMonth = b.date.split('/')[0], bDay = b.date.split('/')[1];
                        let aMonth = a.date.split('/')[0], aDay = a.date.split('/')[1];
                        let bTime = b.date.split(' ')[2] + " " + b.date.split(' ')[3];
                        let aTime = a.date.split(' ')[2] + " " + a.date.split(' ')[3];

                        if(bMonth === aMonth) {
                            if(bDay === aDay) {
                                return new Date('1970/01/01 ' + bTime) - new Date('1970/01/01 ' + aTime);
                            } else {
                                return bDay - aDay;
                            }
                        } else if (bMonth < aMonth) {
                            return bMonth - aMonth;
                        };
                        return null;
                    });
                    this.setState({ notes: arr });
                });
             });
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

    handleNewInput = (e) => {
        let { value } = e.target;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        this.setState({ editedText: value, warning: false });
    };

    toggleEdit = (e, idx) => {
        e.preventDefault();
        let txt = this.state.notes[idx].note;
        this.setState({ showEditTextarea: !this.state.showEditTextarea, editId: idx, currentText: txt }, () => {
            if(this.state.showEditTextarea === false) {
                this.setState({ editId: null })
            }
        });
    };

    submitEdit = (e) => {
        if(this.state.editedText === "") return this.setState({ warning: true });

        e.preventDefault();
        let time = new Date().toLocaleTimeString();
        let fullTimeStamp = `${month}/${date}/${year} at ${time}`;
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.list}`);
        let updatedArr = this.state.notes;
        let note = this.state.notes[this.state.editId];
        note.note = this.state.editedText;
        note.date = fullTimeStamp;
        updatedArr[this.state.editId] = note;

        this.setState({ notes: updatedArr, showEditTextarea: false, editId: null }, () => {
            db.update({ checklistNotes: this.state.notes });
        });
    }; //Updates time and text of selected note

    handleDelete = (e, index) => {
        e.preventDefault();
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.list}`);
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
        let time = new Date().toLocaleTimeString();
        let fullTimeStamp = `${month}/${date}/${year} at ${time}`;

        let data = {
            note: this.state.input,
            date: fullTimeStamp
        };

        arr.push(data);
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
                    this.state.notes && this.state.notes.length !== 0  ?
                    <div className="checklist-notes">
                    {
                        this.state.notes.map((el, idx) => (
                            <div key={idx} className={ this.state.editId === idx ? "checklist-note-single active-note" : "checklist-note-single" }>
                                <p className="checklist-single-note-content">{el.note}</p>

                                {
                                    this.state.showEditTextarea ? 
                                    <div className="edit-group">
                                        {this.state.warning ? <div className="alert alert-warning"><h3>Input cannot be blank!</h3></div> : null }
                                        <input type="text" className="form-control" id="edit-comment" onChange={this.handleNewInput} defaultValue={this.state.currentText} />
                                        <button className="add-field-btn" onClick={this.submitEdit}>Save note: {this.state.editId}</button>
                                    </div>
                                    :
                                    null
                                }

                                <div className="checklist-single-note-stamp">
                                    <p className="time-stamp">{el.date}</p>
                                    <div className="checklist-single-note-btns">
                                        <button onClick={(e) => this.toggleEdit(e,idx)} className="notes-btn">{ this.state.showEditTextarea ? 'Close editor' : 'Edit' }</button>
                                        <button onClick={(e) => this.handleDelete(e,idx)} className="notes-btn">Remove</button>
                                    </div>
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

let date = new Date().getUTCDate();
let month = new Date().getUTCMonth() + 1;
let year = new Date().getUTCFullYear();