import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Testing from '../pages/Functions';
import EditUsers from '../pages/editarUsuarios';
import EditCourses from '../pages/editarCursos';
import Transacao from '../pages/Transacao';
import Notifications from '../pages/notificacoes';
import Error from '../pages/Error'
import Private from './Private'
import Horarios from '../pages/Horarios';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Login />} /> {/* login page */}
            <Route path="/home" element={ <Private> <Home/> </Private>} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/home/editarUsuarios" element={<EditUsers />} />
            <Route path="/home/editarCursos" element={<EditCourses />} />
            <Route path="/home/horarios" element={<Horarios />} />
            <Route path="/home/transacoes" element={<Transacao />} />
            <Route path="/home/notificacoes" element={<Notifications/>} />
            <Route path="/testing" element={<Testing />} /> {/* testing page */}
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;