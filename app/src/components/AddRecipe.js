import React, { useState } from 'react';
import axios from 'axios';
//import './AddRecipe.css';

function AddRecipe() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoDePreparo, setModoDePreparo] = useState('');
  const [tempoDePreparo, setTempoDePreparo] = useState('');

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/add-recipe', {
        nome,
        descricao,
        ingredientes,
        modoDePreparo,
        tempoDePreparo
      });
      alert(response.data);
    } catch (error) {
      alert('Erro ao adicionar receita');
    }
  };

  return (
    <div className="add-recipe-container">
      <h1>Adicionar Receita</h1>
      <form onSubmit={handleAddRecipe}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <label>Descrição:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <label>Ingredientes:</label>
        <input type="text" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} required />
        <label>Modo de Preparo:</label>
        <input type="text" value={modoDePreparo} onChange={(e) => setModoDePreparo(e.target.value)} required />
        <label>Tempo de Preparo (minutos):</label>
        <input type="number"></input></form></div>)
}

export default AddRecipe;