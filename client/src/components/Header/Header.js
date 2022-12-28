import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import axios from 'axios'

const Header = () => {
    const { userInfo, setAlert, setUserInfo } = useContext(MainContext);
    const navigate = useNavigate();

    const logout = () => {
        axios
          .get("api/users/logout")
          .then((resp) => {
            setUserInfo({});
            setAlert({ message: resp.data, status: "success" });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setAlert({ message: error.response.data, status: "danger" });
          });
      };
   
    return (
        <header className="p-3 text-bg-light">
             
        <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <h1 className="fs-4 text-dark">
                    Aukok
                </h1>
            </Link>
            <ul className="nav nav-pills">
         
            </ul>
            <div className='text-end'>
            <ul className="nav nav-pills">
                
                <li className="nav-item">
                <Link to="/" 
                      className="nav-link text-dark" 
                      aria-current="page">
                        Titulinis
                </Link>
                </li>
                 <li className="nav-item">
                <Link to="/new-post" className="nav-link text-dark" 
                      aria-current="page">
                        +Nauja idėja
                </Link>
                </li>
                {userInfo.id ? (
                <>
                 <li>
                <Link to="/admin" className="nav-link">
                  Administratorius
                </Link>
              </li>
                <li className="nav-item">
                     <Link to="/logout" className="nav-link text-dark" onClick={() => logout()} aria-current="page">Atsijungti</Link>
                 </li>
                 </>
                ) : (
                <li className="nav-item">
                    <Link to="/login" className="nav-link text-dark" aria-current="page">Prisijungti</Link>
                </li>
                )}
            </ul>
            </div>
            </div>
            </div>
              
            
            
            </header>
    
    )
}

export default Header