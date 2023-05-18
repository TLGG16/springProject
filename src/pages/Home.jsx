import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';


const Home = () =>{
    const navigate = useNavigate();
    const [person,setPerson] = useState({
        name:""
    })
    const [editable,setEditable] = useState(false)

    const {name,surname,email,phone} = person

    const inputChange = (e)=>{
        setPerson({...person, [e.target.name]:e.target.value})
    }
    const handleEdit = (value)=>{
        setEditable(value)
    }

    const postCreate = async (e) => {
        e.preventDefault()
        
        var user = JSON.parse(localStorage.getItem("user"))
        // setPerson({...person, person_id:user.person.person_id})
        user.person = person;
        user = {...user, login:"" ,password:""}
        await axios.post("http://localhost:8080/user/updateperson", 
            user
            ).then(response => {    
                localStorage.setItem("user", JSON.stringify( user))
                handleEdit(false)
                navigate("/home")
            }).catch(error =>{
                console.log(error)
            })
    }
    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            alert("Вы не зарегистрированны")
            navigate("/login");
        }
        if(JSON.parse( localStorage.getItem("user")).person !=null){
            setPerson( JSON.parse(localStorage.getItem("user")).person);
        }
        
    }, [])


  

    return(
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <form action="" onSubmit={(e) => postCreate(e)}>
        <div
          style={{
            width: "600px",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            borderColor: "transparent !important",
            background: "#ffffff",
            boxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.25)",
            borderRadius: "7px",
            border: "0px !important",
          }}
        >
          <label htmlFor="name" className="form-label">
            Имя
          </label>
          <input
            class="form-control"
            type="text"
            name="name"
            value={name}
            readOnly={!editable}
            onChange={(e) => inputChange(e)}
          />
          <label htmlFor="surname" className="form-label">
            Фамилия
          </label>
          <input
            class="form-control"
            type="text"
            name="surname"
            value={surname}
            readOnly={!editable}
            onChange={(e) => inputChange(e)}
          />
          <label htmlFor="email" className="form-label">
            Почта
          </label>
          <input
            class="form-control"
            type="email"
            name="email"
            value={email}
            readOnly={!editable}
            onChange={(e) => inputChange(e)}
          />
          <label htmlFor="phone" className="form-label">
            Телефон
          </label>
          <input
            class="form-control"
            type="text"
            name="phone"
            value={phone}
            readOnly={!editable}
            onChange={(e) => inputChange(e)}
          />
          {!editable && (
            <button
              type="button"
              style={{
                background: "#4CAF50",
                color: "white",
                padding: "14px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(true)}
            >
              Изменить информацию
            </button>
          )}
          {editable && (
            <button
              type="submit"
              style={{
                background: "#4CAF50",
                color: "white",
                padding: "14px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Сохранить
            </button>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Link to="/home/favourite">
              <button
                style={{
                  background: "#008CBA",
                  color: "white",
                  padding: "14px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Избранное
              </button>
            </Link>
            <Link to="/home/dialogmenu">
              <button
                style={{
                  background: "#008CBA",
                  color: "white",
                  padding: "14px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Сообщения
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>















//         <div style={{display: "flex", justifyContent: "space-between"}}>
//   <form action="" onSubmit={(e) => postCreate(e)}>
//     <div style={{width: "600px", height: "500px", display:"flex", flexDirection: "column", justifyContent: "space-evenly"}}>
//       <label htmlFor="name" className='form-label'>Имя</label>
//       <input class="form-control" type='text' name='name' value={name} readOnly={!editable}
//         onChange={(e) => inputChange(e)}
//       />
//       <label htmlFor="surname" className='form-label'>Фамилия</label>
//       <input class="form-control" type='text' name='surname' value={surname} readOnly={!editable}
//         onChange={(e) => inputChange(e)}
//       />
//       <label htmlFor="email" className='form-label'>Почта</label>
//       <input class="form-control" type='email' name='email' value={email} readOnly={!editable}
//         onChange={(e) => inputChange(e)}
//       />
//       <label htmlFor="phone" className='form-label'>Телефон</label>
//       <input class="form-control" type='text' name='phone' value={phone} readOnly={!editable}
//         onChange={(e) => inputChange(e)}
//       />
//       {!editable && (
//         <button type='button' style={{background: "#4CAF50", color: "white", padding: "14px 20px", border: "none", borderRadius: "4px", cursor: "pointer"}} onClick={() => handleEdit(true)}>Изменить информацию</button>
//       )}
//       {editable && (
//         <button type='submit' style={{background: "#4CAF50", color: "white", padding: "14px 20px", border: "none", borderRadius: "4px", cursor: "pointer"}}>Сохранить</button>
//       )}
//     </div>
//     <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
//     <Link to="/home/favourite">
//       <button style={{background: "#008CBA", color: "white", padding: "14px 20px", border: "none", borderRadius: "4px", cursor: "pointer"}}>Избранное</button>
//     </Link>
//     <Link to="/home/dialogmenu">
//       <button style={{background: "#008CBA", color: "white", padding: "14px 20px", border: "none", borderRadius: "4px", cursor: "pointer"}}>Сообщения</button>
//     </Link>
//   </div>
//   </form>


// </div>

    )
}

export default Home;