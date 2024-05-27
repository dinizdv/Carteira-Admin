import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editarCursos.css";
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
  const [formValues, setFormValues] = useState({
    nome: '',
    duracao: ''
  })

  
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
        "https://apicontroleacesso-1.onrender.com/curso",
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

  // delete function
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://apicontroleacesso-1.onrender.com/usuario/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  // update values function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
     ...formValues,
      [name]: value,
    });
  };
  

  // addCourse
  const addUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://apicontroleacesso-1.onrender.com/curso`,
        {
          nome: formValues.nome,
          duracao: formValues.duracao
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.status == 200 || !response.status == 201) {
        throw new Error(`HTTP Error status: ${response.status}`);
      }
  
      const newUser = response.data;
      setUserDetails([...userDetails, newUser]);
      console.log('Curso adicionado com sucesso!');
      handleCloseAddUser();
    } catch (error) {
      console.log('Erro ao adicionar curso ', error);
    }
  };
  



  // edit details function
  const saveEditedUser = async (event) => {
    event.preventDefault();
    if (!selectedUser) {
      console.log("No user selected for editing.");
      return; // Exit the function early if no user is selected
    }
  
    try {
      const editedUser = {
      ...selectedUser,
        nome: selectedUser.nome,
        duracao: selectedUser.duracao
      };
  
      const response = await axios.put(
        `https://apicontroleacesso-1.onrender.com/curso`,
        editedUser,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
  
      console.log(selectedUser.id);
      console.log(editedUser); // user details (with modifies)
      console.log("Usuário atualizado com sucesso:", response.data);
  
      // Use os dados retornados pela API para atualizar o estado
      setUserDetails((prevDetails) =>
        prevDetails.map((user) =>
          user.id === selectedUser.id? {...user,...editedUser } : user
      )
      );
  
      handleCloseEditUser();
    } catch (error) {
      console.log("Erro ao atualizar o curso:", error);
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
            Tabela de cursos
          </h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nome do curso</th>
                <th>Duração do curso</th>
                <th id="addUser">
                  <button
                    className="btn btn-sm"
                    id="addUser-style"
                    variant="contained"
                    onClick={handleClickOpenAddUser}
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(userDetails) &&
    userDetails.map((user) => (
      <tr key={user.id} className="tr-users">
        <td className="details">{user.nome}</td>
        <td className="details">{user.duracao}</td>
        <td className="td-buttons">
          <button
            className="btn btn-sm editUser"
            variant="contained"
            onClick={() => handleClickOpenEditUser(user)}
          >
            <i class="fa-solid fa-pen-to-square"></i>
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
    <h4>Adicionar curso</h4>
  </DialogTitle>
  <DialogContent className="dialogContent">
    <section className="modal-userDetails">
      <form onSubmit={addUser}>
        <div className="form-floating">
          <input
            type="text"
            id="nome-input"
            className="form-control"
            placeholder=""
            value={formValues.nome}
            onChange={handleInputChange}
            name="nome"
          />
          <label htmlFor="nome-input" className="form-label">
            Nome do curso
          </label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            id="duracao-input"
            className="form-control"
            placeholder=""
            value={formValues.duracao}
            onChange={handleInputChange}
            name="duracao"
          />
          <label htmlFor="duracao-input" className="form-label">
            Duração do curso
          </label>
        </div>

        <div className="container-btn-modal my-3">
                    <button
              onClick={addUser}
              className="btn modal-btn-save"
            >
              Salvar
            </button>
          <button
            onClick={handleCloseAddUser}
            className="btn modal-btn-close ms-2"
            type="button"
          >
            Fechar
          </button>
        </div>
      </form>
    </section>
  </DialogContent>
</Dialog>


{/* editUser */}
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
