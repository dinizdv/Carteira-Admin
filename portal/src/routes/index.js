import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />  {/* login page */}
            <Route path="/home" element={ <Home/> } />  {/* home page */}
        </Routes>
    )
}

export default RoutesApp