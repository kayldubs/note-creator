const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 3001;
const main = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(main, "notes.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/notes/:id", (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(main, "index.html"));
});

app.post("/notes", function(req, res) {
    const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const newNote = req.body;
    const uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}!`);
})