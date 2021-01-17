if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const port = 4000;
const auth = require('./common/auth');
const methodOverride = require('method-override');

const initializePassport = require('./common/passport-config')
initializePassport(passport,
        email => users.find(user => user.email === email),
        id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.set('views', './server/views/')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: 'mySecretCode',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요~~~~~')
})

// 첫페이지
app.get('/', auth.checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

// 로그인 페이지
app.get('/login', auth.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

// 로그인 처리
app.post('/login', auth.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// 로그아웃 처리
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})
// 회원가입페이지
app.get('/register', auth.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

// 회원가입 처리
app.post('/register', auth.checkNotAuthenticated, async (req, res) => {
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
})

app.listen(port, (req, res) => {
    console.log(`server started port in ${port}`)
})