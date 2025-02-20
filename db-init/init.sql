CREATE Table if not exists books (
    id serial primary key,
    title varchar(255) not null,
    description varchar(255) not null,
    genre varchar(255) not null,
    author varchar(255) not null
);

Insert into books (title, description, genre, author) values ('book 1', 'description 1', 'Roman', 'author 1');
Insert into books (title, description, genre, author) values ('book 2', 'description 2', 'Policier', 'author 2');
Insert into books (title, description, genre, author) values ('book 3', 'description 3', 'Science-fiction', 'author 3');
Insert into books (title, description, genre, author) values ('book 4', 'description 4', 'Fantasy', 'author 4');
Insert into books (title, description, genre, author) values ('book 5', 'description 5', 'Aventure', 'author 5');
Insert into books (title, description, genre, author) values ('book 6', 'description 6', 'Aventure', 'author 6');
Insert into books (title, description, genre, author) values ('book 7', 'description 7', 'Science-fiction', 'author 7');
Insert into books (title, description, genre, author) values ('book 8', 'description 8', 'Science-fiction', 'author 8');
Insert into books (title, description, genre, author) values ('book 9', 'description 9', 'Science-fiction', 'author 9');
Insert into books (title, description, genre, author) values ('book 10', 'description 10', 'Fantasy', 'author 10');
Insert into books (title, description, genre, author) values ('book 11', 'description 11', 'Science-fiction', 'author 11');
Insert into books (title, description, genre, author) values ('book 12', 'description 12', 'Science-fiction', 'author 12');
Insert into books (title, description, genre, author) values ('book 13', 'description 13', 'Science-fiction', 'author 13');
