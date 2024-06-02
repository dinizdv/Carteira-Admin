import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editarCursos.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { toast } from "react-toastify";

export default function EditUsers() {
  const [loading, setLoading] = useState(true)
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

  // get courses
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
      setLoading(false) // loading state
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
      const response = await axios.delete(
        `https://apicontroleacesso-1.onrender.com/curso/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUserDetails((prevDetails) =>
        prevDetails.filter((user) => user.id !== userId)
      );
      toast.success(`Curso ${selectedUser.nome} deletado com sucesso`);

      handleCloseDeleteUser();
    } catch (error) {
      console.error("Erro ao deletar o curso:", error.response ? error.response.data : error.message);
      toast.error("Erro ao deletar o curso: ", error.response ? error.response.data : error.message);
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
  const addCourse = async (event) => {
    event.preventDefault();
  
    console.log('Tentativa de adicionar curso:', formValues);
  
    try {
      const response = await axios.post(
        'https://apicontroleacesso-1.onrender.com/curso',
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
  
      console.log('Server response:', response);
  
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP Error status: ${response.status}`);
      }
  
      const newUser = response.data;
      setUserDetails([...userDetails, newUser]);
      console.log('Curso adicionado com sucesso!');
      toast.success(`Curso ${formValues.nome} adicionado com sucesso`)
      handleCloseAddUser();
    } catch (error) {
      console.log('Erro ao adicionar curso ', error.response ? error.response.data : error.message);
    }
  };
    



  // edit details function
  const saveEditedUser = async (event) => {
    event.preventDefault();
    if (!selectedUser) {
      console.log("Sem curso selecionado para edição");
      return; // exit the function early if no user is selected
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
  
      console.log(editedUser); // user details (with modifies)
      toast.success(`Curso ${selectedUser.nome} (${selectedUser.duracao} horas de duração) editado com sucesso`);
  
      // use os dados retornados pela API para atualizar o estado
      setUserDetails((prevDetails) =>
        prevDetails.map((user) =>
          user.id === selectedUser.id? {...user,...editedUser } : user
      )
      );
  
      handleCloseEditUser();
    } catch (error) {
      toast.error(`Erro ao atualizar o curso ${selectedUser.nome} (${selectedUser.duracao} horas de duração)`)
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
          <h2 className="card-title text-center m-0 fs-3 text-primary">
            Tabela de cursos
          </h2>
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

{/* loading animation */}
            {loading && 
                
                <div className="container-fluid container-loadingData mt-0">
                  <p className="loadingData">Carregando os dados...</p>
                  <iframe src="https://lottie.host/embed/d40e20f0-b3d7-4c31-9c25-89a36ac33038/ZryRBBWA7J.json"></iframe>
                </div>
                }

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
      <form onSubmit={addCourse}>
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
              onClick={addCourse}
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
            <h4>Editar curso</h4>
          </DialogTitle>
          <DialogContent className="dialogContent">
            <section className="modal-userDetails">
              <div className="container-group">
                <label htmlFor="aluno">Nome do curso:</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="nomeCurso"
                  id="nomeCurso"
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
                <label htmlFor="duracaoCurso">Duração do curso:</label>
                <input
                  className="input-editUser"
                  type="text"
                  name="duracaoCurso"
                  id="duracaoCurso"
                  value={selectedUser.duracao || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      duracao: e.target.value,
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

{/* delete */}
      <Dialog
        className="modal-open"
        open={openDeleteUser}
        onClose={handleCloseDeleteUser}
      >
        <DialogTitle className="dialogTitle text-center">
          <h4>Excluir curso</h4>
        </DialogTitle>
        <DialogContent className="dialogContent">
          <div className="text-center">
            <i
              className="fa-solid fa-circle-exclamation text-danger"
            ></i>
            <p className="mt-3">Deseja excluir o curso <strong className="text-primary">{selectedUser?.nome}?</strong></p>
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
