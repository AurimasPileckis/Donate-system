import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewPost = () => {
    const [form, setForm] = useState({
        text: '',
        image: '',
        amount_goal: ''
    })

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);

        }
        axios.post('/api/posts/new/', formData)
        .then(resp => {
            setAlert({
              message: resp.data,
              status: "success",
        });
            window.scrollTo(0, 0)
            navigate('/')
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: "danger",
            });
            if (error.response.status === 401) navigate("/login");
           
        })

    }

    return (
        <div className='container mw-50'>
          <div className="page-heading">
           <h3>Pridėti naują idėją</h3>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
          className="form-input"
          rows={10}
          name="text"
          onChange={(e) => handleForm(e)}
          style={{resize: 'none'}}
        />
                  
                <div className="form-group mb-2">
                    <label className="mb-1">Sumos tikslas:</label>
                    <input type="number" name="amount_goal" className="form-control" onChange={handleForm} />
                </div>
                <div>
                    <label className="mb-1">Pridėti nuotrauką:</label>
                    <input type="file" name="image" className="form-control" onChange={(e) => handleForm(e)} />
                </div>
                <button  className='btn btn-primary'>Siųsti</button>
           </form>        
        </div>
   
    )
}

export default NewPost

