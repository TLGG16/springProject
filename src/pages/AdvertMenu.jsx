import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AdvertMenu = () =>{
    const navigate = useNavigate();
    
    const [data,setData] = useState([]);
    const [fav,setFav] = useState([])
    const [kekw,setKekw] = useState();

    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        
        axios.get("http://localhost:8080/advertmenu").then(response =>{
            setData(response.data);
            console.log(response.data)
        }).catch(console.error())

        axios.get("http://localhost:8080/favourite/user"+JSON.parse(localStorage.getItem("user")).user_id).then(response =>{
              
            setFav(response.data);
            
            console.log(response.data)

        }).catch(console.error())
    }, [kekw])

    async function postFavourite(id){
        const obj = data.find((obj)=>obj.advert_id ===id)
        const user = JSON.parse(localStorage.getItem("user"))
        const obj2 = {
            advert: obj,
            user
        }
        await axios.post("http://localhost:8080/favourite/create", 
            obj2
            ).then(response => {
                setKekw(obj2)
            }).catch(error =>{
                console.log(error)
            })
    }

    const [filters, setFilters] = useState({
      drive:"",
      engine:"",
      transmission:"",
    })

    var {drive,engine,transmission} = filters
    const inputChange = (e)=>{
      setFilters({...filters, [e.target.name]:e.target.value})
      console.log(drive)
      console.log(engine)
      console.log(filters.transmission)
  }

    return(
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}>
          <div style={{
                    width: "400px",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    borderColor: "transparent !important",
                    background: "#ffffff",
                    boxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.25)",
                    borderRadius: "7px",
                    border: "0px !important",
                  }}>
          <p>Коробка передач</p>
          <select className="form-control" name="transmission" value={transmission} onChange={(e)=>{
            inputChange(e)
            }}
            >
              <option value="">Выберите опцию</option>
              <option  value="автомат" > автомат
              </option>
              <option value="механика" > механика
              </option>
            </select>
            <p>Тип двигателя</p>
          <select className="form-control" name="engine" value={engine} onChange={(e)=>{
            inputChange(e)
            }}
            >
              <option value="">Выберите опцию</option>
              <option value="бензин" > бензин
              </option>
              <option value="дизель" > дизель
              </option>
              <option value="электро" > электро
              </option>
            </select>
            <p>Привод</p>
          <select className="form-control" name="drive" value={drive} onChange={(e)=>{
            inputChange(e)
            }}
            >
              <option value="">Выберите опцию</option>
              <option value="полный" > полный
              </option>
              <option value="передний" > передний
              </option>
              <option value="задний" > задний
              </option>
            </select>

            <br></br>
            </div>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
            <th>Марка</th>
            <th>Модель</th>
            <th>Тип двигателя</th>
            <th>Привод</th>
            <th>Коробка передач</th>
            <th>Цена</th>
            <th>Контакт</th>
            <th>кнопки</th>
            </tr>
          </thead>
          <tbody>
          {data.filter(item => (
              (item.car.engine == filters.engine || filters.engine=="") &&
              (item.car.drive == filters.drive || filters.drive=="") &&
              (item.car.transmission == filters.transmission || filters.transmission=="")
              )
            ).map(item => (
              <tr key={item.advert_id}>
                <td>{item.car.brand}</td>
                <td>{item.car.model}</td>
                <td>{item.car.engine}</td>
                <td>{item.car.drive}</td>
                <td>{item.car.transmission}</td>
                <td>{item.price}</td>
                <td>{item.user.person.name}</td>
                <td>
                <Link to={`/advert/${item.advert_id}`}>
                <button>Просмотреть</button>
                </Link>
                {(!fav.some(f => f.advert.advert_id == item.advert_id)|| fav.length == 0 ) && (
                <button onClick={()=>postFavourite(item.advert_id) }>Добавить в избранное</button>
                )
                }
                
                </td>
              </tr>
            ))}
            {/* {data.map(item => (
              (
              (item.car.engine == filters.engine && filters.engine!="") &&
              (item.car.drive == filters.drive && filters.drive!="") &&
              (item.car.transmission == filters.transmission && filters.transmission!="")
              )
              
              && (
              <tr key={item.advert_id}>
                <td>{item.car.brand}</td>
                <td>{item.car.model}</td>
                <td>{item.car.engine}</td>
                <td>{item.car.drive}</td>
                <td>{item.car.transmission}</td>
                <td>{item.price}</td>
                <td>{item.user.person.name}</td>
                <td>
                <Link to={`/advert/${item.advert_id}`}>
                <button>Просмотреть</button>
                </Link>
                {(!fav.some(f => f.advert.advert_id == item.advert_id)|| fav.length == 0 ) && (
                <button onClick={()=>postFavourite(item.advert_id) }>Добавить в избранное</button>
                )
                }
                
                </td>
              </tr>
              )
            ))} */}
          </tbody>
        </table>
        <a class="btn btn-success" href='/advert/create'>Create</a>
                
        </div>
    )

};

export default AdvertMenu;