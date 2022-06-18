const express = require('express');
const Sequelize = require('sequelize');

const app = express();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const User = sequelize.define('users', { login: Sequelize.TEXT, password: Sequelize.TEXT });

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
  });

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));


app.get('/server', (req, res) => {
    res.render('index');
});

app.post('/server', (req, res) => {
    User.findOne({where: {login: req.body.login}})
        .then((user) => {
            if (!user) {
                User.create({login: req.body.login, password: req.body.password});
                res.send('fail');
            }

            if (user.password === req.body.password) {
                res.send('success');
            }

            res.send('fail');
    });
})

app.listen(8085);
