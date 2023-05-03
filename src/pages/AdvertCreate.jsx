import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const AdvertCreate = () =>{
    const navigate = useNavigate()
    
    const [options, setOptions] = useState([])
    const [advert, setAdvert] = useState({
        user : {},
        car : {},
        description : "",
        price : ""
    })
    const [carOption, setCarOption] = useState(null);
    
    var {description, price, car, user} = advert
    
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
        
        
    }, [])

    

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
                
            }).catch(error =>{
                console.log(error)
            })
    }

    return(
        <div>
        <form onSubmit={(e)=>{
                postCreate(e);
            }}>
        <br></br>
            <label for ="description" class="form-label">Введите описание объявления</label>
            <input class="form-control" type='text' name='description' value={description} onChange={(e)=>{
                    inputChange(e)
            }}></input>
            <label for ="description" class="form-label">Введите цену продажи</label>
            <input class="form-control" type='text' name='price' value={price} onChange={(e)=>{
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
            <select class="form-control" value={carOption} onChange={(e)=>{
                    handleSelectChange(e)
                    console.log(advert.car)
            }}
            >
            <option value="">Выберите опцию</option>
            {options.map((option) => (
            <option key={option.id } value={JSON.stringify( option)}>
            {option.name}
            </option>
        ))}
            </select>

            <button type="submit">Отправить</button>

            
        </form>
        </div>
    )
};

export default AdvertCreate;