import React, { Component }  from 'react';
import firebase from '../firebase';

class CheckListPage extends Component {

    state = {
        targetChecklist: sessionStorage.curPage || this.props.target,
        listType: sessionStorage.curType || this.props.typeOfList,
        uid: sessionStorage.uID || this.prop.uid,
        queryArr: JSON.parse(sessionStorage.singleQuery) || [],
        wait: false
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
            this.setState({wait: true})
        });
    }
    
    componentWillUnmount() {
        firebase.database().ref(`users/${this.state.uid}`).off();
    }

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

    submitData = (e) => {
        e.preventDefault();
        let db = firebase.database().ref(`users/${this.state.uid}/${this.state.targetChecklist}`);
        db.update({ checklistFields: this.state.queryArr[0].fields, checklistName: this.state.targetChecklist, checklistFor: this.state.listType }); 
    }

    render() {
        let allFields = this.state.queryArr[0];
        return (
            <section className="container cf single-checklist-page-container">
                <h2>Currently viewing - {this.state.targetChecklist}</h2>
                
                <p className="single-checklist-name" >Checklist: {allFields.name}</p>
                <p className="single-checklist-type" >Type: {allFields.type}</p>
                <form className="checklist-single-fields-container">
                       {
                           this.state.wait !== false ?
                           allFields.fields.map((item, index) => (
                               <div key={`checkbox-container-${index}`} className={`checkbox-container-${index}`}>
                                    <input key={`checkbox-${index}`} id={`${index}-cb`} type="checkbox" defaultChecked={item.completed} onChange={(e) => this.handleChange(e, index)}/>
                                    <label key={`label-${index}`} htmlFor={`${index}-cb`}> {item.id}</label>
                               </div>
                           ), this)
                           :
                           <p>Please allow a few seconds to load!</p>
                       }

                    <button onClick={this.submitData}>Submit</button>                       
                </form>
                    
            </section>
        )
    }
}

export default CheckListPage;