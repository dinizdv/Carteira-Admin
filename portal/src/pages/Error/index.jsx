import { Link } from "react-router-dom"
import './error.css'
import imgError from '../../assets/error404.png'

export default function Error(){
    return(
        <div className="container-fluid bg-dark">
        <div class="container d-flex justify-content-center align-items-center flex-column">
            {/* <div className="container-top">
            <h1 class="title-notFound">Ops, não encontramos essa página!</h1>
            <Link to={"/home"} className="text-center mb-2 ms-auto text-danger" id="link-backToHome">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger fs-5" id="backToHome"></i></Link>
            </div>
            <img src={imgError} alt="Ilustração de página não encontrada." id="imgNotFound" class="mt-3" /> */}
            <h1 id="title-404" class="mt-0">404</h1>
            <h3 id="ops" class="mt-3">Ops, página não encontrada!</h3>
            <p id="p-backToHome">Algum problema ocorreu e não conseguimos acessar esta página! Retorne à home para acessar a plataforma e seus recursos.</p>
            <Link to={"/home"} className="text-center mt-3" id="link-backToHome">Voltar à Home<i className="fa-solid fa-house ps-2 fs-5" id="backToHome"></i></Link>
        
        </div>
        </div>
    )
}