import { render } from "@testing-library/react"
import { Controller } from "react-hook-form"




const Input = ({name,control,value}) =>{

    return (
        <Controller 
            control = {control}
            name = {name}
            value = {value}
            render = {({
            field:{onChange, name,value}
                
            }) => (<div>
                 <input name={name} value={value} onChange={onChange}>
                 </input>
                   </div>)}
        >
        </Controller>

    )


}
export default Input;