import { useState } from "react";
// import Input from "../Input";
// import { useForm } from "react-hook-form";
// import { control } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const {control, handleSubmit} = useForm({
    // });
    const navigate = useNavigate()

    const [UserClass, setUser] = useState({
        login: "",
        password: ""
    })
    const {login, password} = UserClass;

    const inputChange = (e) =>{
        setUser({...UserClass,[e.target.name]:e.target.value})
    }


    const postLogin = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/login", 
        UserClass
        ).then(response => {
            if(localStorage.getItem("user") !=null){
                localStorage.removeItem("user")
            }
            // localStorage.setItem("user", JSON.stringify( response.data))
            localStorage.setItem("user", JSON.stringify({
                "user_id": response.data.user_id,
                "role" : response.data.role,
                "person" : response.data.person,
            } 
            ))
            navigate("/home")
              
            
        }).catch(error =>{
            console.log(error)
        })
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
                postLogin(e);
            }}
            >
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
        <label for ="login" class="form-label">Логин</label>
        <input class="form-control" type={"text"} name='login' value = {login} onChange={(e) => {
                inputChange(e);
            }} ></input>
            <label for ="password" class="form-label">Пароль</label>
            <input class="form-control" type={"text"} name='password' value={password} onChange={(e) => {
                inputChange(e);
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
             type="submit">Подтвердить</button>
            </div>
            </form>
        </div>



    )
}

export default Login;