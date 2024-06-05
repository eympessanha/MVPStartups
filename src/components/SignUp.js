import React, { useState } from 'react';
import axios from 'axios';
//import './SignUp.css';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', { nome, email, senha });
      alert(response.data);
    } catch (error) {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div className="signup-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSignUp}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default SignUp;
