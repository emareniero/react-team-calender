import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdatedEvent,
} from "../../../src/sotre/calendar/calendarSlice";
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  test("debe regresar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe activar el evento", () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
    // console.log(state);
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe agregar el evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2023-2-8 11:00:00"),
      end: new Date("2023-2-8 12:00:00"),
      title: "Cumpleaños de Cristian",
      notes: "una nota de Cristian",
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
    //   console.log( state )
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdatedEventdebe actualizar el evento", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2023-2-6 9:00:00"),
      end: new Date("2023-2-6 13:00:00"),
      title: "Cumpleaños de Ema!!!!",
      notes: "una nota y una torta",
    };

    const state = calendarSlice.reducer(calendarWithEventsState, onUpdatedEvent(updatedEvent));
    //   console.log( state )
    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent debe borrar el evento activo", () => {
    const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent());
    // console.log(state)
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents debe cargar todos los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    const newState = calendarSlice.reducer( state, onLoadEvents( events ))
    expect( state.events.length ).toBe( events.length )
  });

  test("onLogoutCalendar debe limpiar el estado", () => {
    const state = calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar());
    expect(state).toEqual(initialState);
  });
});
