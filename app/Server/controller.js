const session = require("express-session");
const axios = require('axios');

module.exports = {
    addPost: (req, res) => {
        // getting data from the frontend
        const { category, title, body } = req.body;
        // argument 4 has to be replaced with the user_id coming from the session
        // console.log(req.session.user)
        const post = [category, title, body, req.session.user.user_id];
        // console.log(body);
        req.app.get('db').addPost(post).then(data => {
            // console.log(data)
            res.status(200).json({data: data})
        }).catch(error => console.log('error in addPost', error))
    },
    editPost: (req, res) => {
        req.app.get('db').editPost([req.body.title, req.body.body, req.body.post_id]).then(data => {
            res.status(200).send(data)
        })
    },
    addTracker: (req, res) => {
        // getting the tracker value from the Frontend
        const { post_id, tracker } = req.body;
        req.app.get('db').addTracker([post_id,tracker]).then(data => {
            res.status(200).json({data: data});
        }).catch(error => console.log('error in editPost', error))
    },
    deletePost: (req, res) => {
        req.app.get('db').deletePost(req.params.id).then(data => {
            res.status(200).json({data: data})
        }).catch(error => console.log('error in deletePost', error))
    },
    getPosts: (req, res) => {
        req.app.get('db').getPostsForCategory(req.params.id).then(data => {
            // sort Posts from date
            let sortedPostssort = data.sort(function(a,b){
                return a.post_id - b.post_id
                });
            res.status(200).json({data: data})
        }).catch(error => console.log('error in getPosts', error))
    },
    userInfo: (req, res) => {
        console.log(req.params.id)
        req.app.get('db').getUser(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    userData: (req, res) => {
        req.app.get('db').find_user(req.params.username).then(data => {
            res.status(200).send(data)
        })
    },
    addComment: (req, res) => {
        const { body, post_id } = req.body
        req.app.get('db').addComment([body, req.session.user.user_id, post_id]).then(data => {
            res.status(200).send(data)
        })
    },
    editComment: (req, res) => {
        const { comment_id, body } = req.body;
        req.app.get('db').editComment([comment_id, body]).then(data => {
            res.status(200).send(data)
        })
    },
    deleteComment: (req, res) => {
        req.app.get('db').deleteComment([req.params.id, req.params.post]).then(data => {
            res.status(200).send(data)
        })
    },
    getComments: (req, res) => {
        req.app.get('db').getComments(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    getAllPosts: (req,res) => {
        req.app.get('db').getAllPosts().then(data => {
            res.status(200).send(data)
        })
    },
    getGoogleResults: (req, res) => {
        const { tags } = req.body  
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&type=${tags}&key=AIzaSyDMe9dzsNrtmkU1P7tD2r28Qt0ewJfgdY0`).then(data => {
            res.status(200).send(data.data)
        })
    }
    // getUserPosts: (req,res) => {
    //     req.app.get('db').join(req.params.user_id).then(posts => {
    //         res.json({posts: posts})
    //     }).catch(err => {console.log('WEEEWOOOWEEEWOOO', err)})
    // }
}