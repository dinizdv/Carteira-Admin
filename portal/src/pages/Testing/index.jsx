import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testing = () => {

    axios.get('https://api-controle-acesso-latest.onrender.com/usuario/1', {
        headers: {
           'Accept-Encoding': 'gzip, deflate, br'
        }
       })
       .then(response => {
        console.log(response.data);
       })
       .catch(error => {
        console.error('Error fetching data:', error);
       });
          

 const [response, setResponse] = useState(null);

 useEffect(() => {
    fetchData();
 }, []);

 const fetchData = async () => {    
    try {
      // Ajuste a URL conforme necessário
      const apiUrl = 'https://api-controle-acesso-latest.onrender.com/usuario/1';

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
          <h3 className="text-primary">Resposta:</h3>
          <pre className="text-light">{JSON.stringify(response, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-light">Carregando...</p>
      )}
    </div>
 );
};

export default Testing;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Testing = () => {
//  const [response, setResponse] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);

//  useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const apiUrl = 'https://api-controle-acesso-latest.onrender.com/usuario/1';
//         const response = await axios.get(apiUrl, {
//           headers: {
//             'Accept-Encoding': 'gzip, deflate, br'
//           }
//         });
//         setResponse(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//  }, []);

//  return (
//     <div>
//       <h1 className="text-light">Testing page</h1>
//       {loading && <p className="text-light">Carregando...</p>}
//       {error && <p className="text-danger">Erro ao carregar os dados: {error}</p>}
//       {response && (
//         <div>
//           <h3 className="text-primary">Resposta:</h3>
//           <pre className="text-light">{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//  );
// };

// export default Testing;
