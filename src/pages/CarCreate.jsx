import { useState } from "react";
import axios from "axios";




const CarCreate = () =>{

    const [Car, setCar] = useState({
        name:"",
        model:"",
        brand:"",
        release_year:"",
        technical_info:""
    
    })
    const {name,model,brand,release_year,technical_info} = Car;
    
    const inputChange = (e)=>{
        setCar({...Car, [e.target.name]:e.target.value})
    }
    const postCreate = async (e) => {
        await axios.post("http://localhost:8080/carcreate", 
        Car
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
                <p>Название</p>
                <input type="text" name="name" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Модель</p>
                <input type="text" name="model" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Брэнд</p>
                <input type="text" name="brand" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Год выпуска</p>
                <input type="text" name="release_year" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Техническая информация</p>
                <input type="text" name="technical_info" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p></p>
                <button type="submit"> Submit </button>
            </form>
        </div>
    )

};

export default CarCreate;