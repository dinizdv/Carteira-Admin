import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testing = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = 'https://api-controle-acesso-latest.onrender.com/usuario/1';
      const response = await axios.get(apiUrl);
      const userData = response.data.content.map(user => ({
        id: user.id,
        nome: user.nome,
        cpf: user.cpf,
        email: user.email
      }));
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {users.length > 0 ? (
        <div>
          <h3>Informações dos Usuários:</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <p>ID: {user.id}</p>
                <p>Nome: {user.nome}</p>
                <p>CPF: {user.cpf}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Testing;
