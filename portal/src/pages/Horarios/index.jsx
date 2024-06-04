import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./horarios.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { toast } from 'react-toastify';

export default function Horarios() {
  const [loading, setLoading] = useState(true);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    diaSemana : '',
    horario_entrada: '',
    horario_saida: '',
  });
  

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
        "https://apicontroleacesso-1.onrender.com/horario",
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
  
      setUserDetails(response.data.content.filter(user => typeof user === 'object'));
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar detalhes do usuário:", error);
      setLoading(false);
    }
  };
  
  const handleClickOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const handleClickOpenEditUser = (user) => {
    setSelectedUser(user);
    setFormValues({
      diaSemana: user.diaSemana,
      horario_entrada: user.horario_entrada,
      horario_saida: user.horario_saida,
      curso: user.curso.nome,
      duracao: user.curso.duracao,
    });
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

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://apicontroleacesso-1.onrender.com/horario/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(userId);
      toast.success(`Usuário ${selectedUser.nome} (matrícula: ${selectedUser.matricula}) deletado com sucesso`);
      setUserDetails((prevDetails) =>
        prevDetails.filter((user) => user.id !== userId)
      );
      handleCloseDeleteUser();
    } catch (error) {
      console.log("Erro ao deletar o usuário: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://apicontroleacesso-1.onrender.com/horario",
        {
          id: formValues.id,
          nome: formValues.nome,
          matricula: formValues.matricula,
          email: formValues.email,
          cpf: formValues.cpf,
          dataNascimento: formValues.dataNascimento,
          nivel: formValues.nivel,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP Error status: ${response.status}`);
      }

      const newUser = response.data;
      setUserDetails([...userDetails, newUser]);
      console.log('Usuário adicionado com sucesso!');
      toast.success(`Usuário ${formValues.nome} (matrícula: ${formValues.matricula}) adicionado com sucesso`);
      handleCloseAddUser();
    } catch (error) {
      console.log('Erro ao adicionar usuário: ', error);
    }
  };
  
  const saveEditedUser = async (event) => {
    event.preventDefault();

    if (!selectedUser) {
      console.log("Nenhum usuário selecionado para edição");
      return;
    }

    try {
      const editedUser = {
        id: selectedUser.id,
        nome: selectedUser.nome,
        dataNascimento: selectedUser.dataNascimento,
        cpf: selectedUser.cpf,
        email: selectedUser.email,
        nivel: selectedUser.nivel,
      };

      if (selectedUser.senha) {
        editedUser.senha = selectedUser.senha;
      }

      const response = await axios.put(
        `https://apicontroleacesso-1.onrender.com/horario`, 
        editedUser,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Usuário editado com sucesso:", response.data);

      setUserDetails((prevDetails) =>
        prevDetails.map((user) =>
          user.id === selectedUser.id ? { ...user, ...editedUser } : user
        )
      );

      toast.success(`Usuário ${selectedUser.nome} atualizado com sucesso`);
      handleCloseEditUser();
    } catch (error) {
      toast.error("Erro ao editar o usuário:", error);
      console.error(error.response ? error.response.data : error.message);
    }
  };
  
      
// async function obtenerImagenBase64(idUsuario, token) {
//   try {
//     const respuesta = await fetch(`https://apicontroleacesso-1.onrender.com/usuario/imagem/${idUsuario}`, {
//       method: 'GET',
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
    
//     if (!respuesta.ok) {
//       throw new Error(`Error HTTP: ${respuesta.status}`);
//     }
    
//     const datos = await respuesta.blob(); // Obtener los datos de la imagen como Blob
    
//     // Convertir el Blob a una URL de objeto para visualización
//     const urlObjeto = URL.createObjectURL(datos);
    
//     // Crear un elemento img y establecer su atributo src con la URL del objeto
//     const img = document.createElement('img');
//     img.src = urlObjeto;
    
//     const reader = new FileReader();
//     reader.onloadend = function() {
//       const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
//       console.log(base64String); 
//     };
//     reader.readAsDataURL(datos);
    
//     setTimeout(() => URL.revokeObjectURL(urlObjeto), 100);
    
//   } catch (error) {
//     console.error('Error al obtener la imagen:', error);
//   }
// }

// obtenerImagenBase64('123', token); 

   
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
            Tabela de horários
          </h2>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Dia da semana</th>
                <th>Horário de entrada</th>
                <th>Horário de saída</th>
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

            {/* loading animation */}
            {loading && 
                
                <div className="container-fluid container-loadingData mt-0">
                  <p className="loadingData">Carregando os dados...</p>
                  <iframe src="https://lottie.host/embed/d40e20f0-b3d7-4c31-9c25-89a36ac33038/ZryRBBWA7J.json"></iframe>
                </div>
                }
                
            <tbody>
  {Array.isArray(userDetails) && userDetails.map((user) => (
    <tr key={user.id} className="tr-users">
      <td className="details">{user.diaSemana}</td>
      <td className="details">{user.horario_entrada}</td>
      <td className="details">{user.horario_saida}</td>
      <td className="details">{user.curso.nome}</td>
      <td className="td-buttons">
        <button
          key={`edit-${user.id}`} // adiciona uma chave única para o botão de edição
          className="btn btn-sm editUser"
          variant="contained"
          onClick={() => handleClickOpenEditUser(user)}
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>
        <button
          key={`delete-${user.id}`} // adiciona uma chave única para o botão de exclusão
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

{/* addUser */}
      <Dialog
  className="modal-open"
  id="modal-addUser"
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
      <form onSubmit={addUser} id="form-addUser">
        <div className="d-inline-flex">
          <div className="form-floating mt-3">
            <input
              type="text"
              id="matricula-input"
              className="form-control"
              placeholder="informe..."
              value={formValues.diaSemana}
              onChange={handleInputChange}
              name="matricula"
            />
            <label htmlFor="matricula-input" className="form-label">
              Dia da semana
            </label>
          </div>
          <div className="form-floating mt-3 ms-3">
            <input
              type="text"
              id="nome-input"
              className="form-control"
              placeholder=""
              value={formValues.horario_entrada}
              onChange={handleInputChange}
              name="nome"
            />
            <label htmlFor="nome-input" className="form-label">
              Horário de entrada
            </label>
          </div>
        </div>
        <div className="d-inline-flex">
          <div className="form-floating mt-3">
            <input
              type="text"
              id="curso-input"
              className="form-control"
              placeholder=""
              value={formValues.horario_saida}
              onChange={handleInputChange}
              name="curso"
            />
            <label htmlFor="curso-input" className="form-label">
              Horário de saída
            </label>
          </div>
          <div className="form-floating mt-3 ms-3">
            <input
              type="text"
              id="dataNascimento-input"
              className="form-control"
              placeholder=""
              value={formValues.curso}
              onChange={handleInputChange}
              name="dataNascimento"
            />
            <label htmlFor="dataNascimento-input" className="form-label">
              Curso
            </label>
          </div>
        </div>
        
        
        <div className="container-btn-modal mt-4">
          <button className="btn modal-btn-save" type="submit">
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
      <h4>Editar horários</h4>
    </DialogTitle>
    <DialogContent className="dialogContent">
      <div className="container-img-radius mb-4 d-flex justify-content-center">
        <div className="img-radius">
          {/* Exibindo a imagem do usuário */}
          {selectedUser.imagemUrl? (
            <img src={selectedUser.imagemUrl} alt="Perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <i className="fa-solid fa-user"></i>
          )}
        </div>
      </div>
      
      
            <section className="modal-userDetails">
        <div className="container-group">
          <label htmlFor="aluno">Dia da semana:</label>
          <input
            className="input-editUser"
            type="text"
            name="aluno"
            id="aluno"
            value={selectedUser.diaSemana || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                diaSemana: e.target.value,
              })
            }
          />
        </div>

        <div className="container-group">
          <label htmlFor="cpf">Horário de entrada:</label>
          <input
            className="input-editUser"
            type="text"
            name="cpf"
            id="cpf"
            value={selectedUser.horario_entrada || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                horario_entrada: e.target.value,
              })
            }
          />
        </div>

        <div className="container-group">
          <label htmlFor="cpf">Horário de saída:</label>
          <input
            className="input-editUser"
            type="text"
            name="cpf"
            id="cpf"
            value={selectedUser.horario_saida || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                horario_saida: e.target.value,
              })
            }
          />
        </div>

        <div className="container-group">
          <label htmlFor="curso" className="text-secondary inputDisabled">Curso:</label>
          <input
            disabled
            className="input-editUser text-secondary inputDisabled"
            type="text"
            name="cursoNome"
            id="cursoNome"
            value={selectedUser.curso?.nome || ""}
            // onChange={(e) =>
            //   setSelectedUser({
            //     ...selectedUser,
            //     curso: { ...selectedUser.curso, nome: e.target.value },
            //   })
            // }
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
            ></i>
            <p className="mt-3 mb-1">Deseja excluir o horário do curso <strong className="text-primary">{selectedUser?.curso?.nome}</strong></p>
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
