const API_URL = '/api';
let allBooks = []; // Pour stocker tous les livres

// Fonction pour charger les livres
async function loadBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        allBooks = await response.json();
        updateGenreFilter();
        displayBooks(allBooks);
    } catch (error) {
        console.error('Erreur lors du chargement des livres:', error);
    }
}

// Fonction pour mettre à jour le filtre des genres
function updateGenreFilter() {
    const genres = [...new Set(allBooks.map(book => book.genre))];
    const genreFilter = document.getElementById('genreFilter');
    
    // Vider les options existantes sauf la première (Tous les genres)
    while (genreFilter.options.length > 1) {
        genreFilter.remove(1);
    }
    
    // Ajouter les nouveaux genres
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Fonction pour afficher les livres
function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    const bookCount = document.getElementById('bookCount');
    
    booksList.innerHTML = '';
    bookCount.textContent = books.length;
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Auteur: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Description: ${book.description}</p>
            <div class="book-actions">
                <button onclick="editBook(${book.id})" class="edit-btn">Modifier</button>
                <button onclick="deleteBook(${book.id})" class="delete-btn">Supprimer</button>
            </div>
        `;
        booksList.appendChild(bookCard);
    });
}

// Gestion du formulaire d'ajout
document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        description: document.getElementById('description').value
    };

    try {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            document.getElementById('bookForm').reset();
            loadBooks();
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre:', error);
    }
});

// Fonction pour supprimer un livre
async function deleteBook(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        try {
            const response = await fetch(`${API_URL}/books/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadBooks();
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du livre:', error);
        }
    }
}

// Fonction pour éditer un livre
async function editBook(id) {
    try {
        const response = await fetch(`${API_URL}/books/${id}`);
        const book = await response.json();
        
        // Remplir le formulaire d'édition
        document.getElementById('editId').value = book.id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editGenre').value = book.genre;
        document.getElementById('editDescription').value = book.description;
        
        // Afficher le modal
        document.getElementById('editModal').style.display = 'block';
    } catch (error) {
        console.error('Erreur lors du chargement du livre:', error);
    }
}

// Fonction pour fermer le modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Gestion du formulaire d'édition
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const formData = {
        title: document.getElementById('editTitle').value,
        author: document.getElementById('editAuthor').value,
        genre: document.getElementById('editGenre').value,
        description: document.getElementById('editDescription').value
    };

    try {
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            closeEditModal();
            loadBooks();
        }
    } catch (error) {
        console.error('Erreur lors de la modification du livre:', error);
    }
});

// Fermer le modal si on clique en dehors
window.onclick = (event) => {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
};

// Écouteur d'événement pour le filtre
document.getElementById('genreFilter').addEventListener('change', (e) => {
    const selectedGenre = e.target.value;
    const filteredBooks = selectedGenre 
        ? allBooks.filter(book => book.genre === selectedGenre)
        : allBooks;
    displayBooks(filteredBooks);
});

// Fonction pour basculer le formulaire
function toggleForm() {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.toggle('collapsed');
}

// Initialiser le formulaire comme fermé au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    document.querySelector('.form-container').classList.add('collapsed');
});