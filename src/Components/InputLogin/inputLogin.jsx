import "./InputLogin.css"

export const InputLogin = ({type, name, handler}) => {


    return(
        <input type={type} name={name} onChange={(e) => handler(e)}></input>
    )
}