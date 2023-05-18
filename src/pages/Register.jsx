import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()

    const [UserClass, setUser] = useState({
        login : "",
        password :""
    })
    const {login, password} = UserClass

    const [password2, setPassword2] = useState("")
    
    const inputChange = (e) =>{
        setUser({...UserClass,[e.target.name]:e.target.value})
    }

    const postRegister = async (e) => {
        e.preventDefault()
        if(password!=password2){
            alert("Неверный пароль")
        }else{
            await axios.post("http://localhost:8080/register", 
            UserClass
            ).then(response => {
                navigate("/login")
            }).catch(error =>{
                console.log(error)
            })
    }
    }

    return(
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}>
            <form onSubmit={(e)=>{
                postRegister(e);
            }}>
                <div
          style={{
            width: "400px",
            height: "300px",
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
                <p>Логин</p>
                <input className="form-control" type="text" name="login" value={login} onChange={(e) => {
                inputChange(e);
            }}></input>
                <p>Пароль</p>
                <input class="form-control" type="password" name="password" value={password} onChange={(e) => {
                inputChange(e);
            }}></input>
                <p>Повторите пароль</p>
                <input class="form-control" type="password" name="password2" onChange={(e) =>{
                    setPassword2(e.target.value)
                }} ></input>
                <button
                style={{
                    background: "#4CAF50",
                    color: "white",
                    padding: "14px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                type="submit">Зарегистрироваться</button>
                </div>
            </form>
        </div>

        // так работает стейт  ты задаешь значение только через
        //Есть ещё юз эфект
    )
}

export default Register;