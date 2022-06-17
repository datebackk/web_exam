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


app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));


app.get('/server', (req, res) => {
    res.sendFile('views/index.html', {root: __dirname});
});

app.post('/server', (req, res) => {
    User.findOrCreate({where: {login: req.body.login, password: req.body.password}}).then(([user, created]) => {
        if (created) {
            res.send('fail');

            return;
        }
        res.send('success');
    });
})

app.listen(8085);
