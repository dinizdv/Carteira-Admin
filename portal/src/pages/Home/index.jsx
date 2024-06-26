import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './home.css';
import '../../App.css';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Transacao from '../Transacao'
import Plot from 'react-plotly.js';
import axios from 'axios';

export default function Home(){ 
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);


    console.log(Transacao)
    const [openModal, setOpenModal] = useState(false);

    const openIntegrantes = () => {
      setOpenModal(true); // open the modal
    };
  
    const closeIntegrantes = () => {
      setOpenModal(false); // close the modal
    };

function logout (){
    localStorage.clear() // cleaning the token
    window.location.href = '/' // redirect to login page
}

function useToken() {
    const token = localStorage.getItem("keyToken");
    if (token) {
      return JSON.parse(token);
    }
    return null;
}

const token = useToken();

useEffect(() => {
    if (token) {
      console.log("Token encontrado:", token);
      fetchUserDetails(token);
      fetchCourseDetails(token);
    } else {
      console.log("Token não encontrado...");
    }
}, [token]);

// get transacoes + graph
const [transactionsByDay, setTransactionsByDay] = useState({});

const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get(
      "https://apicontroleacesso-1.onrender.com/transacao",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLoading(false)
    const content = response.data.content;
    let transactionsByWeekday = {};

    content.forEach(transaction => {
      const dayOfWeek = transaction.diaSemana.toUpperCase(); // convertendo para maiúsculas para padronizar
      if (transactionsByWeekday[dayOfWeek]) {
        transactionsByWeekday[dayOfWeek]++;
      } else {
        transactionsByWeekday[dayOfWeek] = 1;
      }
    });

    setTransactionsByDay(transactionsByWeekday);

    setUserDetails(content);
  } catch (error) {
    console.log("Erro ao buscar detalhes das transações:", error);
  }
};


  // get courses + graph
  const [coursesCount, setCoursesCount] = useState({});

  const fetchCourseDetails = async (token) => {
    try {
      const response = await axios.get(
        "https://apicontroleacesso-1.onrender.com/curso",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const content = response.data.content;
      let coursesCount = {};
  
      content.forEach(course => {
        course.usuarios.forEach(usuario => {
          const courseName = usuario.curso.nome;
          if (coursesCount[courseName]) {
            coursesCount[courseName]++;
          } else {
            coursesCount[courseName] = 1;
          }
        });
      });
  
      setCoursesCount(coursesCount);
      console.log(coursesCount);
    } catch (error) {
      console.log("Erro ao buscar detalhes do curso:", error);
    }
  };
  


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
                                <Link to={"transacoes"} class="sidebar-link">Transações</Link>
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

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link" onClick={openIntegrantes}>
                          <i class="fa-solid fa-rocket pe-2"></i>
                            Rocket Coding
                        </a>
                    </li>
 {/* modal */}
 <Dialog
  className="modal-open"
  open={openModal} // current state
  onClose={closeIntegrantes}
>
  <DialogTitle className="dialogTitle text-center">
    <h4 id="integrantesTitle">Integrantes da Rocket Coding</h4>
  </DialogTitle>
  <DialogContent className="dialogContent">
        <li className="li-integrantes">Bruno Diniz</li>
        <li className="li-integrantesEmail mb-4">bruno.diniz.sesisenaisp@gmail.com</li>
        <li className="li-integrantes">Luisa Belo</li>
        <li className="li-integrantesEmail mb-4">luisa.belo.sesisenaisp@gmail.com</li>
        <li className="li-integrantes">Lucas Fonseca</li>
        <li className="li-integrantesEmail mb-4">lucas.fonseca.sesisenaisp@gmail.com</li>
        <li className="li-integrantes">Amanda Maldonado</li>
        <li className="li-integrantesEmail mb-4">amanda.maldonado.sesisenaisp3@gmail.com</li>
        <div className="container-btn-modal mt-4">

        <div className="me-auto">
    <li>
        <a href="https://www.instagram.com/rocket_coding/" target="_blank" rel="noopener noreferrer" className="a-rocket-coding">
            <i class="fa-brands fa-instagram ps-1 pe-2 icon-rocket-coding"></i> rocket_coding
        </a>
    </li>
    <li>
        <a href="mailto:rocketcoding2023@gmail.com" target="_blank" rel="noopener noreferrer" className="a-rocket-coding">
            <i class="fa-regular fa-envelope ps-1 pe-2 icon-rocket-coding"></i> rocketcoding2023@gmail.com
        </a>
    </li>
</div>


          <button
            onClick={closeIntegrantes}
            className="btn modal-btn-close ms-2 mb-0"
            type="button"
          >
            Fechar
          </button>
        </div>
  </DialogContent>
</Dialog>
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
                        <div class="col-12 col-md-6 col-xl d-flex">
                            <Link to="editarUsuarios" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                                <h3><i class="fa-solid fa-user"></i> Usuários</h3>
                                                <p class="mb-0">Matrícula, nome e curso</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl d-flex">
                            <Link to="editarCursos" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-book"></i> Cursos</h3>
                                                <p class="mb-0">Nome e duração</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl d-flex">
                            <Link to="horarios" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-qrcode"></i> Horários</h3>
                                                <p class="mb-0">Entradas e saídas</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                            </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl d-flex">
                            <Link to="transacoes" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-qrcode"></i> Transações</h3>
                                                <p class="mb-0">Entradas e saídas</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                            </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div class="col-12 col-md-6 col-xl d-flex">
                            <Link to="notificacoes" class="card flex-fill border-0 illustration card-info bg-primary text-light">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-10">
                                            <div class="p-3 m-1">
                                            <h3><i class="fa-solid fa-bell"></i> Notificações</h3>
                                                <p class="mb-0">Mensagem e destinatário</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                


<div className="container d-flex">
    
            {/* loading animation */}
            {loading && 
                
                <div className="container-loadingData mt-0 me-auto">
                  <p className="loadingData">Carregando os dados...</p>
                  <iframe src="https://lottie.host/embed/d40e20f0-b3d7-4c31-9c25-89a36ac33038/ZryRBBWA7J.json" id="animation"></iframe>
                </div>
                }

<Plot className="d-none d-md-block"

  data={[
    {
      values: Object.values(transactionsByDay), 
      labels: Object.keys(transactionsByDay), 
      type: 'pie',
      marker: {colors: ['#3D9EF4']}, 
    },
  ]}
  layout={{
    font: {
        family: 'Poppins',
        size: 16, 
        color: '#ffffff',
      },
    width: 600,
    height: 400,
    title: 'Quantidade de Transações (ENTRADA E SAÍDA) por dia', 
    paper_bgcolor: 'rgba(0,0,0,0)', 
    plot_bgcolor: 'rgba(0,0,0,0)', 
  }}

/>



<Plot className="ms-5 d-none d-md-block"
  data={[
    {
      values: Object.values(coursesCount),
      labels: Object.keys(coursesCount), 
      type: 'pie',
      marker: {colors: ['#3D9EF4']}, // segmentos do gráfico
    },
  ]}
  layout={{
    font: {
      family: 'Poppins',
      size: 16,
      color: '#ffffff', 
    },
    width: 600,
    height: 400,
    title: 'Quantidade de Usuários por Curso', 
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)', 
  }}
/>
</div>



                </div>
            </main>
                  
        </div>
    </div>
    </div>
    )
}