import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const CarCreate = () =>{
    const navigate = useNavigate("")

    const [Car, setCar] = useState({
        name:"",
        model:"",
        brand:"",
        release_year:"",
        technical_info:"",
        transmission:"",
        drive:"",
        engine:"",
        photo_url:"",
        
    })
    const {name,model,brand,release_year,technical_info, transmission, drive, engine, photo_url} = Car;
    
    const inputChange = (e)=>{
        setCar({...Car, [e.target.name]:e.target.value})
        console.log(photo_url)
    }
    const postCreate = async (e) => {
        e.preventDefault()
        if(Car.drive=="" || Car.engine=="" || Car.transmission=="")
        {
            alert("Сделайте выбор")
            return
        }

        await axios.post("http://localhost:8080/carcreate", 
        Car
        ).then(response => {
            navigate("/admin/carmenu")
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
                {/* <p>Название</p>
                <input type="text" name="name" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input> */}
                <p>Модель</p>
                <input class="form-control" type="text" name="model" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Брэнд</p>
                <input class="form-control" type="text" name="brand" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Год выпуска</p>
                <input class="form-control" type="number" name="release_year" onChange={(e)=>{
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

                <p>Техническая информация</p>
                <input class="form-control" type="text" name="technical_info" onChange={(e)=>{
                    inputChange(e);
                }}
                ></input>
                <p>Ссылка на фото</p>
                <input class="form-control" type="text" name="photo_url" value={photo_url}  onChange={(e)=>{
                        inputChange(e)
}}
                ></input>

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

export default CarCreate;