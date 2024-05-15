import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./editarUsuarios.css";
import axios from "axios";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';

export default function EditUsers() {
  const [openAddUser, setOpenAddUser] = useState(false); // modal
  const [openEditUser, setOpenEditUser] = useState(false); // modal
  const [openDeleteUser, setOpenDeleteUser] = useState(false); // modal
  const [userDetails, setUserDetails] = useState({}); // nome, matrícula, curso

  // get token of the localStorage
  function useToken() {
    const token = localStorage.getItem("keyToken");
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  // token exists?
  const token = useToken();

  useEffect(() => {
    if (token) {
      console.log("Token encontrado:", token);
      fetchUserDetails(token); // call fetchUserDetails function with a  token
    } else {
      console.log("Token não encontrado...");
    }
  }, [token]); // useEffect: run again when the token changes

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

      const userDetails = response.data.content[0];
      console.log(userDetails);

      // armazenar dados do usuário na useState
      setUserDetails(userDetails);
    } catch (error) {
      console.log("Erro ao buscar detalhes do usuário:", error);
    }
  };

  // modal functions
  const handleClickOpenAddUser = () => {
    setOpenAddUser(true);
  };
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };
  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };
  const handleCloseEditUser = () => {
    setOpenEditUser(false);
  };
  const handleClickOpenDeleteUser = () => {
    setOpenDeleteUser(true);
  };
  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
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

      {/* users table */}
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
                {/* data-bs-toggle="modal" data-bs-target="#modal-addUser" */}
                <th id="addUser">
                  <button
                    className="btn btn-sm"
                    id="addUser-style"
                    variant="contained"
                    onClick={handleClickOpenAddUser}
                  >
                    <i class="fa-solid fa-user-plus"></i>
                  </button>
                </th>

                {/* add user modal */}
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
                        <i class="fa-solid fa-user"></i>
                      </div>
                    </div>

                    <section className="modal-userDetails">
                      {/* matrícula */}
                      <div class="form-floating mt-3">
                        <input
                          type="email"
                          id="matricula-input"
                          class="form-control"
                          placeholder=""
                        />
                        <label for="matricula-input" class="form-label">
                          Matrícula
                        </label>
                      </div>

                      {/* name */}
                      <div className="form-floating mt-3">
                        <input
                          type="text"
                          id="nome-input"
                          class="form-control"
                          placeholder=""
                        />
                        <label for="nome-input" class="form-label">
                          Nome
                        </label>
                      </div>

                      {/* curso */}
                      <div class="form-floating mt-3">
                        <input
                          type="email"
                          id="matricula-input"
                          class="form-control"
                          placeholder=""
                        />
                        <label for="matricula-input" class="form-label">
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
                {/* end */}
              </tr>
            </thead>

            {/* tbody */}
            <tbody>
              <tr className="tr-users">
                <td className="details">{userDetails.matricula}</td>
                <td className="details">{userDetails.nome}</td>
                <td className="details">
                  {userDetails.curso ? userDetails.curso.nome : ""}
                </td>{" "}
                {/* ternary => prevent 'undefined' error */}
                <td class="td-buttons">

                  {/* editUsers modal */}
                  <button
                    className="btn btn-sm editUser"
                    variant="contained"
                    onClick={handleClickOpenEditUser}
                  >
                    <i className="fa-solid fa-user-pen"></i>
                  </button>
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
                          <i class="fa-solid fa-user"></i>
                        </div>
                      </div>

                      <section className="modal-userDetails">
                        <div className="container-group">
                          <label htmlFor="matricula">N° de matrícula:</label>
                          <input
                            className="ps-2"
                            type="text"
                            name="matricula"
                            id="matricula"
                            value={userDetails.matricula}
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                matricula: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="container-group">
                          <label htmlFor="aluno">Aluno:</label>
                          <input
                            className="ps-2"
                            type="text"
                            name="aluno"
                            id="aluno"
                            value={userDetails.nome}
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                nome: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="container-group">
                          <label htmlFor="curso">Curso:</label>
                          <input
                            className="ps-2"
                            type="text"
                            name="curso"
                            id="curso"
                            value={
                              userDetails.curso ? userDetails.curso.nome : ""
                            }
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                curso: {
                                  ...userDetails.curso,
                                  nome: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </section>
                    </DialogContent>
                    <div className="container-btn-modal mb-3 me-3">
                      <button className="btn modal-btn-save">Salvar</button>
                      <button
                        onClick={handleCloseEditUser}
                        className="btn modal-btn-close ms-2"
                      >
                        Fechar
                      </button>
                    </div>
                  </Dialog>

                  {/* delete modal */}
                  
                  <button
    className="btn btn-sm ms-2 deleteUser"
    onClick={handleClickOpenDeleteUser}
  >
    <i className="fa-solid fa-trash"></i>
  </button>

  <Dialog
    className="modal-open"
    open={openDeleteUser}
    onClose={handleCloseDeleteUser}
  >
    <DialogTitle className="dialogTitle text-center">
      <h4>Confirme a exclusão</h4>
    </DialogTitle>
    <DialogContent className="dialogContent">
      <section>
        <p id="p-delete">Você deseja deletar o(a) aluno(a) {userDetails.nome} da tabela?</p>
      </section>
    </DialogContent>
    <div className="container-btn-modal mb-3 me-3">
      <button
        id="modal-btn-save-delete"
        className="btn modal-btn-save"
        onClick={() => {
        }}
      >
        Deletar
      </button>
      <button
        onClick={handleCloseDeleteUser}
        className="btn modal-btn-close ms-2"
      >
        Fechar
      </button>
    </div>
  </Dialog>
</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
