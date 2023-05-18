import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DiscussionView = () =>{
    const navigate = useNavigate();
    const { id } = useParams();
    const [kekw,setKekw] = useState();


    const [data,setData] = useState([{
        discussion:{
            theme:""
        },
        comment:"",
        user:{
            person:{
                name:""
            }
        }
    }]);
    const [discussioncomment,setComment] = useState({
        comment:"",
        user:JSON.parse(localStorage.getItem("user")),
        discussion:"",
    });
    const {comment, user, discussion} = discussioncomment

    const [discussionObj, setDiscussion] = useState({})

    const inputChange = (e)=>{
        setComment({...discussioncomment, [e.target.name]:e.target.value})
        console.log(discussioncomment.user)
    }
    const postCreate = async (e) => {
        e.preventDefault()
    
        await axios.post("http://localhost:8080/discussioncomment/create", 
            discussioncomment
            ).then(response => {
                setKekw(            discussioncomment                    )
            }).catch(error =>{
                console.log(error)
            })
    }

    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
         axios.get("http://localhost:8080/discussionget/"+id).then(response2 =>{
                    setComment({...discussioncomment, discussion:response2.data})
                })
        
        axios.get("http://localhost:8080/discussion/"+id).then(response =>{
            setData(response.data);
            
        if(!response.data[0]){
                
        }
        }).catch(console.error())
    }, [kekw])

    return(
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column" ,
            justifyContent: "center",}}>
        <h1>{discussioncomment.discussion.theme}</h1>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>

        <div style={{ width: "500px", height: "400px", overflowY: "scroll" }}>

                    <div> 
                    {data.map(item => (
                        <p>{item.user.person.name}:     {item.comment}</p>
                        ))}
                    </div>
            </div>
            </div>




        <form onSubmit={(e)=>{
                postCreate(e);
            }}>
                <input class="form-control" type="text" name="comment" value={comment} onChange={(e)=>{
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
    )

};

export default DiscussionView;