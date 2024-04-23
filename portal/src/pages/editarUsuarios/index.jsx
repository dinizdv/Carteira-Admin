import { Link } from 'react-router-dom' // for login button
import './editarUsuarios.css'


export default function EditUsers(){
    return (
    <div>
        <h1 class="text-light">Editar Usuários Page</h1>
        <Link to={"/Home"} class="text-center fs-4">Voltar à Home</Link>
    </div> 
    )
}