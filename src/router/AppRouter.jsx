import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../claendar";

export const AppRouter = () => {

  // Creamos una validación para ver el estado de autenticación
  // const authStatus = 'not-authenticated'
  const authStatus = 'authenticated'

  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
          ? <Route path='/auth/*' element={ <LoginPage/> } />
          : <Route path='/*' element={ <CalendarPage/> } />
      }      

      <Route path="/*" element={ <Navigate to='/auth/login' /> }  />

    </Routes>
  )
};
