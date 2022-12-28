import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios';
import Main from './pages/Main'
import Register from './pages/Register'
import Login from './pages/Login'
import NewPost from './pages/NewPost'
import Admin from "./pages/Admin";
import Header from './components/Header/Header'
import Alert from './components/Alert/Alert'
import MainContext from './context/MainContext'


import './App.css';
const App = () =>  {
  const [alert, setAlert] = useState({
    message: "",
    status: "",
  });

  const [userInfo, setUserInfo] = useState({})
  const [refresh, setRefresh] = useState(false);
  const contextValues = { userInfo, setUserInfo, alert, setAlert, setRefresh };

  useEffect(() => {
    axios
      .get("/api/users/check-auth/")
      .then((resp) => {
        setUserInfo(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  console.log(userInfo)
  
  return (
    <BrowserRouter>
    <MainContext.Provider value={contextValues}>
      <Header  />
      <Alert  />
      <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="*" element={<Main />} />
        {userInfo.id && <Route path="/admin" element={<Admin />} />}
      </Routes>
      </div>
      </MainContext.Provider>
    </BrowserRouter>
    )
  }

export default App;
