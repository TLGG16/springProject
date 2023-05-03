import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CarMenu = () =>{
    const navigate = useNavigate();
    
    const [data,setData] = useState([]);
    
    
    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        if(JSON.parse( localStorage.getItem("user")).role != "admin"){
            console.log(JSON.parse( localStorage.getItem("user")).role)
            navigate("/login");
        }
        axios.get("http://localhost:8080/carmenu").then(response =>{
            setData(response.data);
        }).catch(console.error())
    }, [])




    return(
        <div>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>id</th>
              <th>name</th>
              <th>brand</th>
              <th>model</th>
              <th>release_year</th>
              <th>technical_info</th>
              <th>кнопки</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.car_id}>
                <td>{item.car_id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.release_year}</td>
                <td>{item.technical_info}</td>
                <td>
                <Link to={`/admin/carmenu/update/${item.car_id}`}>
                <button>Update</button>
                </Link>
                <Link to={`/admin/carmenu/delete/${item.car_id}`}>
                <button>Delete</button>
                </Link>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <a class="btn btn-success" href='/admin/carmenu/create'>Create</a>
            


        </div>
    )

};

export default CarMenu;