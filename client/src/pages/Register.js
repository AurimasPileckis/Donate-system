import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })


    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/register', form)
        .then(resp => {
            console.log(resp)
            setTimeout(() => navigate('/login'), 1000)
        })
        .catch (error => {
            console.log(error)

        })
    }
    return (
        <div className='container mw-50'>
            <form className="register-form"  onSubmit={handleSubmit}>
            <h1>Registracija</h1>
        <div className="form-group mb-2">
            <input className="form-control" type='text' name='first_name' placeholder="First Name" onChange={handleForm} />
        </div>
        <div className="form-group mb-2">
            <input className="form-control" type='text' name='last_name' placeholder="Last Name" onChange={handleForm} />
        </div>
        <div className="form-group mb-2">
            <input className="form-control" type='email' name='email' placeholder="E-mail" onChange={handleForm} />
        </div>
        <div className="form-group mb-2">
            <input className="form-control"  type='password' name='password' placeholder="Password" onChange={handleForm} />
        </div>   
            <button className="btn btn-dark">Register</button>
        </form>
           
        </div>
    )
}
export default Register