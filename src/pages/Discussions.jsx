import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Discussions = () =>{
    const navigate = useNavigate();

    const [data,setData] = useState([{
        car:{
            name:""
        }
    }]);

    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        
        axios.get("http://localhost:8080/discussionmenu").then(response =>{
            setData(response.data);
        }).catch(console.error())
    }, [])

    return(
        <div>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Тема</th>
              <th>Марка машины</th>
              <th>Модель</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.discussion_id}>
                <td>{item.theme}</td>
                <td>{item.car.brand}</td>
                <td>{item.car.model}</td>
                
                <td>
                <Link to={`/discussion/`+item.discussion_id}>
                <button>Перейти в обсуждение</button>
                </Link>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <a class="btn btn-success" href='/discussion/create'>Create</a>
            


        </div>
    )

};

export default Discussions;