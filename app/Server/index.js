require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./controller.js');
const PORT = 4000;
const c = require('./controller');
const session = require('express-session')
const massive = require('massive')
const bcrypt = require('bcrypt')
const saltRounds = 12
// const cors = require('cors')

const app = express();

app.use(bodyParser.json());
// app.use(cors())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    maxAge: (1000 * 60 * 60 * 24 * 14)
}));


massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
});


// Endpoints for creating, updating and deleting a Post
app.post('/api/addpost/', c.addPost)
app.put('/api/editpost/', c.editPost)
app.delete('/api/deletepost/:id', c.deletePost)
app.get('/api/getposts/:id', c.getPosts)
app.get('/api/posts/:user_id')
// get the UserInformation for a specific user ID
app.get('/api/user/:id', c.userInfo)

app.listen(PORT, () => console.log("You are running on port 4000"));
// -------------------------Bcrpt Registration & Login----------------------------//
app.post('/register', (req,res) => {
    const {username, email, first, last, password} = req.body
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
        app.get('db').create_user([username, email, first , last, hashedPassword]).then(newUser => {
            req.session.user = {username: newUser[0].username, user_id: newUser[0].user_id }
            const user = req.session.user
            res.status(200).json({ username })
        })
        //still Registers a user_id if duplicate but won't let you login with duplicate. Might fix later//
        .catch(error => {
            if (error.message.match(/duplicate key/)) {
                res.status(409).json({message: 'That user already exists'})
            }else {
                res.status(500).json({message: error})
            }
        })
    }).catch (err => res.status(500).json({message: 'Sorry, something has happened and we are working on fixing it now'}))
}
)
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    app.get('db').find_user([username]).then(data => {
        console.log("DDDDAAAAAATTTTTTAAAAAA",data)
        if (data.length) {
            bcrypt.compare(password, data[0].password).then(passwordsMatch => {
                if(passwordsMatch) {
                    req.session.user = { username,user_id:  data[0].user_id}
                    console.log('-----req.session.user',req.session.user)
                    res.json({ user: req.session.user })
                }else {
                    res.status(403).json({message: 'Invalid password'})
                }
            }).catch( err => {res.status(500).json({message: 'Sorry about that'})})
        }else {
            res.status(403).json({message: 'Unknown User'})
        }
    }).catch( err => {
        console.log('err',err)
        res.status(500).json({message: 'An error occured we can not disclose'})
    })
})

app.post('/logout', (req, res) => {
    console.log('------------Session', req.session)
    req.session.destroy();
    res.send()
})

app.get('/api/check-session', (req,res) => {
    res.send( 
        req.session.user
    )
})
