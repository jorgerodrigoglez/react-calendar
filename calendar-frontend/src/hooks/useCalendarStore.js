import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
 
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }
    // crear - actualizar
    const startSavingEvent = async( calendarEvent ) => {
        //console.log({calendarEvent});

        // backend
        try {

            if(calendarEvent.id){
                // peticion api al backend - editar un evento
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                // peticion api al backend - actualizar evento - user no es necesario
                dispatch( onUpdateEvent({ ...calendarEvent, name: user.name }));
               
            }else{
                // peticion api al backend - crear nuevo evento
                const { data } = await calendarApi.post('/events', calendarEvent );
                // console.log({data});
                // crear nuevo - user no es necesario
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, name: user.name }));
            }

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
        
    }

    // borrar
    const startDeletingEvent = async() => {
        try {
             // peticion api al backend
             await calendarApi.delete(`/events/${ activeEvent.id }`);
             dispatch( onDeleteEvent() );
            
         } catch (error) {
            console.log('Error al borrar el evento');
            console.log(error);
            Swal.fire('Error al eliminae evento', error.response.data.msg, 'error');
         }

    }

    // backend - listar eventos
    const startLoadingEvents = async() => {
        try {
             // peticion api al backend
             const { data } = await calendarApi.get('/events');
             //console.log({data});
             // convertir formato de fechas de la data de la ddbb backend a fechas de JS
             const events = convertEventsToDateEvents( data.events );
             console.log(events);
             dispatch( onLoadEvents( events ));

        } catch (error) {
            console.log('Error al recopilar eventos');
            console.log(error);
        }
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
        startDeletingEvent,
        startLoadingEvents
    }
}
