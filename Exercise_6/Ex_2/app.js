const express = require('express');
const fs = require('fs')

const app = express();
const path = require('path')

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, 'db.json')
let articles = []

const readDataFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        articles = JSON.parse(data)
        console.log(articles)
    } catch (err) {
        console.error(err.message)
        articles = []
    }
}

const writeDataFile = (newData) => {
    try {
        fs.promises.writeFile(filePath, JSON.stringify(newData, null, 4))
    } catch (err) {
        console.error(err.message)
    }
}


readDataFile()

// GET all articles
app.get('/articles', async (req, res) => {
    res.status(200).end('Will send all a articles to you!');
});


// GET a article by ID
app.get('/articles/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const article = articles.find(a => a.id === id);

        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.status(200).end(`Will send details of the article: ${id} to you!`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new article
app.post('/articles', async (req, res) => {

    const newArticle = {
        id: articles.length > 0 ? articles[articles.length - 1].id + 1 : 1,
        title: req.body.title,
        date: req.body.date,
        text: req.body.text
    };

    articles.push(newArticle);
    await writeDataFile(articles)
    res.status(201).end(`Will add the article: ${newArticle.title} with details: ${newArticle.text} and ${newArticle.date}`);
});

app.post('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.status(403).end(`POST operation not supported on /articles/${id}`)
});

// PUT an article
app.put('/articles/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const index = articles.findIndex(article => article.id === id);
    if (index === -1) return res.status(404).send('Article not found');

    // Update article with new data from req.body
    articles[index] = {
        ...articles[index],
        ...req.body
    };
    await writeDataFile(articles)
    res.end(`Updating the article: ${id}
Will update the article: ${req.body.title} with details: ${req.body.text} and ${req.body.date}`);
});

app.put('/articles', (req, res) => {
    res.status(403).end(`PUT operation not supported on /articles`)
})

// DELETE an article
app.delete('/articles/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = articles.findIndex(article => article.id === id);
    if (index === -1) return res.status(404).send('Article not found');

    // Remove post from the array
    const deletedArticle = articles.splice(index, 1);
    await writeDataFile(articles)
    res.status(200).end(`Deleting articles ${id}`);
});

// DELETE all articles
app.delete('/articles', async (req, res) => {
    try {
        articles.length = 0;
        await writeDataFile(articles)

        res.status(200).end('Deleting all articles');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;