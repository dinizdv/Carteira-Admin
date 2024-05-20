import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editarUsuarios.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export default function EditUsers() {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(userDetails);

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

  // Modals
  const handleClickOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const handleClickOpenEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditUser(true);
  };
  const handleCloseEditUser = () => {
    setSelectedUser(null);
    setOpenEditUser(false);
  };

  const handleClickOpenDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteUser(true);
  };
  const handleCloseDeleteUser = () => {
    setSelectedUser(null);
    setOpenDeleteUser(false);
  };

  // Delete function
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://apicontroleacesso-1.onrender.com/usuario/${userId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(userId);
      setUserDetails((prevDetails) =>
        prevDetails.filter((user) => user.id !== userId)
      );
      handleCloseDeleteUser();
    } catch (error) {
      console.log("Erro ao deletar o usuário: ", error);
    }
  };

  const saveEditedUser = async (event) => {
    event.preventDefault();
    try {
      const editedUser = {
       ...selectedUser,
        nome: selectedUser.nome,
        dataNascimento: selectedUser.dataNascimento,
        cpf: selectedUser.cpf,
        email: selectedUser.email,
        curso: selectedUser.curso? selectedUser.curso.nome : "",
        nivel: selectedUser.nivel,
      };
  
      const response = await axios.put(
        `https://apicontroleacesso-1.onrender.com/usuario/${selectedUser.id}`,
        editedUser,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Usuário atualizado com sucesso:", response.data);
      // Atualize o estado com o objeto editedUser, assumindo que a resposta da API retorna o objeto atualizado
      setUserDetails((prevDetails) =>
        prevDetails.map((user) =>
          user.id === selectedUser.id? editedUser : user
        )
      );
      handleCloseEditUser();
    } catch (error) {
      console.log("Erro ao atualizar o usuário:", error);
      // Trate o erro aqui, por exemplo, informando ao usuário
    
    }

  };

   
  return (
    <div className="container container-editUsers">
      <Link
        to={"/Home"}
        className="text-center fs-4 mt-4 mb-3 ms-auto text-danger px-2"
        id="back"
      >
        Voltar à Home<i className="fa-solid fa-house ps-2 text-danger"></i>
      </Link>

      <div className="card card-table border-0">
        <div className="card-header">
          <h5 className="card-title text-center m-0 fs-3 text-primary">
            Tabela de usuários
          </h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>N° de matrícula</th>
                <th>Nome</th>
                <th>Curso</th>
                <th id="addUser">
                  <button
                    className="btn btn-sm"
                    id="addUser-style"
                    variant="contained"
                    onClick={handleClickOpenAddUser}
                  >
                    <i className="fa-solid fa-user-plus"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(userDetails) &&
  userDetails.map((user) => (
    <tr key={user.id} className="tr-users">
      <td className="details">{user.matricula}</td>
      <td className="details">{user.nome}</td>
      <td className="details">
        {user.curso? user.curso.nome : ""}
      </td>
      <td className="td-buttons">
        <button
          className="btn btn-sm editUser"
          variant="contained"
          onClick={() => handleClickOpenEditUser(user)}
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>
        <button
          className="btn btn-sm ms-2 deleteUser"
          onClick={() => handleClickOpenDeleteUser(user)}
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

      <Dialog
        className="modal-open"
        open={openAddUser}
        onClose={handleCloseAddUser}
      >
        <DialogTitle className="dialogTitle text-center">
          <h4>Adicionar usuário</h4>
        </DialogTitle>
        <DialogContent className="dialogContent">
          <div className="container-img-radius mb-4 d-flex justify-content-center">
            <div className="img-radius">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
          <section className="modal-userDetails">
            <div className="form-floating mt-3">
              <input
                type="email"
                id="matricula-input"
                className="form-control"
                placeholder=""
              />
              <label htmlFor="matricula-input" className="form-label">
                Matrícula
              </label>
            </div>
            <div className="form-floating mt-3">
              <input
                type="text"
                id="nome-input"
                className="form-control"
                placeholder=""
              />
              <label htmlFor="nome-input" className="form-label">
                Nome
              </label>
            </div>
            <div className="form-floating mt-3">
              <input
                type="text"
                id="curso-input"
                className="form-control"
                placeholder=""
              />
              <label htmlFor="curso-input" className="form-label">
                Curso
              </label>
            </div>
          </section>
        </DialogContent>
        <div className="container-btn-modal mb-3 me-3">
          <button className="btn modal-btn-save">Salvar</button>
          <button
            onClick={handleCloseAddUser}
            className="btn modal-btn-close ms-2"
          >
            Fechar
          </button>
        </div>
      </Dialog>

      {selectedUser && (
        <Dialog
          className="modal-open"
          open={openEditUser}
          onClose={handleCloseEditUser}
        >
          <DialogTitle className="dialogTitle text-center">
            <h4>Editar usuário</h4>
          </DialogTitle>
          <DialogContent className="dialogContent">
            <div className="container-img-radius mb-4 d-flex justify-content-center">
              <div className="img-radius">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
            <section className="modal-userDetails">
              <div className="container-group">
                <label htmlFor="aluno">Aluno(a):</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="aluno"
                  id="aluno"
                  value={selectedUser.nome || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      nome: e.target.value,
                    })
                  }
                />
              </div>
              <div className="container-group">
                <label htmlFor="nascimento">Data de nascimento:</label>
                <input
                  className="input-editUser"
                  type="date"
                  name="nascimento"
                  id="nascimento"
                  value={selectedUser.dataNascimento || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      dataNascimento: e.target.value,
                    })
                  }
                />
              </div>
              <div className="container-group">
                <label htmlFor="cpf">CPF:</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="cpf"
                  id="cpf"
                  value={selectedUser.cpf || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      cpf: e.target.value,
                    })
                  }
                />
              </div>
              <div className="container-group">
                <label htmlFor="email">Email:</label>
                <input
                  className="input-editUser"
                  type="email"
                  name="email"
                  id="email"
                  value={selectedUser.email || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="container-group">
                <label htmlFor="curso">Curso:</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="curso"
                  id="curso"
                  value={selectedUser.curso?.nome || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      curso: { ...selectedUser.curso, nome: e.target.value },
                    })
                  }
                />
              </div>
              <div className="container-group">
                <label htmlFor="nivel">Nível:</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="nivel"
                  id="nivel"
                  value={selectedUser.nivel || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      nivel: e.target.value,
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

      <Dialog
        className="modal-open"
        open={openDeleteUser}
        onClose={handleCloseDeleteUser}
      >
        <DialogTitle className="dialogTitle text-center">
          <h4>Excluir usuário</h4>
        </DialogTitle>
        <DialogContent className="dialogContent">
          <div className="text-center">
            <i
              className="fa-solid fa-circle-exclamation text-danger"
              style={{ fontSize: "4rem" }}
            ></i>
            <p>Deseja excluir o usuário {selectedUser?.nome}?</p>
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
    </div>
  );
}
