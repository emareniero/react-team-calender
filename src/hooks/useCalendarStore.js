import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdatedEvent } from "../sotre/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar)

    const setAciveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent ) => {
      // TODO: Llegar al backend

      // Todo bien
      if ( calendarEvent._id ) {
        // Actualizando
        dispatch( onUpdatedEvent( { ...calendarEvent  } ) )
      } else {
        // Creando
        dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) ) 
      }
    }

    const startDeletingEvent = () => {

      // TODO: Llegar al backend
      dispatch( onDeleteEvent() ) 
    }

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent, // Si es null regresa falso, si tiene un objeto regresa true. Para eso las !!

    //* Métodos
    setAciveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
