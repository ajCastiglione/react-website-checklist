import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateChecklist extends Component {
    state = {
        checkListName: '',
        checkListType: '',
        checkListTitle: '',
        subActive: false,
        regActive: false
    }

    handleNameChange = (e) => {
        this.setState({ checkListName: e.target.value, checkListTitle: e.target.value });
    };
    handleSubChange = (e) => {
        this.setState({ checkListType: e.target.value });
        let st = this.state.active;
        this.setState({ subActive: !st });
        this.setState({ regActive: false })
    };
    handleRegChange = (e) => {
        this.setState({ checkListType: e.target.value });
        let st = this.state.active;
        this.setState({ regActive: !st });
        this.setState({ subActive: false })
    };

    submitChecklist = () => {
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
                <h1 className="creation-title" >New Checklist For - {this.state.checkListName !== "" ? this.state.checkListName : "New Site" }</h1>

                <form className="input-fields container">
                    <h4>Name Of Site:</h4> 
                    <input type="text" name="ckName" className="form-control" onChange={this.handleNameChange} />
                    <div className="radio-fields-checklist">
                        <label htmlFor="sub-website" className={this.state.subActive ? 'active_btn' : null}>Subscription</label>
                        <input id="sub-website" type="radio" name="ckType" value="Subscription" className="form-control" onChange={this.handleSubChange} />
                        <label htmlFor="reg-website" className={this.state.regActive ? 'active_btn' : null}>Normal Website</label>
                        <input id="reg-website" type="radio" name="ckType" value="Regular" className="form-control" onChange={this.handleRegChange} />
                    </div>
                    <Link onClick={this.submitChecklist} to="/" className="submitBtn" >Submit Checklist</Link>
                </form>
            </section>
        );
    }
}

export default CreateChecklist;