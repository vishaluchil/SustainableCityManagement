import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Event.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);

class ScheduleCalendar extends Component {
  state = {
    events: [
      {}
    ]
  };

  addEvents(eventsList){
    this.setState(state => {
      const events = state.events.concat(eventsList);
      return {
        events,
      };
    });
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
      fetchEvent(130904455751);
      fetchEvent(138432727013);
      fetchEvent(141037654421);
      fetchEvent(144071470647);
      fetchEvent(139973682051);
      fetchEvent(137435680821);
      fetchEvent(137435801181);
      fetchEvent(144686530307);

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
        />
      </div>
    );
  }
}

export default ScheduleCalendar;
