const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Set port info for heroku via process.env or fallback to 3001
const PORT = process.env.PORT || 3001;

// Initiallize express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup additional routing for requests to /api
app.use('/api', api);

// Serve static assets from directory named "public"
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// GET Route for wildcard
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
