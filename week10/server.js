const express = require("express");
const cors = require("cors");

const Books = require("./booksSchema");
const connectDB = require("./MongoDBConnect");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is default");
});

// 1) Display all books
app.get("/allbooks", async (req, res) => {
  try {
    const d = await Books.find();
    return res.json(d);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch books", details: err.message });
  }
});

// 2) Get a single book by id
app.get("/getbook/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const book = await Books.findById(id);

    if (!book) return res.status(404).json({ error: "Book not found" });

    return res.json(book);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch book", details: err.message });
  }
});

// 3) Add a book
app.post("/addbooks", async (req, res) => {
  try {
    console.log("Ref", req.body);
    let newbook = new Books(req.body);
    const saved = await newbook.save();
    return res.status(200).json({ books: "book added successfully", book: saved });
  } catch (err) {
    return res.status(400).send("adding new book failed");
  }
});

// 4) Update a book
app.post("/updatebook/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const update = {
      booktitle: req.body.booktitle,
      PubYear: req.body.PubYear,
      author: req.body.author,
      Topic: req.body.Topic,
      formate: req.body.formate
    };

    console.log("Update request:", { id, update });

    const updatedBook = await Books.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Failed to update book", details: err.message });
  }
});

// 5) Delete a book
app.post("/deleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting book:", id);

    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) return res.status(404).json({ error: "Book not found" });

    return res.status(200).send("Book Deleted");
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Failed to delete book", details: err.message });
  }
});

// Start after DB connects
(async () => {
  await connectDB();
  app.listen(5000, () => console.log("✅ Server running on port 5000"));
})();
