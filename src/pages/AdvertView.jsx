import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const AdvertView = () =>{
    const navigate = useNavigate();
    
    const { id } = useParams();

    const [data,setData] = useState({
        car:{
            name:"",
            model:"",
            release_year:"",
            brand:"",
        },
        user:{
            person:{
                name:"",
                phone:"",
                email:"",
                surname:"",
            }
        },
        price:"",
        city:"",
        photo_url:"",
    });
    const [comment,setComment] = useState({
        message:"",
        user:{},
        advert:{},
    });
    
    const {message} = comment;
    
    useEffect(()=>{
        if(localStorage.getItem("user") ===null){
            navigate("/login");
        }
        
        axios.get("http://localhost:8080/advert/"+id).then(response =>{
            setData(response.data);
            // setComment({...data, advert:response.data})
            setComment({...data, user:JSON.parse( localStorage.getItem("user")), advert:  response.data})
            console.log(response.data)
        }).catch(console.error())
    }, [])

    

        //Миша все хуйня давай по новой
        //Сущность Dialog и Doalog_Mes нужны
        //Dialog свой айди, айди объявления и айди юзера
        //Dialog_Mes свой айди, сообщение и айди пользователя(чтобы 
        //понять кто написал продавец чи юзер)
        
        //че делать с диалогами?
        //Вариант 1 запрашивать объект при его отсутствии создавать с первым сообщением
        //а при его наличии все норм
        //Вариант 2 создавать его сразу без 1 сообщения

    return(


        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
    >
      <h1>Информация про про объявление</h1>
      <div
        style={{
          width: "400px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          borderColor: "transparent !important",
          background: "#ffffff",
          boxShadow: "0px 4px 10px -3px rgba(0, 0, 0, 0.25)",
          borderRadius: "7px",
          border: "0px !important",
          position: "absolute",
          top: "25%",
        }}
      >
        <Stack className="specs" gap={0} style={{ width: "400px" }}>
          <Container className="specsGrid">
            <Row>
              <Col className="specsLine">Марка</Col>
              <Col>{data.car.brand}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Модель</Col>
              <Col>{data.car.model}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Год выпуска</Col>
              <Col>{data.car.release_year}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Цена</Col>
              <Col>{data.price}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Город продавца</Col>
              <Col>{data.city}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Имя продавца</Col>
              <Col>{data.user.person.name}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Фамилия продавца</Col>
              <Col>{data.user.person.surname}</Col>
            </Row>
            <Row>
              <Col className="specsLine">Контактный телефон</Col>
              <Col>{data.user.person.phone}</Col>
            </Row>
            
          </Container>
        </Stack>
        <div style={{ marginBottom: "30px" }}>
        
              <p className="specsLine" >Фото</p>
              <img src={data.photo_url} height={400} width={400}></img>
          
        </div>
        <Link to={`/advert/dialog/${data.advert_id}`}>
            <button>Написать</button>
          </Link>
      </div>
      
    </div>



        // <div>
        //     <div>
                
            
        //     <h1>Информация про про объявление</h1>
        //     <p>{"Марка: " +  data.car.brand }</p>
        //     <p>{"Модель: " +  data.car.model }</p>
        //     <p>{"Год выпуска: " +  data.car.release_year }</p>
        //     <p>{"Цена: " +  data.price }</p>
        //     <p>{"Город продавца: " +  data.city }</p>
        //     <p>{"Имя продавца: " +  data.user.person.name }</p>
        //     <p>{"Фамилия продавца: " +  data.user.person.surname }</p>
        //     <p>{"Контактный телефон: " +  data.user.person.phone }</p>

        //     </div>

        //     <div>
        //     <Link to={`/advert/dialog/${data.advert_id}`}>
        //         <button>Написать</button>
        //         </Link>
        //     </div>

        // </div>
    )

};

export default AdvertView;