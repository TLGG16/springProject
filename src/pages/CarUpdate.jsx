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
        technical_info:"",
        transmission:"",
        drive:"",
        engine:"",
    })
    const {name,model,brand,release_year,technical_info, transmission, drive, engine} = car;
    
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
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}>
            <form onSubmit={(e)=>{
                
                postUpdate(e);
            }}>
                <div 
                style={{
                    width: "400px",
                    height: "800px",
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
                <p>Модель</p>
                <input class="form-control" type="text" name="model" value={model} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Брэнд</p>
                <input class="form-control" type="text" name="brand" value={brand} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Коробка передач</p>
                <select class="form-control" name="transmission" value={transmission} onChange={(e)=>{
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
                <select class="form-control" name="engine" value={engine} onChange={(e)=>{
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
                <select class="form-control" name="drive" value={drive} onChange={(e)=>{
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
                <p>Год выпуска</p>
                <input class="form-control" type="number" name="release_year" value={release_year} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Техническая информация</p>
                <input class="form-control" type="text" name="technical_info" value={technical_info} onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p></p>
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
                type="submit"> Submit </button>

            </form>
        </div>
    )
};

export default CarUpdate;