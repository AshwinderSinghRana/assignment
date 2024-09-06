import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/Profile/:id' element={<Profile />}></Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
