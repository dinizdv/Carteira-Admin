import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testing = () => {
 const [response, setResponse] = useState(null);

 useEffect(() => {
    fetchData();
 }, []);

 const fetchData = async () => {
    try {
      const apiUrl = 'https://api-controle-acesso-latest.onrender.com/usuario?page=0&size=1&sort=string';

      const response = await axios.get(apiUrl);
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
 };

 return (
    <div>
        <h1 className="text-light">Testing page</h1>
      {response ? (
        <div>
          <h3 class="text-primary">Resposta:</h3>
          <pre class="text-light">{JSON.stringify(response, null, 2)}</pre>
        </div>
      ) : (
        <p class="text-light">Carregando...</p>
      )}
    </div>
 );
};

export default Testing;
