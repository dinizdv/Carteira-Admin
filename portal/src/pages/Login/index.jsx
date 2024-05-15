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
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-circle d-flex mx-auto mb-1 text-light" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
      </svg>
      <h1 class="mb-1 text-center">Bem-vindo(a)!</h1>
      <p class="mb-3 text-center">Realize seu login para acessar a plataforma</p>
      <input type="email" placeholder="Insira seu e-mail..." className="mb-3 px-2" value={email} onChange={handleEmailChange} required/>
      <input type="password" placeholder="Insira sua senha..." className="mb-3 px-2" value={password} onChange={handlePasswordChange} required/>
      <Link to={"/Home"} className="text-center fs-5" id="btn" onClick={handleSubmit}>Fazer Login</Link>
      <Token email={email} password={password} />
    </div>
  );
}