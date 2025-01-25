import React, {useRef} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
    const calendarRef = React.useRef(null);
  return (
    <div>
        <div style={{position:"relative", zIndex:0}}>
          <Fullcalendar 
          ref={calendarRef}
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start:"dayGridMonth,timeGridWeek,timeGridDay",
            center:"title",
            end:"today prev,next"
          }}
          height={"90vh"}
          />
        </div>
    </div>
  );
}