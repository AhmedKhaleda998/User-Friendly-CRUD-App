const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const PORT = 5200;
const DATA_FILE = './data/persons.json';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/persons', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        const persons = JSON.parse(data);
        res.render('display-persons', { persons });
    });
});

app.get('/persons/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        const persons = JSON.parse(data);
        const person = persons.find(p => p.id === id);
        if (!person) {
            res.status(404).render('something-went-wrong', { message: `Person with ID ${id} not found` });
        } else {
            res.render('person', { person });
        }
    });
});

app.get('/add-person', (req, res) => {
    res.render('add-person', { pageTitle: 'Add Person', editing: false });
});

app.post('/persons', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const age = req.body.age;
    const person = { id: uuid.v4(), name, email, gender, age };
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        const persons = JSON.parse(data);
        persons.push(person);
        fs.writeFile(DATA_FILE, JSON.stringify(persons), err => {
            if (err) throw err;
            res.redirect('/persons');
        });
    });
});

app.get('/get-update-person/:id', (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/')
    }
    const id = req.params.id;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        const persons = JSON.parse(data);
        const person = persons.find(p => p.id === id);
        if (!person) {
            res.status(404).render('something-went-wrong', { message: `Person with ID ${id} not found` });
        } else {
            res.render('add-person', {
                pageTitle: 'Edit Product',
                editing: editMode,
                person
            });
        }
    });
})

app.post('/edit-person', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const age = req.body.age;
    const person = { name, email, gender, age };
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        let persons = JSON.parse(data);
        const index = persons.findIndex(p => p.id === id);
        if (index === -1) {
            res.status(404).render('something-went-wrong', { message: `Person with ID ${id} not found` });
        } else {
            persons[index] = { ...persons[index], ...person };
            fs.writeFile(DATA_FILE, JSON.stringify(persons), err => {
                if (err) throw err;
                res.redirect(`/persons/${id}`);
            });
        }
    });
});

app.post('/delete-person', (req, res) => {
    const id = req.body.id;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) throw err;
        let persons = JSON.parse(data);
        persons = persons.filter(p => p.id !== id);
        fs.writeFile(DATA_FILE, JSON.stringify(persons), err => {
            if (err) throw err;
            res.redirect('/persons');
        });
    });
});

app.use((req, res) => {
    res.status(404).render('404', { message: `Page not found` });
});

app.listen(PORT, console.log(`Running on port ${PORT}`));
