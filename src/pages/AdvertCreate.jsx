import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const AdvertCreate = () =>{
    const navigate = useNavigate()
    
    const [options, setOptions] = useState([])
    const [advert, setAdvert] = useState({
        user : JSON.parse(localStorage.getItem("user")),
        car : {},
        description : "",
        price : "",
        photo_url:"",
        city:"",

    })
    const [carOption, setCarOption] = useState(null);
    
    var {description, price, car, user, photo_url, city} = advert
    
    const inputChange = (e)=>{
        setAdvert({...advert, [e.target.name]:e.target.value})
        console.log(e.target.value)
        console.log(advert.car)
    }

    const handleSelectChange = (e)=>{
        const v = e.target.value;
        setCarOption(v)
        setAdvert({...advert, car:JSON.parse(v)})

        
    }
    const [kekw, setKekw] = useState()

    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            alert("Вы не зарегистрированны")
            navigate("/login");
        }
        setAdvert({...advert, user:JSON.parse( localStorage.getItem("user") )})
        console.log(advert.user)
        axios.get("http://localhost:8080/carmenu").then(response =>{
            console.log(response.status);
            setOptions(response.data)
            setAdvert({...advert, car: ""  })
        }).catch(console.error())
        
        
    }, [kekw])

    

    const postCreate = async (e) => {
        e.preventDefault()
        if(advert.car ===""){
            alert("Сделайте выбор")
            console.log("Ошибка")
            return
        }
        // // car_id = foundOption
        // setAdvert({...advert, car: foundOption})
        // console.log(foundOption)
        // console.log(advert.car)
        await axios.post("http://localhost:8080/advert/create", 
            advert
            ).then(response => {
                setKekw(advert)
            }).catch(error =>{
                console.log(error)
            })
    }

    return(
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}>
        <form onSubmit={(e)=>{
                postCreate(e);
            }}>
                <div 
                style={{
                    width: "400px",
                    height: "400px",
                    display: "flex",
                    color : "blue",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    borderColor: "transparent !important",
                    background: "#ffffff",
                    boxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.25)",
                    borderRadius: "7px",
                    border: "0px !important",
                  }}
                  >
            <label for ="description" class="form-label">Введите описание объявления</label>
            <input class="form-control" type='text' name='description' value={description} onChange={(e)=>{
                    inputChange(e)
            }}></input>
            <label for ="description" class="form-label">Введите цену продажи</label>
            <input class="form-control" type='number' name='price' value={price} onChange={(e)=>{
                    inputChange(e)
            }}></input>
            <label for ="photo_url" class="form-label">Введите ссылку на фото машины</label>
            <input class="form-control" type='text' name='photo_url' value={photo_url} onChange={(e)=>{
                    inputChange(e)
            }}></input>
            <label for ="city" class="form-label">Ваш город</label>
            <input class="form-control" type='text' name='city' value={city} onChange={(e)=>{
                    inputChange(e)
            }}></input>
            
            
            {/* <label for="car" class="form-label">Выберите машину</label>
            <input class="form-control" list="cars" name="car_id"  value={car_id} onChange={(e)=>{
                    inputChange(e)
            }}></input>
            <datalist id='cars'>
            {options.map((option) => (
            <option key={option.id} value={option.id}>
            {option.name}
            </option>
        ))}
            </datalist> */}

            {/* Брендан Эйх как же ты слаб  */}
            <label class="form-label">Выберите машину</label>
            <select class="form-control" value={carOption} onChange={(e)=>{
                    handleSelectChange(e)
                    console.log(advert.car)
            }}
            >
            <option value="">Выберите опцию</option>
            {options.map((option) => (
            <option key={option.id } value={JSON.stringify( option)}>
            {option.brand +" " +option.model +" "+option.engine +" "+option.drive +" "}
            </option>
        ))}
            </select>
            </div>
            <button
            style={{
                background: "#4CAF50",
                color: "white",
                padding: "14px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            type="submit">Отправить</button>

            
        </form>
        </div>
    )
};

export default AdvertCreate;