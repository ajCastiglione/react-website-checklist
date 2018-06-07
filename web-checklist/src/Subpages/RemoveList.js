import React, { Component }  from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class RemoveList extends Component {

    state = {
        checklistsOpen: []
    }
    
    componentDidMount() {
        this.fetchChecklists();
    }

    componentWillUnmount() {
        firebase.database().ref(`users/${this.props.userID}`).off();
    }

    fetchChecklists = () => {
        let ref = firebase.database().ref(`users/${this.props.userID}`);
        let tempArr=[];
        ref.on('value', (snap) => {
            let vals = snap.val();
            if(vals === null) return;
            let keys = Object.keys(vals);
            for(let k of keys) {
                let ckname = vals[k].checklistName;
                let cktype = vals[k].checklistFor;
                tempArr.push({cName: ckname, cType: cktype});
            }
            this.setState({ checklistsOpen: tempArr })
        });  
    };

    removeList = (e, index) => {
        let cl = this.state.checklistsOpen[index].cName;
        let listToRemove = firebase.database().ref(`users/${this.props.userID}/${cl}`);
        
        listToRemove.remove()
        .then(() => console.log('Removed successfully'))
        .catch(error => console.log('Failed to remove', error) );
        this.fetchChecklists();
    }

    render() {
        return (
            <section className="remove-lists-container container cf">
                
                <article className="delete-checklists col-xs-12">
                    <h2>All active checklists for {this.props.userName}</h2>

                    <ul>
                        {
                            this.state.checklistsOpen.length !== 0 ?
                            
                            this.state.checklistsOpen.map((item, index) => (
                                <div key={index} index={index} className="remove-list-item" >
                                    <Link to={`/single-view/${item.cName}`} value={item.cName} onClick={() => this.props.saveTarget(item.cName, item.cType)} key={index}>{item.cName} - {item.cType}</Link>
                                    <button onClick={(e) => this.removeList(e, index)}>X</button>
                                </div>
                            ))
                            : 
                            <li>No checklists to view! or its loading...</li>
                        }
                    </ul>
                </article>

            </section>
        );
    }
}

export default RemoveList;