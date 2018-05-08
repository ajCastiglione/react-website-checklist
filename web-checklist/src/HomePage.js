import React, { Component }  from 'react';
import firebase from './firebase';

class HomePage extends Component {

    constructor() {
        super(); 
        let db = firebase.database();
    }

    render() {
        return (
            <section className="homepg-content-container container cf">
                
                <article className="create-checklists col-xs-12 col-sm-9 col-lg-8">
                    <button className="create-btn" onClick={this.createChecklist}>Create Checklist</button>
                </article>

                <aside className="open-checklists col-xs-12 col-sm-3 col-lg-4">
                    <h3>All active checklists</h3>
                </aside>

            </section>
        );
    }
}

export default HomePage;