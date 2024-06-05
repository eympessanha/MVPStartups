const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const usersFile = path.join(__dirname, 'users.txt');
const recipesFile = path.join(__dirname, 'recipes.txt');

// Endpoint para login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const users = fs.readFileSync(usersFile, 'utf8').split('\n').filter(Boolean);
  const user = users.find(user => {
    const [storedName, storedEmail, storedSenha] = user.split(',');
    return storedEmail === email && storedSenha === senha;
  });
  if (user) {
    res.status(200).send('Login bem-sucedido');
  } else {
    res.status(401).send('Credenciais inválidas');
  }
});

// Endpoint para cadastro
app.post('/signup', (req, res) => {
  const { nome, email, senha } = req.body;
  const users = fs.readFileSync(usersFile, 'utf8').split('\n').filter(Boolean);
  if (users.some(user => user.split(',')[1] === email)) {
    res.status(400).send('Email já cadastrado');
  } else {
    fs.appendFileSync(usersFile, `${nome},${email},${senha}\n`);
    res.status(201).send('Usuário cadastrado com sucesso');
  }
});

// Endpoint para adicionar receitas
app.post('/add-recipe', (req, res) => {
  const { nome, descricao, ingredientes, modoDePreparo, tempoDePreparo } = req.body;
  fs.appendFileSync(recipesFile, `${nome},${descricao},${ingredientes},${modoDePreparo},${tempoDePreparo}\n`);
  res.status(201).send('Receita adicionada com sucesso');
});

// Endpoint para buscar receitas
app.post('/search-recipes', (req, res) => {
  const { ingredientes } = req.body;
  const recipes = fs.readFileSync(recipesFile, 'utf8').split('\n').filter(Boolean);
  const filteredRecipes = recipes.filter(recipe => {
    const [nome, descricao, recIngredientes, modoDePreparo, tempoDePreparo] = recipe.split(',');
    return ingredientes.every(ing => recIngredientes.includes(ing));
  });
  res.status(200).json(filteredRecipes);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
