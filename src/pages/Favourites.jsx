import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

const Favourites = ()=>{
    const navigate = useNavigate();

    const [fav,setFav] = useState([])


    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        

        axios.get("http://localhost:8080/favourite/user"+JSON.parse(localStorage.getItem("user")).user_id).then(response =>{
            setFav(response.data);
            console.log(response.data)

        }).catch(console.error())
    }, [])

    async function deleteFavourite(id){
        
        await axios.delete("http://localhost:8080/favourite/"+id
            ).then(response => {
                
            }).catch(error =>{
                console.log(error)
            })
    }

    return(
        <div>
            <h1>Избранное</h1>
            <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
            <th>Марка</th>
            <th>Модель</th>
              <th>Цена</th>
              <th>Контакт</th>
              <th>Кнопки</th>
            </tr>
          </thead>
          <tbody>
            {fav.map(item => (
              <tr key={item.favourite_id}>
                <td>{item.advert.car.brand}</td>
                <td>{item.advert.car.model}</td>
                <td>{item.advert.price}</td>
                <td>{item.advert.user.person.name}</td>
                <td>
                <Link to={`/advert/${item.advert.advert_id}`}>
                <button>Просмотреть</button>
                </Link>
                <button onClick={()=>deleteFavourite(item.favourite_id)}>Удалить из избарнного</button>
                
                
            
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    )
}
export default Favourites;