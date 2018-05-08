import React, { Component } from 'react';

class CreateChecklist extends Component {
    state = {
        checkListName: '',
        checkListType: '',
        checkListTitle: ''
    }

    handleNameChange = (e) => {
        this.setState({ checkListName: e.target.value, checkListTitle: e.target.value });
    };
    handleTypeChange = (e) => {
        this.setState({ checkListType: e.target.value });
    };

    submitChecklist = (e) => {
        e.preventDefault();
        if(!this.state.checkListName || !this.state.checkListType || !this.state.checkListTitle) {
        return alert("You must enter a name and select a type before submitting");
        }
        let n = this.state.checkListName,
        t = this.state.checkListType,
        title = this.state.checkListTitle;
        this.props.makeList(n, t, title);
    };

    render() {
        return (
            <section className="creation-section">
                <h1>These are some test fields for debugging</h1>

                <form className="input-fields" onSubmit={this.submitChecklist}>
                    <input type="text" name="ckName" className="form-control" onChange={this.handleNameChange} />
                    <label htmlFor="sub-website">Subscription</label>
                    <input id="sub-website" type="radio" name="ckType" value="Subscription" className="form-control" onChange={this.handleTypeChange} />
                    <label htmlFor="reg-website">Normal Website</label>
                    <input id="reg-website" type="radio" name="ckType" value="Regular" className="form-control" onChange={this.handleTypeChange} />
                    <button type="submit">Submit Checklist</button>
                </form>
            </section>
        );
    }
}

export default CreateChecklist;