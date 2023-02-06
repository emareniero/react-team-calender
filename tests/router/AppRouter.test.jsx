import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/claendar";
import { useAuthStore } from "../../src/helpers/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/helpers/useAuthStore");
jest.mock("../../src/claendar", () => ({
  CalendarPage: () => <h1>Calendar Page</h1>
}))



describe("Pruebas en AppRouter", () => {
  const mockCheckAuthToken = jest.fn();

  test("debe mostrar la pantalla de carga y llamar checkOutToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter></AppRouter>);
    // screen.debug()

    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe mostrar el login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const {container} = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter></AppRouter>
      </MemoryRouter>
    );
    // screen.debug()
    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect( container ).toMatchSnapshot();

  });

  test("debe mostrar el calendario si estamos autenticados", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

   render(
      <MemoryRouter>
        <AppRouter></AppRouter>
      </MemoryRouter>
    );
    // screen.debug()
    expect(screen.getByText('Calendar Page')).toBeTruthy();

  }); 
});
