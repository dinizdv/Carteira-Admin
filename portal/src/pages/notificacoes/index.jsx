import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './notificacoes.css';
import '../editarUsuarios/editarUsuarios.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export default function Notifications() {
    const [loading, setLoading] = useState(true)
    const [textareaValue, setTextareaValue] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const [notificationDetails, setNotificationDetails] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditUser, setOpenEditUser] = useState(false);
    const [openDeleteUser, setOpenDeleteUser] = useState(false);


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
          fetchNotificationDetails(token);
        } else {
          console.log("Token não encontrado...");
        }
    }, [token]);

    // get users
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
          setLoading(false)
        } catch (error) {
          console.log("Erro ao buscar detalhes do usuário:", error);
        }
    };


    // get notificações
    const fetchNotificationDetails = async (token) => {
        try {
          const response = await axios.get(
            "https://apicontroleacesso-1.onrender.com/notificacao",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data.content) // id, mensagem, usuario {id, nome, dataNascimento, matricula, curso {id, nome, duracao}, cpf, email, nivel}
          if (!Array.isArray(response.data.content)) {
            console.error("A resposta da API não contém um array");
            return;
          }

          setNotificationDetails(response.data.content);
          setLoading(false)
        } catch (error) {
          console.log("Erro ao buscar detalhes do usuário:", error);
        }
    };


    // send notification
    const handleSelectChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const sendNotification = async () => {

        if (!selectedUserId) {
            toast.info('Por favor, selecione um usuário destinatário.');
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

            // automatically update
            fetchNotificationDetails(token);

        } catch (error) {
            console.log("Erro ao enviar notificação:", error);
            toast.error('Erro ao enviar notificação. Verifique se os dados estão corretos.');
        }
    };

    // edit notification
    const saveEditedUser = async (event) => {
        event.preventDefault();
        if (!selectedUser) {
            console.log("Nenhuma notificação selecionada para edição");
            return;
        }
      
        try {
            const editedNotification = {
                id: selectedUser.id,
                mensagem: selectedUser.mensagem,
                // Se desejar editar outros campos, adicione-os aqui
            };
      
            const response = await axios.put(
                `https://apicontroleacesso-1.onrender.com/notificacao`,
                editedNotification,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
      
            console.log("Notificação editada com sucesso:", response.data);
            toast.success(`Notificação do usuário ${selectedUser.usuario.nome} editada com sucesso`);
      
            // automatically update state
            fetchNotificationDetails(token);
      
            handleCloseEditUser();
        } catch (error) {
            console.log("Erro ao atualizar a notificação:", error);
            toast.error(`Erro ao atualizar a notificação do usuário ${selectedUser.usuario.nome}. Verifique se os dados estão corretos.`);
        }
    };  


    // delete notification
    const handleDeleteUser = async (userId) => {
        try {
          await axios.delete(
            `https://apicontroleacesso-1.onrender.com/notificacao/${userId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          console.log(userId);
          toast.success(`Notificação do usuário ${selectedUser.usuario.nome} deletada com sucesso`);
          setUserDetails((prevDetails) =>
            prevDetails.filter((user) => user.id !== userId)
          );
          handleCloseDeleteUser();
          fetchNotificationDetails(token);

        } catch (error) {
            console.log(`Error: `, error)
            toast.error(`Erro ao deletar o usuário ${selectedUser.usuario.nome} `);
        }
      };
    

    // modals
      const handleClickOpenEditUser = (notification) => {
        setSelectedUser(notification);
        setOpenEditUser(true);
      };

      const handleCloseEditUser = () => {
        setSelectedUser(null);
        setOpenEditUser(false);
      };
    
      const handleClickOpenDeleteUser = (notification) => {
        setSelectedUser(notification);
        setOpenDeleteUser(true);
      };
      const handleCloseDeleteUser = () => {
        setSelectedUser(null);
        setOpenDeleteUser(false);
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
                            ))} cv
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
                                    <th scope="col" className="col">Texto da notificação</th>
                                    <th scope="col" className="col">Destinatário</th>
                                    <th className="col"></th> {/* empty th: fixing interface bug */}
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
                                {notificationDetails.map((notification) => (
                                <tr key={notification.id} className="tr-users">
                                    <td className="details">{notification.mensagem}</td> {/* display notification */}
                                    <td className="details">{notification.usuario.nome}</td> {/* user name */}
                                    <td className="td-buttons">
                                        <button
                                            className="btn btn-sm editUser"
                                            variant="contained"
                                            onClick={() => handleClickOpenEditUser(notification)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm ms-2 deleteUser"
                                            onClick={() => handleClickOpenDeleteUser(notification)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                    ))}


{/* edit notification */}
{selectedUser && (
        <Dialog
          className="modal-open"
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle className="dialogTitle text-center">
            <h4>Editar notificação</h4>
          </DialogTitle>
          <DialogContent className="dialogContent">
            <section className="modal-userDetails">
              <div className="container-group">
                <label htmlFor="aluno" className="text-secondary inputDisabled">Destinatário:</label>
                <input
                  className="input-editUser text-secondary inputDisabled"
                  type="text"
                  name="nomeCurso"
                  id="inputNotification"
                  disabled
                  value={selectedUser.usuario.nome || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      nome: e.target.value,
                    })
                  }
                />
              </div>

              <div className="container-group">
                <label htmlFor="duracaoCurso">Texto da notificação:</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="duracaoCurso"
                  id="duracaoCurso"
                  value={selectedUser.mensagem || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      mensagem: e.target.value,
                    })
                  }
                />
              </div>

            </section>
          </DialogContent>
          <div className="container-btn-modal mb-3 me-3">
            <button
              onClick={saveEditedUser}
              className="btn modal-btn-save"
            >
              Salvar
            </button>
            <button
              onClick={handleCloseEditUser}
              className="btn modal-btn-close ms-2"
            >
              Fechar
            </button>
          </div>
        </Dialog>
      )}

{/* delete notification */}
<Dialog
        className="modal-open"
        open={openDeleteUser}
        onClose={handleCloseDeleteUser}
      >
        <DialogTitle className="dialogTitle text-center">
          <h4>Excluir notificação</h4>
        </DialogTitle>
        <DialogContent className="dialogContent">
          <div className="text-center">
            <i
              className="fa-solid fa-circle-exclamation text-danger"
            ></i>
            <p className="mt-3">Deseja excluir a notificação do usuário <strong className="text-primary">{selectedUser?.usuario.nome}?</strong></p>
          </div>
        </DialogContent>
        <div className="container-btn-modal mb-3 me-3">
          <button
            onClick={() => handleDeleteUser(selectedUser.id)}
            className="btn modal-btn-delete"
          >
            Excluir
          </button>
          <button
            onClick={handleCloseDeleteUser}
            className="btn modal-btn-close ms-2"
          >
            Fechar
          </button>
        </div>
      </Dialog>



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
