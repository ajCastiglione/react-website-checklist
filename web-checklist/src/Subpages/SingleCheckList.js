import React, { Component }  from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class CheckListPage extends Component {

    state = {
        targetChecklist: sessionStorage.curPage || this.props.target,
        listType: sessionStorage.curType || this.props.typeOfList,
        uid: sessionStorage.uID || this.prop.uid,
        queryArr: [] || JSON.parse(sessionStorage.singleQuery),
        wait: false,
        visible: false,
        newField: ""
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
            this.setState({ queryArr: tempArr }, () => {
                sessionStorage.singleQuery = JSON.stringify(this.state.queryArr)
            });
            this.setState({wait: true})
        });
    }
    
    componentWillUnmount() {
        firebase.database().ref(`users/${this.state.uid}`).off();
    }

    showInputField = (e) => {
        e.preventDefault();
        this.setState({ visible: !this.state.visible })
    };

    handleChange = (e, index) => {
        if(e.target.checked) {
            e.target.value = true;
            let newArr = this.state.queryArr.slice();
            newArr[0].fields[index].completed = true;
            this.setState({ queryArr: newArr });
        } else {
            e.target.value = false
            let newArr = this.state.queryArr.slice();
            newArr[0].fields[index].completed = false;
            this.setState({ queryArr: newArr });
        }
    };

    removeItem = (e, index) => {
        e.preventDefault();
        let tempArr = this.state.queryArr.slice();
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.targetChecklist}`);
        tempArr[0].fields.splice(index, 1);
        this.setState({ queryArr: tempArr });
        db.update({ checklistFields: this.state.queryArr[0].fields, checklistName: this.state.targetChecklist, checklistFor: this.state.listType });
    };

    handleNewField = (e) => {
        e.preventDefault();
        this.setState({ newField: e.target.value })
    };
    handleKeyPress = (e) => {
        if(e.key === 'Enter') e.preventDefault();
    };

    saveNewField = (e) => {
        e.preventDefault();
        if(this.state.newField === "") return;
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.targetChecklist}`);
        let nf = this.state.newField;
        let tempArr = this.state.queryArr.slice();
        tempArr[0].fields.push({id: nf, completed: false});
        this.setState({ queryArr: tempArr });
        db.update({ checklistFields: this.state.queryArr[0].fields, checklistName: this.state.targetChecklist, checklistFor: this.state.listType });
        document.querySelector('#newFieldText').value = "";
        this.setState({ newField: '' })
    };

    submitData = (e) => {
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.targetChecklist}`);
        db.update({ checklistFields: this.state.queryArr[0].fields, checklistName: this.state.targetChecklist, checklistFor: this.state.listType }); 
    };

    render() {
        return (
            <section className="single-checklist-page-container cf container">

            {
            this.state.wait === true ?
            <div className="inner-single-page">
               <h2>Currently viewing - {this.state.targetChecklist}</h2>
               <div className="flex-group">
               <p className="single-checklist-name" >Checklist for: {this.state.queryArr[0].name}</p>
               <p className="single-checklist-type" >Type of site: {this.state.queryArr[0].type}</p>
               </div>
            </div>
                :
            <p>Please wait while the data is being fetched</p>
            }
                <form className="checklist-single-fields-container">
                       {
                           this.state.wait === true ?
                           this.state.queryArr[0].fields.map((item, index) => (
                               <div key={`checkbox-container-${index}`} className={`checkbox-container`}>
                                    <input key={`checkbox-${index}`} id={`${index}-cb`} type="checkbox" defaultChecked={item.completed} onChange={(e) => this.handleChange(e, index)}/>
                                    <label key={`label-${index}`} htmlFor={`${index}-cb`}>{item.id}  <button onClick={(e) => this.removeItem(e, index)}>X</button></label>
                                    
                               </div>
                           ), this)
                           :
                           <h3>Querying database currently....</h3>
                       }

                    <Link to="/" className="submit-updates-btn"  onClick={this.submitData}>Submit</Link>
                    <button className="add-field-btn" onClick={this.showInputField}>Add Field</button>
                    {
                        this.state.visible === true ?
                        <div className="save-new-field-container">
                            <label>New Field</label>
                            <input id="newFieldText" type="text" className="form-control" onChange={this.handleNewField} onKeyPress={this.handleKeyPress} />
                            <button className="add-field-btn" onClick={this.saveNewField}>Save new field</button>
                        </div>
                        :
                        null
                    }        
                </form>
            </section>
        )
    }
}

export default CheckListPage;