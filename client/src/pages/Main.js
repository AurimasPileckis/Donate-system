import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from "../context/MainContext";
import axios from 'axios'


const Main = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)
  const [posts, setPosts] = useState([]);
  const [fund, setFund] = useState({})
   

    useEffect(() => {
        axios.get("/api/posts/confirmed")
          .then((res) => {
            setPosts(res.data);
          })
          .catch((error) => {
            console.log(error);
            setAlert({ message: error.response.data, status: "danger" });
          });
      }, [setAlert, navigate, refresh])

      const handleForm = (e) => {
        setFund({ ...fund, [e.target.name]: e.target.value });
      };

      const submitFunding = (id) => {
        axios.post(`/api/funds/new/${id}`, fund)
        .then(resp => {
          setAlert({message: resp.data, status: "success"})
          setRefresh(!refresh)
          setFund({})
        
        }).catch((error) => {
              console.log(error);
              setAlert({ message: error.response.data, status: "danger" });
            });
        }

    return (
      <div className="container">
      <div className="heading">
        <h2 className="title">Visos idėjos:</h2>
      </div>
      <div className="idea-container">
        {posts?.map((post) => {
          return (
            <div key={post.id} className={ post.isCompleted? "completed-card" : "idea-card"}>
              <img src={post.image} alt={post.id} className="idea-img" />
              <div className="idea-info">
                <div className="idea-header">
                  <div>TIKSLAS: <span className="bold">{post.amount_goal} EUR</span></div>
                  <div>SURINKTA: <span className="bold">{post.amount_collected} EUR</span></div>
                  <div>
                    LIKO: <span className="bold">{post.amount_goal - post.amount_collected} EUR</span>
                  </div>
                </div>
                <p className="idea-text">{post.text}</p>
              </div>
              <div className="idea-fundings-container">
                {post.funds.length > 0 ? <div className="bold"> Prie tikslo prisidėjo:</div> : <div className="bold">Prisidėk ir Tu:</div>}
                <table className="funder-table">
                  <thead>
                    <tr>
                      <th>Vardas</th>
                      <th>Pavardė</th>
                      <th>Suma</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {post.funds?.map((fund) => {
                      return (
                        <tr key={fund.id} className="funder">
                          <td>{fund.first_name}</td>
                          <td>{fund.last_name}</td>
                          <td>{fund.transfer} EUR</td>
                        </tr>
                      );
                    })}
					{post.isCompleted ? <div className="completed-message">
            Tikslas pasiektas!  
          </div> :
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="Jūsų vardas"
                          className="form-input"
						  onChange={(e) => handleForm(e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Jūsų pavardė"
                          className="form-input"
						  onChange={(e) => handleForm(e)}
                        />
                      </td>
                      <td>
                        <input type="number" name="transfer" placeholder="Suma"  className="form-input"  onChange={(e) => handleForm(e)}/>
                      </td>
                      <td>
                        <button onClick={() => submitFunding(post.id)} className="form--btn">Prisidėti</button>
                      </td>
                    </tr>}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Main
