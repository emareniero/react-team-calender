export const events = [
  {
    id: "1",
    start: new Date("2023-2-6 9:00:00"),
    end: new Date("2023-2-6 13:00:00"),
    title: "Cumpleaños de Ema",
    notes: "una nota",
  },
  {
    id: "2",
    start: new Date("2023-1-6 15:00:00"),
    end: new Date("2023-1-6 17:00:00"),
    title: "Cumpleaños de Yami",
    notes: "una nota de Yami",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventsState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: {...events[0]},
};
