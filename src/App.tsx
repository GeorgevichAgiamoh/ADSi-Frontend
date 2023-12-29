//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation, useParams, useNavigate} from 'react-router-dom'
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from 'react';
import { Login } from '@mui/icons-material';
import { MemberLogin, ForgotPin, Verif, ResetPin, MailLogin } from './components/pages/login';
import { Register, MakePayment } from './components/pages/register';

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
          <Route path='/'  element={<Register />}></Route>
            <Route path='/register'  element={<Register />}></Route>
            <Route path='/payments'  element={<MakePayment />}></Route>
            <Route path='/memlog'  element={<MemberLogin />}></Route>
            <Route path='/login'  element={<Login />}></Route>
            <Route path='/forgot'  element={<ForgotPin />}></Route>
            <Route path='/verif'  element={<Verif />}></Route>
            <Route path='/reset'  element={<ResetPin />}></Route>
            <Route path='/maillogin'  element={<MailLogin />}></Route>
          </Routes>
        </Router>
      </div> 
    </ThemeProvider>
  );
}



