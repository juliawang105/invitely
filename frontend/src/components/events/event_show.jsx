import React from 'react';
import { withRouter } from 'react-router-dom';
import * as EventsCss from './events.css'

class EventShow extends React.Component{
    constructor(props){
        super(props)
        // this.state = this.props.event;
    }

    componentDidMount(){
        this.props.getEvent(this.props.match.params.id);
    }

    render(){
       
        let event = this.props.event.new;
        console.log(this.props)
        console.log(event);
        if (!event){

            return null;
        }

        console.log(event);

        return (
          <div className="event-show">
              <div className="sidebar">
                <div>sidebar</div>
              </div>
            <div className='event-info'>
              <div>{event.name}</div>
              <div>{event.body}</div>
              <div>{event.location}</div>
              <div>{event.time}</div>
            </div>
          </div>
        );
    }

};

export default withRouter(EventShow);