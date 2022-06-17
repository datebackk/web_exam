const express = require('express');
const axios = require("axios");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then((result) => {
            res.render('index', {currenciesNames: Object.keys(result.data.Valute), currency: result.data.Valute});
        });
});

app.listen(8085);
