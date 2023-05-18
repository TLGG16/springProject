import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const DialogMenu = () =>{
    const navigate = useNavigate();
    
    
    const [data,setData] = useState([
        {
            advert:{
              car:{

              },
                description:""
            },
            user:{
                person:{
                    name:""
                }
            }
            
        }
    ]);
    const [fav,setFav] = useState([])
    const [kekw,setKekw] = useState();


    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        
        axios.get("http://localhost:8080/dialogmenu/"+ JSON.parse(localStorage.getItem("user")).user_id)
        .then(response =>{
            setData(response.data);
            console.log(response.data)
        }).catch(console.error())

        
    }, [kekw])

  

    return(
        <div>
          
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Объявление</th>
              <th>Имя пользователя</th>
              <th>кнопки</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.dialog_id}>
                <td>{item.advert.car.brand +" " + item.advert.car.model}</td>
                <td>{item.user.person.name}</td>
                <td>
                <Link to={`/home/dialog/${item.dialog_id}`}>
                <button>Просмотреть</button>
                </Link>

                
            
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    )

};

export default DialogMenu;