import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './notificacoes.css';
import '../editarUsuarios/editarUsuarios.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Notifications() {
    const [textareaValue, setTextareaValue] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

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

          setUserDetails(response.data.content);
        } catch (error) {
          console.log("Erro ao buscar detalhes do usuário:", error);
        }
    };
    
    const handleSelectChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const sendNotification = async (event) => {
        event.preventDefault(); 

        if (!selectedUserId) {
            alert('Por favor, selecione um usuário destinatário.');
            return;
        }

        try {
            const notificationData = {
                usuario: {
                    id: selectedUserId // current id
                },
                mensagem: textareaValue // notification text (title + message)
            };

            // post req
            const response = await axios.post(
                "https://apicontroleacesso-1.onrender.com/notificacao",
                notificationData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` 
                    }
                }
            );


            console.log("Notificação enviada com sucesso:", response.data);
            toast.success('Notificação enviada com sucesso');

            // cleaning the textarea
            setTextareaValue('');
        } catch (error) {
            console.log("Erro ao enviar notificação:", error);
            toast.error('Erro ao enviar notificação. Verifique se os dados estão corretos.');
        }
    };

    return (
        <div>
            <div className="container container-editUsers py-5">
                <Link to={"/Home"} className="text-center fs-4 mb-2 ms-auto text-danger px-2" id="back">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger"></i></Link>

                <section className="container-textarea">
                    <textarea placeholder="Digite sua notificação aqui (estrutura: título : texto)" maxLength={300} value={textareaValue} onChange={handleTextareaChange}></textarea>

                    <div className="container-btn-not d-flex justify-content-end my-1">
                        <select name="usuarios" id="usuarios" className="rounded" onChange={handleSelectChange}>
                            <option selected disabled>Aluno destinatário</option>
                            {userDetails.map((user) => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="container-btn-not d-flex justify-content-end mt-3">
                        <button id="btn-notification" onClick={sendNotification}>Enviar notificação</button>
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
                                <tr>
                                    <th scope="col" className="col-12">Texto da notificação</th>
                                    <th scope="col" className="col-12">Destinatário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.map((user) => (
                                <tr key={user.id} className="tr-users">
                                    <td className="details">{user.mensagem}</td> {/* display notification */}
                                    <td className="details">{user.nome}</td> {/* display notification */}
                                    <td className="td-buttons">
                                        <button
                                            className="btn btn-sm editUser"
                                            variant="contained"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm ms-2 deleteUser"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
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
