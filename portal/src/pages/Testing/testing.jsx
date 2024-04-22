import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testing = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = 'https://api-controle-acesso-latest.onrender.com/swagger-ui/index.html#/usuario-controller/getUsuarios';

      const response = await axios.get(apiUrl);
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {response ? (
        <div>
          <h3>Resposta:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Testing;