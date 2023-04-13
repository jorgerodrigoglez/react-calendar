import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Vacaciones de invierno',
    notes: 'Hacer la reserva de hotel y comprar ropa',
    start: new Date(),
    end: addHours( new Date(), 2 ),

    bgColor: '#fafafa',
    user: {
        _id: 'qwqee',
        name: 'JRG'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
      events: [
        tempEvent
      ],
      activeEvent: null
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
            if( event._id === payload._id ){
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
            state.events = state.events.filter( event => event._id !== state.activeEvent._id );
            state.activeEvent = null;
        }
      },
      // onCloseModal - Calendario Modal - 
      onClearEventActive: (state) => {
        state.activeEvent = null;
      }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onClearEventActive } = calendarSlice.actions;