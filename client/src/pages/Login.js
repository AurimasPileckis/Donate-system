import React from 'react'
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import MainContext from '../context/MainContext';

const Login = () => {
  const { setAlert, setRefresh, refresh } = useContext(MainContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/users/login/", form)
      .then((resp) => {
        setAlert({
          message: resp.data.message,
          status: "success",
        });
        setRefresh(!refresh)

          // if (resp.data.user.role === 1) return navigate("/admin")
          navigate("/");
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  };
    return (
        <div className="container mw-50">
            <form onSubmit={handleSubmit}>
            <h1>Prisijungti</h1>
                <div className="form-group mb-2">
                    <input type="email" name="email" className="form-control" onChange={handleForm} placeholder="kazkas@gmail.com" />
                </div>
                <div className="form-group mb-3">
                    <input type="password" name="password" className="form-control" onChange={handleForm} placeholder="password" />
                </div>
                <button className="btn btn-primary">Prisijungti</button>
                <div>Neprisiregistravęs? 
                    <Link to="/register" style={{ textDecoration: 'none'}}> Registruotis</Link>
                </div>
            </form>
        </div>
    )
}

export default Login