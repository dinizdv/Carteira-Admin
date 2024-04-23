import { Link  } from 'react-router-dom'
import './notificacoes.css'

export default function Notificacoes(){
    return(
        <div>
            <h1 class="text-light">Notificações Page</h1>
            <Link to="/home" class="text-center fs-4">Voltar à Home</Link>
        </div>
    )
}