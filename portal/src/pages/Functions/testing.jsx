const fetchData = async () => {
  try {
     const apiUrl = 'https://apicontroleacesso-1.onrender.com/usuario';
     const response = await axios.get(apiUrl);
     const userData = {
       cpf: response.data.cpf,
       email: response.data.email,
       senha: response.data.senha,
     };
     setUsers([userData]); // Atualiza o estado com os dados do usuário
  } catch (error) {
     console.error('Error fetching data:', error);
  }
 };

 return (
  <div>
     {users.length > 0 ? (
       <div>
         <h3>Informações do Usuário:</h3>
         <ul>
           {users.map(user => (
             <li key={user.cpf}>
               <p>CPF: {user.cpf}</p>
               <p>Email: {user.email}</p>
               <p>Senha: {user.senha}</p>
             </li>
           ))}
         </ul>
       </div>
     ) : (
       <p>Carregando...</p>
     )}
  </div>
 );
 