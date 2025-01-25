import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from "react";
export default function Calendar() {
    const [records, setRecords] = useState([]);
    
      // This method fetches the records from the database.
      useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:5000/api/`);
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const records = await response.json();
          setRecords(records);
        }
        console.log(records);
        getRecords();
        return;
      }, [records.length]);
    
  return (
    <div>
        <div style={{position:"relative", zIndex:0}}>
          <Fullcalendar 
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start:"dayGridMonth,timeGridWeek,timeGridDay",
            center:"title",
            end:"today prev,next"
          }}
          height={"90vh"}
          events={records}
          />
        </div>
    </div>
  );
}