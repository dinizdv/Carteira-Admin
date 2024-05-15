import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './editarUsuarios.css';
import axios from 'axios';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function EditUsers() {
    const [open, setOpen] = useState(false)
    const [userDetails, setUserDetails] = useState({})

    // get token of the localStorage
    function useToken() {
        const token = localStorage.getItem('keyToken');
        if (token) {
            return JSON.parse(token);
        }
        return null;
    }

    // token exists?
    const token = useToken();

    useEffect(() => {
        if (token) {
            console.log('Token encontrado:', token);
            fetchUserDetails(token); // Chama a função fetchUserDetails com o token
        } else {
            console.log('Token não encontrado...');
        }
    }, [token]); // useEffect: run again when the token changes

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get('https://apicontroleacesso-1.onrender.com/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userDetails = response.data.content[0];
            console.log(userDetails);

            // armazenar dados do usuário na useState
            setUserDetails(userDetails)

        } catch (error) {
            console.log('Erro ao buscar detalhes do usuário:', error);
        }
    };
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container container-editUsers">
            <Link to={"/Home"} className="text-center fs-4 mt-4 mb-3 ms-auto text-danger px-2" id="back">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger"></i></Link>


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
                                <th id="addUser"><button className="btn btn-sm" id="addUser-style" variant="contained" onClick={handleClickOpen}><i class="fa-solid fa-user-plus"></i></button></th>
                            
                                <Dialog className="modal-open" open={open} onClose={handleClose}>
                <DialogTitle className="dialogTitle"><h4>Adicionar usuário</h4></DialogTitle>
                <DialogContent className="dialogContent">
                    Nesta página, você pode adicionar usuários!
                </DialogContent>
                <div className="container-btn-modal mb-3 me-3">
                <button className="btn modal-btn-save">Salvar</button>
                    <button onClick={handleClose} className="btn modal-btn-close ms-2">Fechar</button>
                </div>
            </Dialog>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tr-users">
                                <td className="details">{userDetails.matricula}</td>
                                <td className="details">{userDetails.nome}</td>
                                <td className="details">{userDetails.curso? userDetails.curso.nome : ''}</td> {/* ternary => prevent 'undefined' error */}

                                {/* modal add user */}
                                {/* <div className="modal fade" id="modal-addUser" tabIndex="-1" arial-labelledby="modal-label-addUser" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h2 className="modal-title fs-5" id="modal-label-addUser">Adicionar usuário</h2>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi obcaecati repellendus iure?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                                                <button type="button" class="btn btn-outline-primary">Salvar alterações</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <td class="td-buttons">
                                    <button className="btn btn-sm editUser"><i className="fa-solid fa-user-pen"></i></button>
                                    <button className="btn btn-sm ms-2 deleteUser"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
