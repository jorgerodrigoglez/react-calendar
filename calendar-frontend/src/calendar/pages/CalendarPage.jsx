import { useState } from 'react';

// yarn add react-big-calendar - https://www.npmjs.com/package/react-big-calendar
// yarn add date-fns
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

//import { addHours } from 'date-fns';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew , FabDelete } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

// Ahora en calendarSlice
/*const events = [{
  title: 'Vacaciones de invierno',
  note: 'Hacer la reserva de hotel y comprar ropa',
  start: new Date(),
  end: addHours( new Date(), 2 ),

  bgColor: '#fafafa',
  user: {
    _id: 'qwqee',
    name: 'JRG'
  }
}]*/

export const CalendarPage = () => {
  //* Hooks
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  // recoger el valor de la ultima vista del calendario en local storage
  const [lastView, setLastView] = useState(localStorage.getItem('last-view') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }

  };

  const onDoubleClick = ( event ) => {
    //console.log({ doubleClick: event })
    openDateModal();
  }

  const onSelect = ( event ) => {
    console.log({ select: event })
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    //console.log({ viewChange: event })
    localStorage.setItem('last-view', event );
  }


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal/>

      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
