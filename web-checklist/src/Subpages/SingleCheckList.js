import React, { Component }  from 'react';
import firebase from '../firebase';

class CheckListPage extends Component {

    state = {
        targetChecklist: sessionStorage.curPage || this.props.target,
        uid: sessionStorage.uID || this.prop.uid,
        queryArr: JSON.parse(sessionStorage.singleQuery) || [],
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
        let allFields = this.state.queryArr[0];
        return (
            <section className="container cf single-checklist-page-container">
                <h2>Viewing checklist for {this.state.targetChecklist}</h2>
                
                <h3>Checklist: {allFields.name}</h3>
                <h4>Type: {allFields.type}</h4>
                <div className="checklist-single-fields-container">
                    <div className="nothing-yet">
                       {
                           this.state.queryArr.length !== 0 ?
                           allFields.fields.map((item, index) => (
                               <div key={`checkbox-container-${index}`} className={`checkbox-container-${index}`}>
                                    <input key={`checkbox-${index}`} id={`${index}-cb`} type="checkbox" checked={item.completed} onChange={ (e) => {console.log(e.target)} }/>
                                    <label key={`label-${index}`} htmlFor={`${index}-cb`}> {item.id}</label>
                               </div>
                           ))
                           :
                           <p>Please allow a few seconds to load!</p>
                       }
                    </div>
                </div>
                    
            </section>
        )
    }
}

export default CheckListPage;