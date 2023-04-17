import { createSlice } from '@reduxjs/toolkit';
//import { addHours } from 'date-fns';

/*const tempEvent = {
    //_id: new Date().getTime(),
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    name: ''
}*/

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
      events: [
        //tempEvent
      ],
      activeEvent: null,
      isLoadingEvents: true,
    },
    reducers: {
      onSetActiveEvent: (state, { payload } ) => {
        state.activeEvent = payload;
      },
      onAddNewEvent: ( state, { payload} ) => {
        state.events.push( payload );
        state.activeEvent = null;
      },
      onUpdateEvent: ( state, { payload } ) => {
        state.events = state.events.map( event => {
            if( event.id === payload.id ){
                return payload;
            }           
            return event;
        });
        state.activeEvent = null;
      },
      onDeleteEvent: ( state ) => {
        // si hay un evento activo
        if( state.activeEvent ){
            // devuelve todos los eventos cuyo id sea diferente al de la nota activa
            state.events = state.events.filter( event => event.id !== state.activeEvent.id );
            state.activeEvent = null;
        }
      },
      // onCloseModal - Calendario Modal - 
      onClearEventActive: (state) => {
        state.activeEvent = null;
      },
      // se crea para listar los eventos que vienen del backend
      onLoadEvents: ( state, { payload = [] }) => {
        state.isLoadingEvents = false;
        //state.events = payload;
        payload.forEach( event => {
          // devuelve true o false
          const exits = state.events.some( eventDB => eventDB.id === event.id );
          if(!exits){
            state.events.push(event);
          }
          //state.events.push(event);
        });
      },
      // limpiar el store al hacer logout
      onClearLogout: (state) => {
        state.isLoadingEvents = false;
        state.events = [];
        state.activeEvent = null;
      }
    
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onClearEventActive, onLoadEvents, onClearLogout } = calendarSlice.actions;