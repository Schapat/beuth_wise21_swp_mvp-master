import React, { Component } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment) // or globalizeLocalizer
const myEventsList = [
  {
    title: 'New Tabletop Round',
    start: Date('2020-11-30T09:24:00'),
    end: Date('2020-12-01T09:24:00'),
    allDay: true, 
    resource: null
  },
  {
    title: 'Continue Tabletop Game',
    start: new Date(2020,12,15),
    end: new Date(2020,12,16),
    allDay: true, 
    resource: null
  }
]

let allViews = Object.keys(Views).map(k => Views[k])
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })


class MeetingCalendar extends Component {

  render(){
    return(
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          views={allViews}
          step={60}
          showMultiDayTimes
          defaultDate={new Date(Date.now())}
          components={{
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          style={{ height: 500, margin: '2rem', color: '#1b1161' }}
        />
        
      </div>
    )
  }
}

export default MeetingCalendar;