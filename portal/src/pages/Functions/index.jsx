import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://apicontroleacesso-1.onrender.com';

const fetchData = async () => {
  const data = {
    "email": "lucas.fonseca.sesisenaisp@gmail.com",
    "senha": "12345"
  };

  try {
    const response = await axios.post(url + '/login', data, {
      headers: {
         'Accept': '*/*',
         'Content-Type': 'application/json',
      }
     });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

const Testing = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
    .then(data => {
        console.log(data);
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
      {loading && <p className="text-light"></p>}
      {error && <p className="text-danger">Erro ao carregar os dados: {error}</p>}
    </div>
  );
};

export { fetchData }; 
export default Testing;
