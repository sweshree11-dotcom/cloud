const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "Harry Potter" },
    { id: 2, title: "Twilight" }
];

// GET - Display all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// POST - Add a book
app.post('/api/books', (req, res) => {
    books.push(req.body);
    res.send("Book added successfully");
});

// PUT - Update a book
app.put('/api/books/:id', (req, res) => {
    let book = books.find(b => b.id == req.params.id);

    if (book) {
        book.title = req.body.title;
        res.send("Book updated successfully");
    } else {
        res.status(404).send("Book not found");
    }
});

// DELETE - Delete a book
app.delete('/api/books/:id', (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.send("Book deleted successfully");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// GET - Display one book by ID
app.get('/api/books/:id', (req, res) => {
    let book = books.find(b => b.id == req.params.id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

npm init -y
npm install express
