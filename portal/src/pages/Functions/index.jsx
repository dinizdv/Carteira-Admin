import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://apicontroleacesso-1.onrender.com';

// Mova a definição da função fetchData para fora do componente
const fetchData = async () => {
  const data = {
    "email": "lucas.fonseca.sesisenaisp@gmail.com",
    "senha": "123"
  };

  try {
    const response = await axios.post(url + '/login', data, {
      headers: {
         'Accept': '*/*',
         'Content-Type': 'application/json',
      }
     });

    return response.data; // Retorna os dados
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Lança o erro para que ele possa ser tratado pelo chamador
  }
};

const Testing = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
    .then(data => {
        console.log(data); // Aqui você pode usar os dados conforme necessário
      })
    .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })
    .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <p className="text-light">Carregando...</p>}
      {error && <p className="text-danger">Erro ao carregar os dados: {error}</p>}
    </div>
  );
};

export { fetchData }; // Exporta a função fetchData
export default Testing;
