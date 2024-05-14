import { Link } from "react-router-dom"
import './error.css'
import imgError from '../../assets/error404.png'

export default function Error(){
    return(
        <div class="container d-flex justify-content-center align-items-center flex-column">
            <div className="container-top">
            <h1 class="title-notFound">Ops, não encontramos essa página!</h1>
            <Link to={"/home"} className="text-center mb-2 ms-auto text-danger px-0 px-md-2">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger" id="backToHome"></i></Link>
            </div>
            <img src={imgError} alt="Ilustração de página não encontrada." id="imgNotFound" class="mt-3" />
        </div>
    )
}