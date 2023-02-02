import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {

  
  const { openDateModal } = useUiStore() 
  const { events, setAciveEvent  } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    setAciveEvent( event );
    
  };

  const onViewChanged = (event) => {
    // console.log({ viewChanged: event })
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={ events }
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete />
    </>
  );
};
