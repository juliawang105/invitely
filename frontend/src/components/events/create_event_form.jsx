import React from 'react';
import { withRouter } from 'react-router-dom'

class CreateEvent extends React.Component{
    constructor(props){
        super(props)

        this.state = this.props.event; 
    }

    render(){
        return (
            <div>Form</div>
        )
    }
};

export default CreateEvent;