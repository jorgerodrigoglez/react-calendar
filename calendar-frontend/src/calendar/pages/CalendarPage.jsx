import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
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
  title: '',
  note: '',
  start: new Date(),
  end: addHours( new Date(), 2 ),

  bgColor: '#fafafa',
  name: ''
  }
}]*/

export const CalendarPage = () => {
  //* redux
  const { user } = useSelector( state => state.auth );
  //* Hooks
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // recoger el valor de la ultima vista del calendario en local storage
  const [lastView, setLastView] = useState(localStorage.getItem('last-view') || 'month' );
  // format texts & color
  const [formatText, setFormatText] = useState(false);
  const [colorDisabled, setColorDisabled] = useState(false);

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log({event, start, end, isSelected});
    // asignar colores a usuario
    //console.log(event);
    //console.log(user);
    
    // colorear los eventes del calendario dependiendo del usuario activo
    const activeUseColor = ( user.uid === event.user_id );

    const style = {
      backgroundColor: activeUseColor ? '#347CF7' : '#6ab2f0',
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
    setFormatText(true);
    // una vez activo el evento
    if( user.uid !== event.user_id ){
      setColorDisabled(true);
    }
  }

  const onSelect = ( event ) => {
    //console.log({ select: event })
    setActiveEvent( event );
    // una vez activo el evento
    if( user.uid !== event.user_id ){
      return setColorDisabled(true);
    }
    setColorDisabled(false);
  }

  const onViewChanged = ( event ) => {
    //console.log({ viewChange: event })
    localStorage.setItem('last-view', event );
  }

  // useCalendarStore - backend - lista los eventos
  useEffect(() => {
    startLoadingEvents();
  }, [])
  


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

      <CalendarModal formatText={formatText} colorDisabled={colorDisabled}/>

      <FabAddNew setFormatText={setFormatText} setColorDisabled={setColorDisabled}/>
      <FabDelete colorDisabled={colorDisabled}/>

    </>
  )
}
