import { useState } from "react";
// import Input from "../Input";
// import { useForm } from "react-hook-form";
// import { control } from "react-hook-form";
import axios from "axios";

const Login = () => {
    // const {control, handleSubmit} = useForm({
    // });

    const [UserClass, setUser] = useState({
        login: "",
        password: ""
    })
    const {login, password} = UserClass;

    const inputChange = (e) =>{
        setUser({...UserClass,[e.target.name]:e.target.value})
    }


    const postLogin = async (e) => {
        await axios.post("http://localhost:8080/login", 
        UserClass
        ).then(response => {
            localStorage.setItem("user", JSON.stringify( response.data))
            
        }).catch(error =>{
            console.log(error)
        })
    }


    




    // const serverURL = axios.create({
    //     baseURL: "http://localhost:8080/"
    // })

    

    // const postLogin = async (data) => {
    //     console.log(data)
    //     const response = await serverURL.get('/login', {
    //         params:{
    //             data,
    //         },
    //     }).then(response => {
    //         console.log(response.data)
    //     }).catch(error =>{
    //         console.log(error)
    //     })
    // }

    // const onSubmit = (data) => {
    //     postLogin(data)
    // }




    return(
        <div>
            <form onSubmit={(e)=>{
                postLogin(e);
            }}
            >
        <input type={"text"} name='login' value = {login} onChange={(e) => {
                inputChange(e);
            }} ></input>
            <input type={"text"} name='password' value={password} onChange={(e) => {
                inputChange(e);
            }} ></input>
            <button type="submit">KEK</button>
            </form>
        </div>



    )
}

export default Login;