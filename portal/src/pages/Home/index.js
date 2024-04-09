import { Link } from 'react-router-dom'
import './home.css'

export default function Home(){
    return(
        <div class="container px-0 d-flex justify-content-center align-items-center align-items-center gap-4">
            <div class="col bg-primary card">
                <img src="https://static.vecteezy.com/system/resources/previews/009/699/174/original/register-line-green-and-black-icon-vector.jpg" class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title">cursos</h5>
                    <p class="card-text">Página dedicada aos cursos existentes do SENAI-SP.</p>
                    <a href="#" class="btn btn-danger">Acessar cursos</a>
                </div>
            </div>

            <div class="col bg-primary card">
                <img src="https://static.vecteezy.com/system/resources/previews/009/699/174/original/register-line-green-and-black-icon-vector.jpg" class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title">horários</h5>
                    <p class="card-text">Página dedicada aos horários dos cursos do SENAI-SP.</p>
                    <a href="#" class="btn btn-danger">Acessar horários</a>
                </div>
            </div>

            <div class="col bg-primary card">
                <img src="https://static.vecteezy.com/system/resources/previews/009/699/174/original/register-line-green-and-black-icon-vector.jpg" class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title">usuários</h5>
                    <p class="card-text">Página dedicada aos usuários existentes no banco de dados.</p>
                    <a href="#" class="btn btn-danger">Acessar usuários</a>
                </div>
            </div>

            <div class="col bg-primary card">
                <img src="https://static.vecteezy.com/system/resources/previews/009/699/174/original/register-line-green-and-black-icon-vector.jpg" class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title">notificações</h5>
                    <p class="card-text">Página dedicada ao envio de notificações aos alunos.</p>
                    <a href="#" class="btn btn-danger">Enviar notificações</a>
                </div>
            </div>

        </div>
    )
}