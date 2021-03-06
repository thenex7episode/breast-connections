require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./controller.js');
const PORT = 4000;
const c = require('./controller');
const cc = require('./chatcontroller')
const session = require('express-session')
const massive = require('massive')
const bcrypt = require('bcrypt')
const saltRounds = 12
const cloudinary = require('cloudinary')
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
    db = database
});

// image Endpoints
app.post('/api/images/', (req, res) => {
    console.log(req.body.images)
    const images = req.body.images.map(el => {
        return {
            user_id: req.session.user.user_id,
            post_id: el.post_id,
            comment_id: null,
            date: new Date(),
            url: el.url
        }
    })
    console.log(images)
    db.images_bc.insert(images).then(response => {
        console.log(response)
        res.status(200).send('Image Upload Succesfull')
    })
})

app.get('/api/images/:id', (req, res) => {
    req.app.get('db').getImages(req.params.id).then(data => {
        res.status(200).send(data)
    })
})



// Endpoints for creating, updating and deleting a Post
app.post('/api/addpost/', c.addPost)
app.put('/api/addtracker/', c.addTracker)
app.put('/api/editpost/', c.editPost)
app.delete('/api/deletepost/:id', c.deletePost)
app.get('/api/getposts/:id', c.getPosts)
app.get('/api/posts/:id', c.userInfo)

// Endpoints for Like Checking
app.post('/api/likes/', c.addLike)
app.get('/api/likes/:post_id', c.getLikes)

// get the UserInformation for a specific user ID
app.get('/api/user/:username', c.userData)
app.put('/api/editprofile/:username', c.editProfile)
app.get('/api/posts/', c.getAllPosts)
app.delete('/api/deleteuser/:user_id', c.deleteUser)
app.get('/api/userposts/:user_id', c.getUserPosts)

// Comment Crud
app.post('/api/addcomment/', c.addComment)
app.put('/api/editcomment/', c.editComment)
app.delete('/api/deletecomment/:id/:post', c.deleteComment)
app.get('/api/getcomments/:id', c.getComments)

// search Endpoint
app.post('/api/googlesearch/', c.getGoogleResults)
app.post('/api/googlesearch/:token/', c.getGoogleNextPage)
app.post('/api/googleimage/:ref/', c.getGoogleImage)

// Experience Endpoints
app.post('/api/experience/', c.addExperience)
app.delete('/api/experience/:eid/:pid', c.deleteExperience)
app.get('/api/experiences/:id', c.getExperiences)

// Shop Page Endpoints
app.get('/api/products', c.getProducts)
app.post('/api/newproduct', c.newProduct)
app.delete('/api/delete/:id', c.deleteProduct)
app.put('/api/editproduct/:id', c.editProduct)
app.get('/api/product/:id', c.getProductById)
app.get('/api/seller/:username', c.getProductByUsername)

//Messages Endpoints
app.get('/api/chat/usernames', cc.getUsernames)
app.post('/api/chat/addmessage', cc.sendMessage)
app.get('/api/chat/chats/', cc.getAllUserChats)
app.get('/api/chat/messages/:chat_id', cc.getMessages)

app.listen(PORT, () => console.log("You are running on port 4000"));
// -------------------------Bcrpt Registration & Login----------------------------//
app.post('/register', (req,res) => {
    const {username, email, first, last, password} = req.body
    app.get('db').find_user([username]).then(data => {
        console.log('data:', data)
        if(data[0]) {
            res.status(500).json({message: 'User already exists'})
        }else {
            bcrypt.hash(password, saltRounds).then(hashedPassword => {
                app.get('db').create_user([username, email, first , last, hashedPassword]).then(newUser => {
                    req.session.user = {username: newUser[0].username, user_id: newUser[0].user_id, admin: newUser[0].admin, imageurl: newUser[0].imageurl }
                    const user = req.session.user
                    res.status(200).json({ username })
                })
        })

    }
        
    }).catch (err => res.status(500).json({message: 'WWWEEEWWOOOWWEEEWWOOOWWEEEWOOOO'}))
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    app.get('db').find_user([username]).then(data => {
        // console.log("DDDDAAAAAATTTTTTAAAAAA",data)
        // console.log('data.length:', data)
        if (data.length) {
            bcrypt.compare(password, data[0].password).then(passwordsMatch => {
                if(passwordsMatch) {
                    req.session.user = { username: data[0].username ,user_id:  data[0].user_id, first: data[0].first, last: data[0].last, imageurl: data[0].imageurl, admin: data[0].admin}
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
// --------------------------------------Cloudinary-----------------------------------//
app.get('/api/upload', (req,res) => {
    const timestamp = Math.round((new Date()).getTime()/ 1000);
    const api_secret = process.env.CLOUDINARY_SECRET_API;
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp}, api_secret)
    const payload = {
        signature: signature,
        timestamp: timestamp
    }
    console.log('payload--------', payload)
    res.json(payload)
})

