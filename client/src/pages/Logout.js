import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = (props) => {
    const { setLoggedIn } = props

    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/api/users/logout', {
            withCredentials: true
        })
        .then(resp => {
            localStorage.clear()
            setLoggedIn(false)
            setTimeout(() => navigate('/'), 2000)
            console.log(resp)
        })
        .catch(error => {
            setTimeout(() => navigate('/'), 2000)
            console.log(error)
        })
    }, [navigate])

    return (
        <div>Atsijungete</div>
    )
    
}

export default Logout