import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Testing from '../pages/Testing/testing'

function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />  {/* login page */}
            <Route path="/home" element={ <Home/> } />  {/* home page */}
            <Route path="/testing" element={ <Testing/> } />  {/* home page */}
        </Routes>
    )
}

export default RoutesApp