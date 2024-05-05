import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // for login button
import './notificacoes.css';
import '../editarUsuarios/editarUsuarios.css';
import './lenght.js';

export default function Notifications() {
    const [textareaValue, setTextareaValue] = useState(''); // estado para armazenar o valor do textarea

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value); // atualiza o estado com o valor atual do textarea
    };

    return (
        <div>
            <div className="container container-editUsers py-5">
                <Link to={"/Home"} className="text-center fs-4 mb-2 ms-auto text-danger px-2" id="back">Voltar à Home<i className="fa-solid fa-house ps-2 text-danger"></i></Link>

                <section className="container-textarea">
                    <textarea placeholder="Digite o texto da sua notificação..." maxLength={300} value={textareaValue} onChange={handleTextareaChange}></textarea>
                    <div className="container-btn-not d-flex justify-content-end">
                        <button id="btn-notification">Enviar notificação</button>\
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
                                    <th scope="col" className="col-10">Texto da notificação</th>
                                    <th><i className="fa-solid fa-pen-to-square ps-5"></i></th>
                                    <th><i className="fa-solid fa-trash"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="col" className="text-notification">{textareaValue}</td>
                                    <td><i className="fa-solid fa-pen-to-square ps-5"></i></td>
                                    <td><i className="fa-solid fa-trash"></i></td>
                                </tr>
                                {/* Outras linhas da tabela */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
