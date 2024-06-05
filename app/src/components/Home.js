import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Home.css';

function Home() {
  const [ingredientes, setIngredientes] = useState('');
  const [tempo, setTempo] = useState('');
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const response = await fetch('/path-to-recipes.txt');
    const data = await response.text();
    const allRecipes = data.split('\n').map(recipe => {
      const [nome, descricao, ingredientes, modo_de_preparo, tempo_de_preparo] = recipe.split(',');
      return { nome, descricao, ingredientes, modo_de_preparo, tempo_de_preparo };
    });

    const filteredRecipes = allRecipes.filter(recipe =>
      recipe.ingredientes.includes(ingredientes) && recipe.tempo_de_preparo <= tempo
    );

    setReceitas(filteredRecipes);
  };

  return (
    <div className="home-container">
      <h1>Buscar Receitas</h1>
      <div className="filter-container">
        <label>Ingredientes:</label>
        <input type="text" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
        <label>Tempo de Preparo (minutos):</label>
        <input type="number" value={tempo} onChange={(e) => setTempo(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="recipes-container">
        {receitas.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.nome}</h2>
            <p>{recipe.descricao}</p>
            <p>Ingredientes: {recipe.ingredientes}</p>
            <p>Modo de Preparo: {recipe.modo_de_preparo}</p>
            <p>Tempo de Preparo: {recipe.tempo_de_preparo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
