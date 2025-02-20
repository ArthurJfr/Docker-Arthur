# 📚 Application de Gestion de Livres

🧑‍💻 Arthur JAFFRO 3BCI - 2025 Cours Docker


Une application web complète pour gérer une bibliothèque de livres, construite avec Node.js, Express, MySQL et une interface utilisateur en HTML/CSS/JavaScript.

## ⚠️ Prérequis 

- Docker et Docker Compose
- Node.js v14+ (pour le développement local)
- MySQL 8+ (pour le développement local)

## 📡 Communication entre les conteneurs

 - PORT 3000 : API, internal avec le backend
 - PORT 8080 : FRONTEND, external avec le frontend

## 📂 Structure du Projet

- `node-apibooks/`: Dossier pour le serveur Node.js
- `frontendbooks/`: Dossier pour l'interface utilisateur
- `docker-compose.yml`: Fichier de configuration Docker Compose
- `README.md`: Fichier de documentation
- `db-init/init.sql`: Fichier de création de la table dans la base et insertion des données initiales


## 📦 Installation

### 🔍 Étape 1 : Cloner le Projet

```bash
git clone https://github.com/ArthurJfr/Docker-Arthur.git
cd Docker-Arthur
```

### 🚀 Étape 2 : Démarrer les Conteneurs Docker

```bash
docker-compose up -d    
```

### 🌐 Étape 3 : Accéder à l'Application

- Ouvrez votre navigateur et accédez à `http://localhost:8080`
- Vous devriez voir la page d'accueil de l'application


## 📝 Fonctionnalités

### ✅ Ajout de Livres

- Ouvrez le formulaire d'ajout de livres
- Remplissez les champs et cliquez sur "Ajouter"
- Le livre sera ajouté à la base de données et apparaîtra dans la liste

### 🔄 Modification de Livres

- Cliquez sur le bouton "Modifier" pour un livre
- Remplissez les champs et cliquez sur "Enregistrer"    

### 🗑️ Suppression de Livres

- Cliquez sur le bouton "Supprimer" pour un livre
- Le livre sera supprimé de la base de données


## 🔧    Technologies Utilisées

- Node.js
- Express
- MySQL
- HTML/CSS/JavaScript
