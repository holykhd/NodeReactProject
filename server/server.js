const express = require('express');
const port = 4000;
const app = express();
const bcrypt = require('bcrypt');
app.set('view-engine', 'ejs');
app.set('views', './server/views/')
app.use(express.urlencoded({extended: false}))

//임시
users = [];

// 첫페이지
app.get('/',(req, res) => {
    res.render('index.ejs', {name: 'Holy'})
})

// 로그인 페이지
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// 로그인 처리
app.post('/login', (req, res) => {
    res.render('login.ejs')
})

// 회원가입페이지
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// 회원가입 처리
app.post('/register', async (req, res) => {
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const id = Date.now().toString();
        users.push({
            id: id,
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
console.log(users)
})

app.listen(port, (req, res) => {
    console.log(`server started port in ${port}`)
})