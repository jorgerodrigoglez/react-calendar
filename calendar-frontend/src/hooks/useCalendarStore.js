import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {
 
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }
    // crear - actualizar
    const startSavingEvent = async( calendarEvent ) => {
        // backend

        // OK
        if( calendarEvent._id){
            // actualizar
            dispatch( onUpdateEvent({ ...calendarEvent }));
        }else{
            // crear nuevo
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    // borrar
    const startDeletingEvent = () => {
        // backend

        // OK
        dispatch( onDeleteEvent() );
    }

    return{
        // Propiedades
        events,
        activeEvent,
        // si tiene un objeto regresa true - 
        // si no tiene objeto es null y regresa false
        hasEventSelected: !!activeEvent,
        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
