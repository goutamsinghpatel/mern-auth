
// import './App.css'
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
  import { ToastContainer} from 'react-toastify';
import PageNotFound from "./pages/PageNotFound"


function App() {


  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
          <Route path='/Email-verify' element={<EmailVerify/>}/>
            <Route path='/Reset-password' element={<ResetPassword/>}/>
            <Route path='/*' element={<PageNotFound/>}/>
               

    </Routes>
    </>
  )
}

export default App
