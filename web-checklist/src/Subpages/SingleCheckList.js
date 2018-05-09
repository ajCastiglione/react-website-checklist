import React, { Component }  from 'react';
import firebase from '../firebase';

class CheckListPage extends Component {

    state = {
        targetChecklist: this.props.target,
        currentList: []
    }

    componentDidMount() {
        let ref = firebase.database().ref(`users/${this.props.userID}`);
        let tempArr=[];
        ref.on('value', (snap) => {
            let vals = snap.val();
            let keys = Object.keys(vals);
            for(let k of keys) {
                let ckname = vals[k].checklistName;
                let cktype = vals[k].checklistFor;
                tempArr.push({cName: ckname, cType: cktype});
            }
            this.setState({ currentList: tempArr })
        });  
    }

    render() {
        return (
            <div>
                <p>{this.state.targetChecklist}</p>

                <p>returned array</p>
                <ul>
                    {this.state.currentList.map((item, index) => (
                        <li key={index}>{item.cName}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default CheckListPage;