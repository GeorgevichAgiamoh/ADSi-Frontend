//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation, } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material";
import { lazy, useEffect, useState } from 'react';
import {  ForgotPassword, MailLogin, PasswordResetRequest, ResetPassword, Verif, } from './components/pages/login';
import { MakePayment, Register } from './components/pages/register';
import { Members } from './components/pages/members/members';
import { Admin } from './components/pages/admin/admin';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const theme = createTheme({
  palette: {
      primary:{
          main: '#0411A7'
      },
      secondary:{
          main:'#FFA500'
      },
  }
})


export default function App() {
  const[isNgt, setNgt] = useState(false)
  const[isApp, setIsApp] = useState(true)
  //const qry = useQuery();

  useEffect(()=>{
    let murl = window.location.href;
    if(murl.includes('mode=')){
      let url = murl.split('mode=')[1]
      if(url.startsWith('n')){
        setNgt(true)
      }
    }
    setIsApp(murl.includes('app='))
  },[])
 
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Routes>
          <Route path='/'  element={<Members />}></Route>
            <Route path='/register'  element={<Register />}></Route>
            <Route path='/login'  element={<MailLogin />}></Route>
            <Route path='/adminlogin'  element={<MailLogin isAdmin />}></Route>
            <Route path='/payments'  element={<MakePayment />}></Route>
            <Route path='/forgotpassword'  element={<ForgotPassword />}></Route>
            <Route path='/verif'  element={<Verif />}></Route>
            <Route path='/passwordreset/:token'  element={<ResetPassword />}></Route>
            <Route path='/maillogin'  element={<MailLogin />}></Route>
            <Route path='/passwordreset'  element={<PasswordResetRequest />}></Route>
            <Route path='/admindash'  element={<Admin />}></Route>
            <Route path='/memberdash'  element={<Members />}></Route>
          </Routes>
        </Router>
      </div> 
    </ThemeProvider>
  );
}



