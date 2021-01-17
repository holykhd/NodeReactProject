const express = require('express');
const port = 4000;
const app = express();
app.set('view-engine', 'ejs');
app.set('views', './server/views/')

app.get('/',(req, res) => {
    res.render('index.ejs', {name: 'Holy'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.listen(port, (req, res) => {
    console.log(`server started port in ${port}`)
})