import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const CarDelete = () =>{
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=>{
        console.log(id);
        axios.delete("http://localhost:8080/cardelete/"+id).then(response =>{
            console.log(response.status);
            navigate("/admin/carmenu");
        }).catch(console.error())
    })

    return(
        <div>
            <p>{id}</p>
        </div>
    )
};

export default CarDelete;