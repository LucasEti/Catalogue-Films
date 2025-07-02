# Catalogue de Films - Application Fullstack Cloud-Native

# Description
Cette application permet aux utilisateurs de :

    - Rechercher des films via une API publique (comme TMDB)
    - Ajouter des films à leur liste de favoris
    - Gérer leur compte (authentification JWT et sécurisée avec bcrypt)
    - Se deconnecter
    - Voir les détails d’un film en cliquant dessus
    - Pouvoir aller à la page oficielle du film (sur netflix par exemple) si l'API TMDB le référence (par exemple comme le film "à bout")

# Stack Technique 

    - Frontend : Angular
    - Backend : Node.js
    - Base de donnée : MongoDB
    - Déploiement : kubernetes pour un déploiement Cloud et Docker-compose pour un déploiement local



# Prérequis pour lancer en local : 

    - Node.js
    - Docker
    - Docker-compose

# Pour lancer en local :

    1- Clonner le repo git
    2- Ouvrir Docker Deskop
    2- Se déplacer à la racine du repo 
    3- Lancer la commande "docker-compose up --build"
    4- Se rendre sur l'application via l'URL : "http://localhost:8080/"

# Pour lancer l'application en passant pas Infomaniak :

    - Se rendre à l'url : "http://83.228.200.242/" 
    - Se connecter avec  : test@gmail.com et mot de passe : 0000