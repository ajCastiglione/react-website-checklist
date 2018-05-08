import React, { Component }  from 'react';
import firebase from './firebase';

class HomePage extends Component {
   
    createChecklist = () => {
       let db = firebase.database();
       db.ref(`users/${this.props.userID}`).push({
           checklistName: 'website-name-goes-here',
           checklistFor: 'website-type-goes-here'
       })
   }

    render() {
        return (
            <section className="homepg-content-container container cf">
                
                <article className="create-checklists col-xs-12 col-sm-9 col-lg-8">
                    <button className="create-btn" onClick={this.createChecklist}>Create Checklist</button> {/* This will be refactored with routing instead to lead to another page isntead of creating an actual checklist right away since it would be an empty slot containing nothing. Need to make a template for the checklist form */}
                </article>

                <aside className="open-checklists col-xs-12 col-sm-3 col-lg-4">
                    <h3>All active checklists for {this.props.userName}</h3>
                </aside>

            </section>
        );
    }
}

export default HomePage;