import { Link } from 'react-router-dom' // for login button
import './login.css'
import '../../App.css'

export default function Login(){
    return (
    <div className="container-login">
        <h1 class="mb-3">Bem vindo(a)!</h1>
        <input type="email" placeholder="Insira seu e-mail..." class="mb-3 px-2"/>
        <input type="email" placeholder="Insira sua senha..." class="mb-3 px-2"/>
        <Link to={"/Home"} class="text-center fs-4">Fazer Login</Link>
    </div> 
    )
}

// login -> (1) username, (2) password, (3) btn