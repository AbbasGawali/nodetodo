import { useContext, useEffect, useState } from 'react'
import "./styles/app.scss"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Context, server } from './main';
function App() {
  const { setUser, setLoading, isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    // if (isAuthenticated) {


      setLoading(true);
      setRefresh(prev => !prev)
      axios.get(`${server}/users/me`, {
        withCredentials: true,
      }).then(res => {
        setLoading(false);
        console.log(res.data.user);
        setUser(res.data.user);
        setIsAuthenticated(true);
        console.log(res.data.user);

      }).catch((err) => {
        setLoading(false);
        setUser({});
        setIsAuthenticated(false);
      })
    // }else{
    //   console.log("Login first");
    // }
  }, [refresh])


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
