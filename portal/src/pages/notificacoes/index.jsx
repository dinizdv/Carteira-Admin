import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './notificacoes.css';
import '../editarUsuarios/editarUsuarios.css';
import './lenght.js';
import axios from 'axios';

export default function Notifications() {
    const [textareaValue, setTextareaValue] = useState('');
    const [userDetails, setUserDetails] = useState([]); // Estado para armazenar os detalhes dos usuários

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

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

    const fetchUserDetails = async (token) => {
        try {
          const response = await axios.get(
            "https://apicontroleacesso-1.onrender.com/usuario",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!Array.isArray(response.data.content)) {
            console.error("A resposta da API não contém um array");
            return;
          }

          console.log(userDetails)
          setUserDetails(response.data.content);
        } catch (error) {
          console.log("Erro ao buscar detalhes do usuário:", error);
        }
    };

    
    return (
        <div>
            <div className="container container-editUsers py-5">
                <Link to={"/Home"} className="text-center fs-4 mb-2 ms-auto text-danger px-2" id="back">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger"></i></Link>

                <section className="container-textarea">
                    <textarea placeholder="Digite sua notificação aqui (estrutura: título : texto)" maxLength={300} value={textareaValue} onChange={handleTextareaChange}></textarea>

                    <div className="container-btn-not d-flex justify-content-end my-1">
                        <select name="usuarios" id="usuarios" className="rounded">
                        <option selected disabled>Aluno destinário</option>
                        {userDetails.map((user) => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="container-btn-not d-flex justify-content-end mt-3">
                        <button id="btn-notification">Enviar notificação</button>
                    </div>
                </section>
                {/* table users */}
                <div className="card card-table border-0 mt-4">
                    <div className="card-header">
                        <h5 className="card-title text-center m-0 fs-3 text-primary">
                            Notificações enviadas
                        </h5>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                {/* <tr>
                                    <th scope="col" className="col-12">Texto da notificação</th>
                                </tr> */}
                            </thead>
                            <tbody>
                                <tr className="tr-users">
                                    <td className="details"></td> {/* display notification */}
                                    <td className="td-buttons">
                                        <button
                                            className="btn btn-sm editUser"
                                            variant="contained"
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm ms-2 deleteUser"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
