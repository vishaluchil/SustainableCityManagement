import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Event.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "@material-ui/core/Button";
import { rest } from "msw";


const localizer = momentLocalizer(moment);
const buttonStyle = {
  flex: "1 0 40%",
  margin: 10,
  height: 50,
  fontSize: "1.1rem",
};


class ScheduleCalendar extends Component {
  constructor(props) {
    super(props);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
 
    this.state = {
      events: [
        {}
      ],
      eventsID: [{}]
    };
  }


  addEvents(eventsList){
    this.setState(state => {
      const events = state.events.concat(eventsList);
      return {
        events,
      };
    });
  }
  handleSelectEvent(event) {
    this.props.changeTitle(event.title)
    this.props.changeSummary(event.description)
    this.props.changeImage(event.logo)
  }
  componentDidMount(){
    const fetchEvent = async (eventID) => {
      const eventData = await fetch(
        "https://www.eventbriteapi.com/v3/events/"+eventID+"/",{
          headers: {
            "Authorization": "Bearer UJS2G3FESQBTSMRVGGRD",
            "Content-Type": "application/json"
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .catch((error) => console.log("Event Error" + error));
        //console.log(eventData.summary);
        var newEvent = {
          start: eventData.start.utc,
          end: eventData.end.utc,
          title: eventData.name.text,
          logo: eventData.logo.url,
          description: eventData.summary
        }
        this.addEvents(newEvent);
      }

      const fetchEventList = async () => {
        const eventList = await fetch(
          "https://citymanagement.herokuapp.com/eventid"
        )
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res.json();
          })
          .catch((error) => console.log(error));
          this.setState({eventID: eventList.data});
          for(var i = 0; i < this.state.eventID.length; i++)
          {
            fetchEvent(this.state.eventID[i]);
          } 
      };

      fetchEventList();
  }


  render() {
    return (   
      <div className="ScheduleCalender">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "80vh" }}
          views={['month']}
          onSelectEvent={this.handleSelectEvent} 
        />

      </div>
    );
  }
}

export default ScheduleCalendar;
