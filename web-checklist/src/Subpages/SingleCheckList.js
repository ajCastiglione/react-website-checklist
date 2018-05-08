import React, { Component }  from 'react';


class CheckListPage extends Component {

    state = {
        targetChecklist: this.props.target
    }

    render() {
        return (
            <div>{this.state.targetChecklist}</div>
        )
    }
}

export default CheckListPage;