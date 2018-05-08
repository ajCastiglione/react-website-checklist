import React, { Component }  from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';

class HomePage extends Component {

    state = {
        checklistsOpen: []
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
            this.setState({ checklistsOpen: tempArr })
        });  
    }

    render() {
        return (
            <section className="homepg-content-container container cf">
                
                <article className="create-checklists col-xs-12 col-sm-6 col-lg-8">
                    <h2>Generate new checklist</h2>
                    <div className="text-center">
                        <Link className="create-btn" to="/create-checklist">Create Checklist</Link> 
                    </div>
                </article>

                <aside className="open-checklists col-xs-12 col-sm-6 col-lg-4">
                    <h3>All active checklists for {this.props.userName}</h3>
                    <ul>
                        {
                            this.state.checklistsOpen.length !== 0 &&
                            this.state.checklistsOpen.map((item) => (
                                <li key={item.cName + "-site"} className="open-list-item" >
                                    <Link to={`/create-checklist/${item.cName}`} value={item.cName} onClick={() => this.props.saveTarget(item.cName)}>{item.cName} - {item.cType}</Link>
                                </li>
                            ))
                        }
                        {
                            this.state.checklistsOpen.length === 0 &&
                            <li>No lists to show!</li>
                        }
                    </ul>
                </aside>

            </section>
        );
    }
}

export default HomePage;