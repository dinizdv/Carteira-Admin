import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editarUsuarios.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { toast } from 'react-toastify';

export default function EditUsers() {
  const [loading, setLoading] = useState(true);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    nome: '',
    matricula: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    nivel: '',
  });
  

  console.log(userDetails);
  console.log(formValues)

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
      nome: user.nome,
      matricula: user.matricula,
      dataNascimento: user.dataNascimento,
      cpf: user.cpf,
      email: user.email,
      nivel: user.nivel,
    });
    setOpenEditUser(true);
  };

  
  useEffect(() => {
    if (selectedUser) {
      obtenerImagenBase64(selectedUser.id, token).then(imageBase64 => {
        setSelectedUser(prevState => ({...prevState, imagemUrl: imageBase64}));
      }).catch(error => {
        console.error("Erro ao carregar a imagem do usuário:", error);
      });
    }
  }, [selectedUser, token]); // Dependências do useEffect
  
  
  
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
        "https://apicontroleacesso-1.onrender.com/usuario",
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
        foto: selectedUser.imagemUrl, // Inclui a imagem editada como string base64
      };
  
      if (selectedUser.senha) {
        editedUser.senha = selectedUser.senha;
      }
  
      const response = await axios.put(
        `https://apicontroleacesso-1.onrender.com/usuario`,
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
          user.id === selectedUser.id? {...user,...editedUser } : user
        )
      );
  
      toast.success(`Usuário ${selectedUser.nome} atualizado com sucesso`);
      handleCloseEditUser();
    } catch (error) {
      toast.error("Erro ao editar o usuário:", error);
      console.error(error.response? error.response.data : error.message);
    }
  };
    
  // get img    
  async function obtenerImagenBase64(idUsuario, token) {
    try {
      const respuesta = await fetch(`https://apicontroleacesso-1.onrender.com/usuario/imagem/${idUsuario}`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      
      const blob = await respuesta.blob(); // Obtém os dados da imagem como Blob
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      
    } catch (error) {
      console.error('Error ao obter a imagem:', error);
      throw error; // Lança o erro para que possa ser tratado pelo chamador
    }
  }
  
   
  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) {
      console.log("Nenhum arquivo foi selecionado.");
      return;
    }
  
    // Cria um objeto FormData e adiciona o arquivo
    const formData = new FormData();
    formData.append("foto", file);
  
    // Adicione outros campos necessários ao FormData
    Object.keys(formValues).forEach(key => {
      if (key!== 'imagem') { // Supondo que 'imagem' seja o campo para a imagem original
        formData.append(key, formValues[key]);
      }
    });
  
    try {
      const response = await axios.put(
        `https://apicontroleacesso-1.onrender.com/usuario/upload/${selectedUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Resposta do servidor:", response);
      // Atualiza o estado com a nova imagem aqui
      setSelectedUser(prevState => ({
       ...prevState,
        imagemUrl: response.data.foto, // Assumindo que a resposta inclua a URL da imagem atualizada
      }));
    } catch (error) {
      console.error("Erro ao atualizar a imagem do usuário:", error);
      toast.error("Erro ao atualizar a imagem do usuário: " + (error.response? error.response.data : error.message));
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
            Tabela de usuários
          </h2>
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
      <td className="details">{user.matricula}</td>
      <td className="details">{user.nome}</td>
      <td className="details">{user.curso ? user.curso.nome : ""}</td>
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
  {/* displays img */}
  <div className="img-radius">
  {selectedUser && selectedUser.imagemUrl? (
  <img src={selectedUser.imagemUrl} alt="Perfil" className="img-user"/>
) : (
  <i className="fa-solid fa-user"></i>
)}

    {/* <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
    />
    <button onClick={handleImageUpload}>Adicionar Imagem</button> */}
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
              value={formValues.matricula}
              onChange={handleInputChange}
              name="matricula"
            />
            <label htmlFor="matricula-input" className="form-label">
              Matrícula
            </label>
          </div>
          <div className="form-floating mt-3 ms-3">
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
              Nome
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
              value={formValues.curso}
              onChange={handleInputChange}
              name="curso"
            />
            <label htmlFor="curso-input" className="form-label">
              Curso
            </label>
          </div>
          <div className="form-floating mt-3 ms-3">
            <input
              type="text"
              id="dataNascimento-input"
              className="form-control"
              placeholder=""
              value={formValues.dataNascimento}
              onChange={handleInputChange}
              name="dataNascimento"
            />
            <label htmlFor="dataNascimento-input" className="form-label">
              Data de Nascimento
            </label>
          </div>
        </div>
        <div className="d-inline-flex">
          <div className="form-floating mt-3">
            <input
              type="text"
              id="cpf-input"
              className="form-control"
              placeholder=""
              value={formValues.cpf}
              onChange={handleInputChange}
              name="cpf"
            />
            <label htmlFor="cpf-input" className="form-label">
              CPF
            </label>
          </div>
          <div className="form-floating mt-3 ms-3">
            <input
              type="text"
              id="email-input"
              className="form-control"
              placeholder=""
              value={formValues.email}
              onChange={handleInputChange}
              name="email"
            />
            <label htmlFor="email-input" className="form-label">
              Email
            </label>
          </div>
        </div>
        <div className="d-inline-flex">
          <div className="form-floating mt-3">
            <input
              type="text"
              id="nivel-input"
              className="form-control"
              placeholder=""
              value={formValues.nivel}
              onChange={handleInputChange}
              name="nivel"
            />
            <label htmlFor="nivel-input" className="form-label">
              Nível
            </label>
          </div>
          <div className="form-floating mt-3 ms-3">
            <input
              type="text"
              id="senha-input"
              className="form-control"
              placeholder=""
              value={formValues.senha}
              onChange={handleInputChange}
              name="senha"
            />
            <label htmlFor="senha-input" className="form-label">
              Senha
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
      <h4>Editar usuário</h4>
    </DialogTitle>
    <DialogContent className="dialogContent">
      <div className="container-img-radius mb-4 d-flex justify-content-center">
        <div className="img-radius">
          {/* displays img */}
          <div className="img-radius">
          {selectedUser.imagemUrl? (
  <img src={selectedUser.imagemUrl} alt="Perfil" className="img-user"/>
) : (
  <i className="fa-solid fa-user"></i>
)}

</div>

        </div>


</div>

<div className="mt-2 mb-4 d-flex justify-content-center">
  <input
    className="btn modal-btn-save"
    id="input-file"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
  />
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
        <div className="container-group">
          <label htmlFor="duracao" className="text-secondary inputDisabled">Duração do Curso:</label>
          <input
            disabled
            className="input-editUser text-secondary inputDisabled"
            type="text"
            name="cursoDuracao"
            id="cursoDuracao"
            value={selectedUser.curso?.duracao || ""}
            // onChange={(e) =>
            //   setSelectedUser({
            //     ...selectedUser,
            //     curso: { ...selectedUser.curso, duracao: e.target.value },
            //   })
            // }
          />
        </div>
        <div className="container-group">
          <label htmlFor="nivel" className="text-secondary inputDisabled">Nível:</label>
          <input
            disabled
            className="input-editUser text-secondary inputDisabled"
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
            ></i>
            <p className="mt-3 mb-1">Deseja excluir o usuário <strong className="text-primary">{selectedUser?.nome}</strong> (matrícula: {selectedUser?.matricula})?</p>
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
