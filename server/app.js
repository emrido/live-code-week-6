require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/classic_fox_live_code_1', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
    console.log('App listening on port: ' + port);
});