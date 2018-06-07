import React, { Component } from 'react';

class CreateChecklist extends Component {
    state = {
        checkListName: '',
        checkListType: '',
        checkListTitle: '',
        checkListFields: [],
        subActive: false,
        regActive: false,
        success: false,
        warning: false,
        defaultFields: false,
        newFieldText: '',
    }

    handleNameChange = (e) => {
        let title = e.target.value;
        title = title.charAt(0).toUpperCase() + title.slice(1);
        this.setState({ checkListName: title, checkListTitle: title, success: false });
    };

    handleSubChange = (e) => {
        this.setState({ checkListType: e.target.value });
        let st = this.state.subActive;
        this.setState({ subActive: !st });
        this.setState({ regActive: false })
    };

    handleRegChange = (e) => {
        this.setState({ checkListType: e.target.value });
        let st = this.state.regActive;
        this.setState({ regActive: !st });
        this.setState({ subActive: false })
    };

    handleFieldChange = () => {
        this.setState({ defaultFields: !this.state.defaultFields }, () => {
            if(this.state.defaultFields === true) {
                this.setState({ checkListFields: [{'id': 'The design is implemented', 'completed': false},{'id': 'Woocommerce is implemented', 'completed': false},{'id': 'Cross-browser compatible (including safari)', 'completed': false},{'id': 'Site has been approved', 'completed': false}] });
            }  else {
                this.setState({ checkListFields: [] });
            }
        });
    };

    handleFieldText = (e) => {
        let { value } = e.target;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        this.setState({ newFieldText: value, warning: false });
    };

    saveNewField = (e) => {
        e.preventDefault();
        if (this.state.newFieldText === "") {
            return this.setState({ warning: true });
        }
        let temp = {
            id: this.state.newFieldText,
            completed: false
        };
        let tempArr = this.state.checkListFields;
        tempArr.push(temp);
        this.setState({ checkListFields: tempArr });
        document.querySelector('#newFieldText').value = "";
    }

    submitChecklist = (e) => {
        e.preventDefault();
        if(!this.state.checkListName || !this.state.checkListType || !this.state.checkListTitle) {
        return alert("You must enter a name and select a type before submitting");
        }
        let name = this.state.checkListName, type = this.state.checkListType, title = this.state.checkListTitle, fields = this.state.checkListFields;
        this.props.makeList(name, type, title, fields);
        this.setState({ success: true });
        window.scrollTo(0, 0);
    };

    render() {
        return (
            <section className="creation-section">
                <div className="container">
                    {this.state.success !== false ? <div className="alert alert-success"><h3>Successfully added checklist!</h3></div> : null }
                    
                    <h1 className="creation-title">New Checklist For - {this.state.checkListName !== "" ? this.state.checkListName : "New Site" }</h1>

                    <form className="input-fields container">

                        <h4>Name Of Site:</h4> 
                        <input type="text" name="ckName" className="form-control" onChange={this.handleNameChange} />

                        <div className="radio-fields-checklist">
                            <label htmlFor="sub-website" className={this.state.subActive ? 'active_btn' : null}>Subscription</label>
                            <input id="sub-website" type="radio" name="ckType" value="Subscription" className="form-control" onChange={this.handleSubChange} />
                            <label htmlFor="reg-website" className={this.state.regActive ? 'active_btn' : null}>Normal Website</label>
                            <input id="reg-website" type="radio" name="ckType" value="Regular" className="form-control" onChange={this.handleRegChange} />
                        </div>

                        <hr/>

                        <div className="checklist-fields-selection">
                            <h4>Would you like to use the default fields? <input id="ck-fields" type="checkbox" name="ckFields" onChange={this.handleFieldChange} /></h4>

                            {
                                this.state.defaultFields ? 
                                <div className="alert alert-info">Using default fields</div> 
                                : 
                                <div className="checklist-custom-fields">
                                  <div className="save-new-field-container">
                                        <label>Enter the name of the item</label>
                                        {this.state.warning ? <div className="alert alert-warning"><h3>Input cannot be blank!</h3></div> : null }
                                        <input id="newFieldText" type="text" className="form-control" onChange={this.handleFieldText} />
                                        <button className="add-field-btn" onClick={this.saveNewField}>Save new field</button>
                                    </div>
                                </div>
                            }
                            
                        </div>

                        <button onClick={this.submitChecklist} className="submitBtn" >Submit Checklist</button>

                    </form>

                </div>
            </section>
        );
    }
}

export default CreateChecklist;