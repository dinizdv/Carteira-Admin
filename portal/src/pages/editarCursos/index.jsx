import { Link } from 'react-router-dom'
import './editarCursos.css'

export default function editUsers (){
    return(
        <div>
            <h1 class="text-light">Editar Cursos Page</h1>
            <Link to="/home" class="text-center fs-4">Voltar à Home</Link>
        </div>
    )
}