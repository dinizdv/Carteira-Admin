import { useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom';
import './home.css';
import '../../App.css';


export default function Home(){ 
 
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
                        Admin Elements
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link">
                            <i class="fa-solid fa-list pe-2"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-solid fa-file-lines pe-2"></i>
                            Pages
                        </a>
                        <ul id="pages" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Page 1</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Page 2</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-solid fa-sliders pe-2"></i>
                            Posts
                        </a>
                        <ul id="posts" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Post 1</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Post 2</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Post 3</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-regular fa-user pe-2"></i>
                            Auth
                        </a>
                        <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Login</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Register</a>
                            </li>
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link">Forgot Password</a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-header">
                        Multi Level Menu
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed" data-bs-target="#multi" data-bs-toggle="collapse"
                            aria-expanded="false"><i class="fa-solid fa-share-nodes pe-2"></i>
                            Multi Dropdown
                        </a>
                        <ul id="multi" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="#" class="sidebar-link collapsed" data-bs-target="#level-1"
                                    data-bs-toggle="collapse" aria-expanded="false">Level 1</a>
                                <ul id="level-1" class="sidebar-dropdown list-unstyled collapse">
                                    <li class="sidebar-item">
                                        <a href="#" class="sidebar-link">Level 1.1</a>
                                    </li>
                                    <li class="sidebar-item">
                                        <a href="#" class="sidebar-link">Level 1.2</a>
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

                {/* <div class="navbar-collapse navbar">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a href="#" data-bs-toggle="dropdown" class="nav-icon pe-md-0">
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a href="#" class="dropdown-item">Profile</a>
                                <a href="#" class="dropdown-item">Setting</a>
                                <a href="#" class="dropdown-item">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div> */}
            </nav>
            <main class="content px-3 py-2">
                <div class="container-fluid">
                    <div class="mb-3">
                        <h4 class="text-light">Admin Dashboard</h4>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-xl-3 d-flex">
                            <Link to="editarUsuarios" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-9">
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
                                        <div class="col-9">
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
                                        <div class="col-9">
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
                                        <div class="col-9">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-bell"></i> Notificações</h3>
                                                <p class="mb-0">Notificações gerais, notificações individuais</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                            {/* <img src="image/customer-support.jpg" class="img-fluid illustration-img" */}
                                                {/* alt=""> */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>


                    </div>
                    {/* <!-- Table Element --> */}
                    <div class="card border-0">
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
                    </div>
                </div>
            </main>
            {/* dark mode */}
            {/* <a href="#" class="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? (
                <i class="fa-regular fa-moon"></i>
                ) : (
                <i class="fa-regular fa-sun"></i> )}
            </a> */}
                  

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