const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes=require('./routes/user');
const favorisRoutes = require('./routes/favoris');

const app   = express();

mongoose.connect('mongodb+srv://DevUser:L7v3RxZ1pT@cluster0.oovcqtz.mongodb.net/CatalogueFilm?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.error('Erreur de connexion :', err));


app.use(express.json()); 


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
// Routes liées à l'authentification (inscription, connexion, etc.)
// Toutes les requêtes commençant par /api/auth seront dirigées vers userRoutes
app.use('/api/auth',userRoutes);
// Routes pour gérer les favoris des utilisateurs
// Toutes les requêtes commençant par /api/favoris seront dirigées vers favorisRoutes
app.use('/api/favoris', favorisRoutes);

module.exports = app;


