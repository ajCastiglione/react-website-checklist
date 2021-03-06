import React, { Component }  from 'react';
import firebase from './firebase';
import { Link } from 'react-router-dom';

class HomePage extends Component {

    state = {
        checklistsOpen: [],
        test: []
    }
    
    componentDidMount() {
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
    }

    componentWillUnmount() {
        firebase.database().ref(`users/${this.props.userID}`).off();
    }

    render() {
        return (
            <section className="homepg-content-container container cf">
                
                <article className="create-checklists col-xs-12 col-sm-7 col-lg-8">
                    <h2>Generate new checklist</h2>
                    <Link className="create-btn" to="/create-checklist">Create Checklist</Link> 
                </article>

                <aside className="open-checklists col-xs-12 col-sm-5 col-lg-4">
                    <h3>All active checklists for {this.props.userName}</h3>
                    <ul>
                        {
                            this.state.checklistsOpen.length !== 0 ?
                            
                            this.state.checklistsOpen.map((item, index) => (
                                <li key={index} index={index} className="open-list-item" >
                                    <Link to={`/single-view/${item.cName}`} value={item.cName} onClick={() => this.props.saveTarget(item.cName, item.cType)}>{item.cName} - {item.cType}</Link>
                                </li>
                            ))
                            : 
                            <li>No checklists to view, <Link to="/create-checklist">create a new one!</Link></li>
                        }
                    </ul>
                </aside>

            </section>
        );
    }
}

export default HomePage;