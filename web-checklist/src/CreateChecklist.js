import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateChecklist extends Component {
    state = {
        checkListName: '',
        checkListType: '',
        checkListTitle: '',
        checkListFields: [],
        subActive: false,
        regActive: false
    }

    componentDidMount() {
        this.setState({ checkListFields: [{'Design transferred': false},{'Responsive': false},{'Woocommerce configured if needed':false},{'Approved by sean': false}] });
    }

    handleNameChange = (e) => {
        let title = e.target.value;
        title = title.charAt(0).toUpperCase() + title.slice(1);
        this.setState({ checkListName: title, checkListTitle: title });
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
        let name = this.state.checkListName, type = this.state.checkListType, title = this.state.checkListTitle, fields = this.state.checkListFields;
        this.props.makeList(name, type, title, fields);
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
                    <div className="hide">
                        
                    </div>
                    <Link onClick={this.submitChecklist} to="/" className="submitBtn" >Submit Checklist</Link>
                </form>
            </section>
        );
    }
}

export default CreateChecklist;