import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Token from '../Functions'; // Ajuste o caminho conforme necessário
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // before http status code
  const [token, setToken] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchData = async () => {
    const url = 'https://apicontroleacesso-1.onrender.com';
    const data = {
      "email": email, // user value
      "senha": password // user value
    };

    try {
      const response = await axios.post(url + '/login', data, {
        headers: {
           'Accept': '*/*',
           'Content-Type': 'application/json',
        }
      });

      if (response.status == 200) {
        console.log('Requisição bem-sucedida');
        navigate('/home', {replace: true}); // automatically link
        const tokenJWT = response.data.tokenJWT
        
        localStorage.setItem('keyToken', JSON.stringify(tokenJWT))
      } 
    } catch (error) {
      toast.error(`Erro ao fazer login: ${error}`)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    // verify if exists token
    const storedToken = localStorage.getItem('keyToken');
    if (storedToken) {
      setToken(storedToken);
      navigate('/home',  { replace: true })
    }
  }, []);

  return (
    <div className="container-login">
        <div className="img-radius bg-transparent border border-3 mx-auto mb-2" id="img-radius-userLogin">
            <i className="fa-solid fa-user"></i>
          </div>
      <h1 class="mb-1 text-center">Bem-vindo(a)!</h1>
      <p class="mb-3 text-center">Realize seu login para acessar a plataforma</p>
      <input type="email" placeholder="Insira seu e-mail..." className="mb-3 px-2" value={email} onChange={handleEmailChange} required/>
      <input type="password" placeholder="Insira sua senha..." className="mb-3 px-2" value={password} onChange={handlePasswordChange} required/>
      <Link to={"/home"} className="text-center fs-5" id="btn" onClick={handleSubmit}>Fazer Login</Link>
      <Token email={email} password={password} />
    </div>


  );
}