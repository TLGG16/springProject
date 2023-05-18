import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';


const DiscussionChart = () =>{
    const [data,setData] = useState([])
    const [data2,setData2] = useState([
        
    ])
    useEffect(()=>{
        setData2([])
        
        let map = new Map();
        axios.get("http://localhost:8080/discussioncommentmenu").then(response =>{
            setData(response.data)
            console.log(response.data)
            response.data.forEach(d => {
                if (!map.has(d.discussion.theme)) {
                    map.set(d.discussion.theme, 1);
                  } else {
                    map.set(d.discussion.theme, map.get(d.discussion.theme) + 1);
                  }
            });
            setData2([])
            map.forEach((value2, key2) => {
                setData2(prevData => [...prevData, { name: key2, value:value2 }]);
              });
              console.log(map)
            // for(const key in map.keys){
            //     var buf = map.get(key)
            //     setData2([...data2, {name:key , value:buf }])
            // }
            
        }).catch(console.error())
        
        
    }, [])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return(
    <div>
        <h1>Количество комментариев в обсуждениях</h1>
        <PieChart width={800} height={800}>
        <Legend></Legend>
          <Pie data={data2} dataKey="value" cx="50%" cy="50%" innerRadius={100} outerRadius={300} fill="#8884d8" label >
          {
          	data2.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
            </Pie>
        </PieChart>
    </div>)
}

export default DiscussionChart;