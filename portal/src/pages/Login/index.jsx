import { Link } from 'react-router-dom' // for login button
import './login.css'


export default function Login(){
    return (
    <div className="container-login">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle d-flex mx-auto mb-1 text-light" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
        <h1 class="mb-1 text-center">Bem-vindo(a)!</h1>
        <p class="mb-3 text-center">Realize seu login para acessar a plataforma</p>
        <input type="email" placeholder="Insira seu e-mail..." class="mb-3 px-2"/>
        <input type="email" placeholder="Insira sua senha..." class="mb-3 px-2"/>
        {/* <img src={logoSenai}/> */}
        <Link to={"/Home"} class="text-center fs-5" id="btn">Fazer Login</Link>
    </div> 
    )
}

// login -> (1) username, (2) password, (3) btn