import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

const Admin = () => {
  const { setAlert } = useContext(MainContext);
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((resp) => setPosts(resp.data))
      .catch((error) => {
        console.log(error);
        setAlert({ message: error.response.data, status: "danger" });
      });
  }, [setAlert, navigate, refresh]);
  const handleDelete = (id) => {
    axios.delete(`api/posts/delete/${id}`).then(resp => {
      setAlert({message: resp.data, status: "success"})
      setRefresh(prevState => !prevState)
    }).catch((error) => {
      console.log(error);
      setAlert({ message: error.response.data, status: "danger" });
      if (error.response.status === 401) navigate("/login");
    });
  }
  const confirmPost = (id) => {
    axios.put(`api/posts/confirm/${id}`).then(resp => {
      setRefresh(!refresh)
      setAlert({message: resp.data, status: "success"});
    }).catch((error) => {
      console.log(error);
      setAlert({ message: error.response.data, status: "danger" });
      if (error.response.status === 401) navigate("/");
    });
  }
  
  return (
    <div className="container">
      <div className="heading">
        <h1 className="title">Aministratoriaus panelė:</h1>
      </div>
      <div className="idea-container">
        {posts?.map((post) => {
          return (
            <div key={post.id} className="idea-card">
              <img src={post.image} alt={post.id} className="idea-img" />
              <div className="idea-info">
                <div className="idea-header">
                  <div className="bold">TIKSLAS: {post.amount_goal} EUR</div>
                  <div className="bold">SURINKTA: {post.amount_collected} EUR</div>
                  <div className="bold">
                    LIKO: {post.amount_goal - post.amount_collected} EUR
                  </div>
                </div>
                <p className="idea-text">{post.text}</p>
              </div>
              <div className="admin-actions">
                <div>
                  Statusas: <span className="bold">
                    {post.status ? "Patvirtinta" : "Laukia patvirtinimo"}
                    </span>
                </div>
                <button disabled={post.status && "disabled"} onClick={() => confirmPost(post.id)} className={post.status ? "disabled-btn": "btn"}>Patvirtinti</button>
                <button onClick={() => handleDelete(post.id)} className="btn">Ištrinti</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;