import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Testing from '../pages/Functions';
import EditUsers from '../pages/editarUsuarios';
import EditCourses from '../pages/editarCursos';
import Notifications from '../pages/notificacoes';
import Error from '../pages/Error'

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Login />} /> {/* login page */}
            <Route path="/home" element={<Home />} />
            <Route path="/home/editarUsuarios" element={<EditUsers />} />
            <Route path="/home/editarCursos" element={<EditCourses />} />
            <Route path="/home/notificacoes" element={<Notifications/>} />
            <Route path="/testing" element={<Testing />} /> {/* testing page */}
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default RoutesApp;