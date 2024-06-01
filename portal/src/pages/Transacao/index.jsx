import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../editarUsuarios/editarUsuarios.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Transacao() {
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);


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
        } else {
          console.log("Token não encontrado...");
        }
    }, [token]);

    // get transacoes
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

          console.log(response.data.content) // diaSemana, hora, id, tipoTransacao, id,usuario{id, curso{id:, nome, }, dataNascimento, email, matricula, nivel}
          if (!Array.isArray(response.data.content)) {
            console.error("A resposta da API não contém um array");
            return;
          }

          setUserDetails(response.data.content);
          setLoading(false)
        } catch (error) {
          console.log("Erro ao buscar detalhes do usuário:", error);
        }
    };
    

    return (
        <div>
            <div className="container container-editUsers py-5">
                <Link to={"/Home"} className="text-center fs-4 mb-2 ms-auto text-danger px-2" id="back">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger"></i></Link>

                {/* table - transacoes */}
                <div className="card card-table border-0 mt-4">
                    <div className="card-header">
                        <h5 className="card-title text-center m-0 fs-3 text-primary">
                            Transações
                        </h5>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="col">Aluno(a)</th>
                                    <th scope="col" className="col">Curso</th>
                                    <th scope="col" className="col">Tipo de transação</th>
                                    <th scope="col" className="col">Horário</th>
                                    <th scope="col" className="col">Dia da Semana</th>
                                </tr>
                            </thead>
                            
            {/* loading animation */}
            {loading && 
                
                <div className="container-fluid container-loadingData mt-0">
                  <p className="loadingData">Carregando os dados...</p>
                  <iframe src="https://lottie.host/embed/d40e20f0-b3d7-4c31-9c25-89a36ac33038/ZryRBBWA7J.json"></iframe>
                </div>
                }
                

                            <tbody>
                                {userDetails.map((transacao) => (
                                <tr key={transacao.id} className="tr-users">
                                    <td className="details">{transacao.usuario.nome}</td> {/* user name */}
                                    <td className="details">{transacao.usuario.curso ? transacao.usuario.curso.nome : ""}</td> {/* course name */}
                                    <td className="details">{transacao.tipoTransacao}</td>
                                    <td className="details">{transacao.hora}</td>
                                    <td className="details">{transacao.diaSemana}</td>
                                </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
