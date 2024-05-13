import { Link } from 'react-router-dom' // for login button
import './editarUsuarios.css'
import {Test} from '../Functions'

export default function EditUsers(){
    return (
    <div>
        <div class="container container-editUsers">
            <Link to={"/Home"} class="text-center fs-4 mb-2 ms-auto text-danger px-2" id="back">Voltar à Home<i class="fa-solid fa-house ps-2 text-danger"></i></Link>

            {/* table users */}
            <div class="card card-table border-0">
                        <div class="card-header">
                            <h5 class="card-title text-center m-0 fs-3 text-primary">
                                Tabela de usuários
                            </h5>
                        </div>

                        {/* <p>
                            <Test />
                        </p> */}

                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">N° de matrícula</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Curso</th>
                                        <th><i class="fa-solid fa-user-plus"></i></ th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>00000000</td>
                                        <td>Luisa Belo</td>
                                        <td>Desenvolvimento de Sistemas</td>
                                        <td><i class="fa-solid fa-user-pen icon-user"></i></td>
                                        <td><i class="fa-solid fa-trash icon-user"></i></td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>

        </div>
    </div> 
    )
}