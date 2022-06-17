const express = require('express');
const bodyParser = require("express");
const Sequelize = require('sequelize');
const axios = require("axios");

const app = express();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Oil = sequelize.define('oil', { name: Sequelize.TEXT, data: Sequelize.TEXT, date: Sequelize.INTEGER });

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
  });

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('views/index.ejs', {root: __dirname});
});

app.get('/getOil/:brand', (req, res) => {
    console.log(req.params.brand);

    Oil.findOne({where: {name: req.params.brand, date: new Date().getDate()}}).then((oil) => {
        if (oil) {
            res.send(JSON.parse(oil.data));

            return;
        }

        axios.get(`https://maanimo.ua/wp-json/exchange/v1/daily/chart?type=oil&base=USD&code=${req.params.brand.toUpperCase()}&mean=1&lang=ru`)
            .then((result) => {
                Oil.create({name: req.params.brand, data: JSON.stringify(result.data), date: new Date().getDate()});
                res.send(result.data);
            });
    });
});

app.listen(8085);
