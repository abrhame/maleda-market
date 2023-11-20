import { useState, useEffect } from 'react';
import '../../styles/timeoptions.css'

function TimeSelector() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const date = new Date();
    const day = date.getDay();
    
    let start, end, interval;
    
    if(day >= 1 && day <= 3) {
      start = new Date(date.getTime());
      start.setHours(9, 45, 0, 0);
      end = new Date(date.getTime()); 
      end.setHours(19, 0, 0, 0);
      interval = 15;
    } else if(day >= 4 && day <= 6) {
      start = new Date(date.getTime());
      start.setHours(9, 45, 0, 0); 
      end = new Date(date.getTime());
      end.setHours(19, 30, 0, 0);
      interval = 15;
    } else {
      start = new Date(date.getTime());
      start.setHours(10, 15, 0, 0);
      end = new Date(date.getTime());
      end.setHours(18, 30, 0, 0); 
      interval = 15;  
    }

    const timeSlots = [];
    
    while(start < end) {
      timeSlots.push(formatTime(start));
      start.setMinutes(start.getMinutes() + interval);
    }

    setTimes(timeSlots);

  }, []);

  function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  }

  return (
    <select className='time'>
      {times.map(time => 
        <option key={time}>{time}</option>  
      )}
    </select>
  )
}

export default TimeSelector;