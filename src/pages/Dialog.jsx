import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Dialog = () =>{
    const navigate = useNavigate();
    
    const { id } = useParams();
    const [dialoger,setDialog] = useState({
        user:{
            person:{
                name:""
            }
        },
        advert:{
            user:{
            person:{
                name:""
            }
        }}
    })

    const [data,setData] = useState([
        {
            dialog:{},
            user:{
                person:{
                    name:""
                }
            },
            message:""
        }
    ]);
    
    const [mes,setMes] = useState(
        {
            dialog:{},
            user:{
                person:{
                    name:""
                }
            },
            message:""
        }
    )
    const [kekw,setKekw]= useState()
    
    const {message} = mes;
    
    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        setMes({...mes, user: JSON.parse(localStorage.getItem("user"))})

        

        axios.get("http://localhost:8080/advert/"+id).then( response =>{
            setDialog({advert:response.data, user: JSON.parse(localStorage.getItem("user"))})
            
            axios.post("http://localhost:8080/dialog",
            {
                advert: response.data,
                user: JSON.parse(localStorage.getItem("user"))
            }
             ).then(response2 =>{
                if(response2.data != null){
                setData(response2.data)
                }else{
                    setData(null)
                    axios.post("http://localhost:8080/dialog/create",
                        {
                            advert: response.data,
                            user: JSON.parse(localStorage.getItem("user"))
                        }
                    ).then(()=>{
                        setMes({...mes, dialog:{
                            advert:response.data, user: JSON.parse(localStorage.getItem("user"))
                        }, user: JSON.parse(localStorage.getItem("user")) })
                    })
                }
                // setComment({...data, advert:response.data})
            console.log(response2.data)
            }).catch(console.error())
        }
        )
    }, [kekw])

    const inputChange = (e)=>{
        setMes({...mes, [e.target.name]:e.target.value})
        console.log(mes.user)
        console.log(mes.dialog)
        console.log(dialoger)
        // console.log(e.target.value)
    }

    const postCreate = async (e) => {
        e.preventDefault()
        // console.log(mes)
        await axios.post("http://localhost:8080/dialogmes", 
            {
                dialog:dialoger,
                message: mes.message,
                user:mes.user
            }
            ).then(response => {
                setKekw(mes)
                navigate("/advert/dialog/"+id)
            }).catch(error =>{
                console.log(error)
            })
    }

    return(
<div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column" ,
            justifyContent: "center",}}>
      <h1>{"Диалог с "+dialoger.advert.user.person.name}</h1>
      <div
        style={{
            width: "400px",
            height: "350px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            borderColor: "transparent !important",
            background: "#ffffff",
            boxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.25)",
            borderRadius: "7px",
            border: "0px !important",
            top: "25%",
          }}
      >
        <div style={{ width: "500px", height: "400px", overflowY: "scroll" }}>
        { data.length !=0 &&  (data.map(item => (
            <p>{item.user.person.name}:     {item.message}</p>
            )))
            }
        </div>
        
      </div>
      <div style={{ width: "500px", height: "400px" }}>
      <form onSubmit={(e)=>{
                postCreate(e);
            }}>
                <input class="form-control" type="text" name="message" value={message} onChange={(e)=>{
                    inputChange(e)
            }}></input>
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
    </div>




        // <div>
        // <h1>{"Диалог с "+dialoger.advert.user.person.name}</h1>
        // { data.length !=0 &&  (data.map(item => (
        //     <p>{item.user.person.name}:     {item.message}</p>
        //     )))
        //     }
        // <form onSubmit={(e)=>{
        //         postCreate(e);
        //     }}>
        //         <input class="form-control" type="text" name="message" value={message} onChange={(e)=>{
        //             inputChange(e)
        //     }}></input>
        //         <button type="submit">Отправить</button>
        //     </form>
            

        // </div>
    )

};

export default Dialog;