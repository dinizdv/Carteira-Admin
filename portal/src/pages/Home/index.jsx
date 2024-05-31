import React from 'react';
import { Link } from 'react-router-dom'
import './home.css';
import '../../App.css';


export default function Home(){ 
 
function logout (){
    localStorage.clear() // cleaning the token
    window.location.href = '/' // redirect to login page
}

return(
  
  <div>

<div class="wrapper">
        <aside id="sidebar" class="js-sidebar">
            {/* <!-- Content For Sidebar --> */}
            <div class="h-100">
                <div class="sidebar-logo">
                    <a href="#" id="logo" class="text-uppercase text-danger">senai-sp</a>
                </div>
                <ul class="sidebar-nav">
                    <li class="sidebar-header">
                        Recursos do admnistrador
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link">
                            <i class="fa-solid fa-list pe-2"></i>
                            Home
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-solid fa-file-lines pe-2"></i>
                            Páginas
                        </a>
                        <ul id="pages" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <Link to={"editarUsuarios"} class="sidebar-link">Usuários</Link>
                            </li>
                            <li class="sidebar-item">
                                <Link to={"editarCursos"} class="sidebar-link">Cursos</Link>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Undefined</a>
                            </li>
                            <li class="sidebar-item">
                                <Link to={"notificacoes"} class="sidebar-link">Notificações</Link>
                            </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-regular fa-user pe-2"></i>
                            Autenticação
                        </a>

                        <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link" onClick={logout}>Sair da conta</a>
                            </li>
                        </ul>
                    </li>
                    <hr className="mb-0"/>
                    <li class="sidebar-header">
                        SENAI - Guarulhos
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#multi" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-solid fa-share-nodes pe-2"></i>
                            Links
                        </a>
                        <ul id="multi" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link collapsed" data-bs-target="#level-1"
                                    data-bs-toggle="collapse" aria-expanded="false">Hermenegildo C. de Almeida</a>
                                <ul id="level-1" class="sidebar-dropdown list-unstyled collapse">
                                    <li class="sidebar-item">
                                        <a href="https://sp.senai.br/cursos?unidade=122" className="sidebar-link" target='blank'>Cursos</a>
                                    </li>
                                    <li class="sidebar-item">
                                        <a href="https://sp.senai.br/unidade/guarulhos/horario-de-atendimento" className="sidebar-link" target='blank'>Atendimento</a>
                                    </li>
                                    <li class="sidebar-item">
                                        <a href="https://www.instagram.com/senaihermenegildoguarulhos/" className="sidebar-link" target='blank'>Instagram</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
        <div class="main">
            <nav class="navbar navbar-expand">
              {/* button -> responsive sidebar */}
              <button className="btn py-1 px-2 mt-3" id="sidebar-toggle" type="button" onClick={() => document.getElementById('sidebar').classList.toggle('collapsed')}>
                  <span className="navbar-toggler-icon"></span>
              </button>

            </nav>
            <main class="content px-3 py-2">
                <div class="container-fluid">
                    <div class="mb-3">
                        <h4 class="text-light">Dashboard do Administrador</h4>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-3 d-flex">
                            <Link to="editarUsuarios" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                                <h3><i class="fa-solid fa-user"></i> Usuários</h3>
                                                <p class="mb-0">Editar, adicionar, excluir</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl-3 d-flex">
                            <Link to="editarCursos" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-book"></i> Cursos</h3>
                                                <p class="mb-0">Nome, horário</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl-3 d-flex">
                            <Link to="editarUsuarios" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-x"></i> Undefined</h3>
                                                <p class="mb-0">Undefined</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                            </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl-3 d-flex">
                            <Link to="notificacoes" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-bell"></i> Notificações</h3>
                                                <p class="mb-0">Notificações gerais, notificações individuais</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    

                    {/* <div class="card border-0">
                        <div class="card-header">
                            <h5 class="card-title">
                                Basic Table
                            </h5>
                            <h6 class="card-subtitle text-muted">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ducimus,
                                necessitatibus reprehenderit itaque!
                            </h6>
                        </div>

                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </main>
                  
            <footer class="footer">
                <div class="container-fluid">
                    <div class="row text-muted">
                        <div class="col-6 text-start">
                            <p class="mb-0">
                                <a href="#" class="text-muted">
                                    <strong class="px-2">CodzSwod</strong>
                                </a>
                            </p>
                        </div>
                        <div class="col-6 text-end">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <a href="#" class="text-muted px-2">Contact</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#" class="text-muted px-2">About Us</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#" class="text-muted px-2">Terms</a>
                                </li>
                                <li class="list-inline-item px-2">
                                    <a href="#" class="text-muted px-2">Booking</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    </div>
    )
}