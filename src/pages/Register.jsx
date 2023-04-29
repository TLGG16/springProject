import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {

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
        if(password!=password2){
            alert(password2)
        }else{
            await axios.post("http://localhost:8080/register", 
            UserClass
            ).then(response => {
                
            }).catch(error =>{
                console.log(error)
            })
    }
    }

    return(
        <div>
            <form onSubmit={(e)=>{
                postRegister(e);
            }}>
                <p>Логин</p>
                <input type="text" name="login" value={login} onChange={(e) => {
                inputChange(e);
            }}></input>
                <p>Пароль</p>
                <input type="password" name="password" value={password} onChange={(e) => {
                inputChange(e);
            }}></input>
                <p>Повторите пароль</p>
                <input type="password" name="password2" onChange={(e) =>{
                    setPassword2(e.target.value)
                }} ></input>
                <br></br>
                <br></br>
                <button type="submit">KEK</button>
            </form>
        </div>

        // так работает стейт  ты задаешь значение только через
        //Есть ещё юз эфект
    )
}

export default Register;