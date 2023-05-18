import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const DialogAnsw = () =>{
    const navigate = useNavigate();
    
    const { id } = useParams();
    const [dialog,setDialog] = useState({
        user:{},
        advert:{}
    })
    const [kekw,setKekw] = useState();


    const [data,setData] = useState([
        {
            dialog:{
                user:{
                person:{
                    name:""
                }
            },},
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
            dialog:{
                user:{
                person:{
                    name:""
                }
            },},
            user:{
                person:{
                    name:""
                }
            },
            message:""
        }
    )
    
    const {message} = mes;
    
    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        axios.get("http://localhost:8080/dialogget/"+id).then( response0 =>{
            setMes({...mes, dialog:response0.data,
            user:JSON.parse(localStorage.getItem("user"))
            })
        


            axios.get("http://localhost:8080/advert/"+response0.data.advert.advert_id).then( response =>{
                setDialog({...dialog,  advert:response.data, user: JSON.parse(localStorage.getItem("user"))})
                
                axios.post("http://localhost:8080/dialog",
                response0.data
                ).then(response2 =>{
                    if(response2.data!=null){
                    setData(response2.data)
                    }else{
                        setData(null)
                    }
                    // setComment({...data, advert:response.data})
                console.log(response2.data)
                }).catch(console.error())
            }
            )
        }
        )
    }, [kekw])

    const inputChange = (e)=>{
        setMes({...mes, [e.target.name]:e.target.value})
        console.log(mes.user)
        console.log(mes.dialog)
        // console.log(e.target.value)
    }

    const postCreate = async (e) => {
        e.preventDefault()
    
        await axios.post("http://localhost:8080/dialogmes", 
            mes
            ).then(response => {
                setKekw(mes)
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
      <h1>Объявление: {dialog.advert.description}</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "500px", height: "400px", overflowY: "scroll" }}>
          {data.length != 0 &&
            data.map((item) => (
              <p>
                {item.user.person.name}: {item.message}
              </p>
            ))}
        </div>
        
      </div>
      <div style={{ width: "500px", height: "400px" }}>
          <form
            onSubmit={(e) => {
              postCreate(e);
            }}
          >
            <input
              class="form-control"
              type="text"
              name="message"
              value={message}
              onChange={(e) => {
                inputChange(e);
              }}
            ></input>
            <button style={{
                background: "#4CAF50",
                color: "white",
                padding: "14px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }} type="submit">
              Отправить
            </button>
          </form>
        </div>
    </div>



        // <div>
        //         <h1>{dialog.advert.description}</h1>
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

export default DialogAnsw;