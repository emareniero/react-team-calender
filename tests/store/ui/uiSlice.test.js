import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/sotre/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
  test("debe regresar el estado por defecto", () => {
    // console.log(uiSlice.getInitialState())
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test("debe cambiar el isDateModalOpen correctamente", () => {
    let state = uiSlice.getInitialState();
    // console.log(state);
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
