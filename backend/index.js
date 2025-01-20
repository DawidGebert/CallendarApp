require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
});

app.listen(5000, () => {console.log('Server is running on port 5000')});