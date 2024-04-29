import { Link } from 'react-router-dom' // for login button
import './editarCursos.css'
import '../editarUsuarios/editarUsuarios.css'

export default function EditUsers(){
    return (
    <div>
        <div class="container container-editUsers">
            <Link to={"/Home"} class="text-center fs-4 mb-2 ms-auto text-danger px-2" id="back">Voltar à Home<i class="fa-solid fa-house ps-2 text-danger"></i></Link>

            {/* table users */}
            <div class="card card-table border-0">
                        <div class="card-header">
                            <h5 class="card-title text-center m-0 fs-3 text-primary">
                                Tabela de cursos
                            </h5>
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Curso</th>
                                        <th scope="col">Duração</th>
                                        <th scope="col">Horários</th>
                                        <th><i class="fa-solid fa-pen-to-square"></i></th>
                                        <th><i class="fa-solid fa-trash"></i></th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="col" class="course">Desenvolvimento de Sistemas</td>
                                        <td scope="col">2023 - 2024</td>
                                        <td scope="col">7h30 - 11h30 | 13h30 - 17h30</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>
                                    <tr>
                                        <td scope="col" class="course">Desenvolvimento </td>
                                        <td scope="col">2023 - 2024</td>
                                        <td scope="col">7h30 - 17h30</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                    <td scope="col" class="course">Desenvolvimento de Sistemas</td>

                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>                                    <tr>
                                        <td scope="col" class="course">Curso</td>
                                        <td scope="col">Duração</td>
                                        <td scope="col">Horários</td>
                                        <td><i class="fa-solid fa-pen-to-square"></i></td>
                                        <td><i class="fa-solid fa-trash"></i></td>                                        
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

        </div>
    </div> 
    )
}