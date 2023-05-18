import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const DiscussionCreate = () =>{
    const navigate = useNavigate()
    
    const [options, setOptions] = useState([])
    const [discussion, setDiscussion] = useState({
        car : {},
        theme : "",
    })
    const [carOption, setCarOption] = useState(null);
    
    var {theme} = discussion
    
    const inputChange = (e)=>{
        setDiscussion({...discussion, [e.target.name]:e.target.value})
        // console.log(e.target.value)
        // console.log(discussion.car)
    }

    const handleSelectChange = (e)=>{
        const v = e.target.value;
        setCarOption(v)
        setDiscussion({...discussion, car:JSON.parse(v)})

        
    }
    const [kekw,setKekw] = useState()

    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            alert("Вы не зарегистрированны")
            navigate("/login");
        }
        axios.get("http://localhost:8080/carmenu").then(response =>{
            console.log(response.status);
            setOptions(response.data)
            setDiscussion({...discussion, car: ""  })
        }).catch(console.error())
        
        
    }, [kekw])

    

    const postCreate = async (e) => {
        e.preventDefault()
        if(discussion.car ===""){
            alert("Сделайте выбор")
            console.log("Ошибка")
            return
            // setDiscussion({...discussion, theme:null})
        }
        // // car_id = foundOption
        // setAdvert({...advert, car: foundOption})
        // console.log(foundOption)
        // console.log(advert.car)
        await axios.post("http://localhost:8080/discussion/create", 
            discussion
            ).then(response => {
                setKekw(discussion)
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
                    height: "200px",
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
            <label for ="theme" class="form-label">Введите тему обсуждения</label>
            <input class="form-control" type='text' name='theme' value={theme} onChange={(e)=>{
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
            <label class="form-label">Выберите машину для обсуждения</label>
            <select class="form-control" value={carOption} onChange={(e)=>{
                    handleSelectChange(e)
                    // console.log(discussion.car)
            }}
            >
            <option value= {JSON.stringify("")} >Выберите опцию</option>
            {options.map((option) => (
            <option key={option.id } value={JSON.stringify( option)}>
            {option.name}
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

export default DiscussionCreate;