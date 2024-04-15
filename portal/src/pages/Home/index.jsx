import React from 'react';
// import { Link } from 'react-router-dom';
import './home.css';
import '../../App.css';
import usuarios from '../../assets/usuarios.png'
// import horarios from '../../assets/horarios.png'
import cursos from '../../assets/cursos.png'
// import notificacoes from '../../assets/notificacoes.png'
// import senaiLogo from '../../assets/senai-logo.png'
// import BarChart from './home'; 

export default function Home(){ 

return(
  <div>
    
      <div className="wrapper">
        <aside id="sidebar">
          {/* sidebar content */}
          <div className="h-100">
            <div className="sidebar-logo">
              <a href="#">SENAI-SP</a>
            </div>
            <ul className="sidebar-nav">
              <li className="sidebar-header">
                Admin elements
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                <i class="fa-solid fa-list pe-2"></i>
                  Dashboard
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse" aria-expanded="false">
                <i class="fa-regular fa-file-lines pe-2"></i>
                  Pages
                </a>
                <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Page 1</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Page 2</a>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="#" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse" aria-expanded="false">
                <i class="fa-regular fa-file-lines pe-2"></i>
                  Posts
                </a>
                <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Post 1</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Post 2</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">Post 3</a>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </aside>
{/* end sidebar */}

{/* dropdown menu */}
      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button className="btn" id="sidebar-toggle" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse navbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a href="#" className="nav-icon pe-md-0" data-bs-toggle="dropdown">
                <i className="fa-solid fa-user avatar text-center"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" class="dropdown-item">Profile</a>
                  <a href="#" class="dropdown-item">Settings</a>
                  <a href="#" class="dropdown-item">Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <a href="#" class="theme-toggle">
          <i className="fa-regular fa-moon"></i>
          <i className="fa-regular fa-sun"></i>
        </a>
        {/* <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="mb-3">
              Admin Dashboard
            </div>
            <div className="row">
              <div className="col-12 col-md-6 d-flex">
                <div className="card flex-fill border-0 illustration">
                  <div className="card-body p-0 d-flex flex-fill">
                    <div className="row g-0 w-100">
                      <div className="col-6">
                        <div className="p-3 m-1">
                          <h4>Welcome Back, Admin</h4>
                          <p className="mb-0">Admin Dashboard, SENAI-SP</p>
                        </div>
                      </div>
                      <div className="col-6 align-self-end text-end">
                        <img src={usuarios} alt="usuários" id="img-users" class="img-fluid illustration-img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main> */}

      </div>
      </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </div>
    )
}