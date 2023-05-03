import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CarUpdate = () =>{
    const navigate = useNavigate();
    const { id } = useParams();
    const [car, setCar] = useState({
        name:"",
        model:"",
        brand:"",
        release_year:"",
        technical_info:""
    })
    const {name,model,brand,release_year,technical_info} = car;
    
    const inputChange = (e)=>{
        setCar({...car, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        console.log(id);
        axios.get("http://localhost:8080/carupdate/"+id).then(response =>{
            setCar(response.data)
            
        }).catch(console.error())
    }, [])

    const postUpdate = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/carupdate/" + id, 
        car
        ).catch(error =>{
            console.log(error)
        })
        navigate("/admin/carmenu");
        
    }

    return(
        <div>
            <form onSubmit={(e)=>{
                
                postUpdate(e);
            }}>
            <p>Название</p>
                <input type="text" name="name"  value={name}  onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Модель</p>
                <input type="text" name="model" value={model} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Брэнд</p>
                <input type="text" name="brand" value={brand} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Год выпуска</p>
                <input type="text" name="release_year" value={release_year} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Техническая информация</p>
                <input type="text" name="technical_info" value={technical_info} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p></p>
                <button type="submit"> Submit </button>

            </form>
        </div>
    )
};

export default CarUpdate;