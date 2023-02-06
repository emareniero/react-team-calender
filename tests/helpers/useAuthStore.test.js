import { configureStore } from "@reduxjs/toolkit";
import { renderHook, act, waitFor } from "@testing-library/react";
import { da } from "date-fns/locale";
import { Provider } from "react-redux";
import { calendarApi } from "../../src/apis";
import { useAuthStore } from "../../src/helpers/useAuthStore";
import { authSlice } from "../../src/sotre";
import { initialState, notAuthenticateState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("debe regresar los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    // console.log(result.current);
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegistration: expect.any(Function),
    });
  });

  test("startLogin debe realizar el login correctamente", async () => {
    const mockStore = getMockStore({ ...notAuthenticateState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    // console.log( result.current)
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "63e0ae7317f4152939c6de78" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe fallar la autenticación", async () => {
    const mockStore = getMockStore({ ...notAuthenticateState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startLogin({ email: "asdf@adsf.com", password: "asdf1" });
    });

    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Credenciales incorrectas",
      status: "not-authenticated",
      user: {},
    });

    waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("startRegister debe crear un usuario", async () => {
    const newUser = { email: "algo@gmail.com", password: "123456789", name: "Test User 2" };

    const mockStore = getMockStore({ ...notAuthenticateState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "63e0ae7317f4152939c6de78",
        name: "Test User",
        token: "ALGUN-TOKEN",
      },
    });

    await act(async () => {
      await result.current.startRegistration(newUser);
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "63e0ae7317f4152939c6de78" },
    });

    spy.mockRestore();
  });

  test("startRegister debe fallar la creación", async () => {
    const mockStore = getMockStore({ ...notAuthenticateState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.startRegistration(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "El usuario testuser@gmail.com ya se encuentra registrado!",
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuth token debe fallar si no hay un token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuth token debe autenticar el usuario si hay un token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user })
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "63e0ae7317f4152939c6de78" },
    });
  });
});
