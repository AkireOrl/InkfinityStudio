import "./InputLogin.css"

export const InputLogin = ({type, name, handler, placeholder}) => {


    return(
        <input type={type} name={name} onChange={(e) => handler(e)}  placeholder={placeholder}></input>
    )
}