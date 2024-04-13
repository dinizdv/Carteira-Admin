import React from 'react';
// import { Link } from 'react-router-dom';
import './home.css';
import '../../App.css'
// import usuarios from '../../assets/usuarios.png'
// import horarios from '../../assets/horarios.png'
// import cursos from '../../assets/cursos.png'
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

            </ul>
          </div>
        </aside>
{/* end sidebar */}

      <div className="main">
        <nav className="navbar">
          <button className="btn">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
      </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./js/script.js"></script>
        </div>
    )
}