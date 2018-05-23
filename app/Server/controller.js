const session = require("express-session");

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
        // getting the tracker value from the Frontend
        const { post_id, tracker } = req.body;
        req.app.get('db').editPost([post_id,tracker]).then(data => {
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
            res.status(200).json({data: data})
        }).catch(error => console.log('error in getPosts', error))
    },
    userInfo: (req, res) => {
        req.app.get('db').getUser(req.params.id).then(data => {
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
    }
    // getUserPosts: (req,res) => {
    //     req.app.get('db').join(req.params.user_id).then(posts => {
    //         res.json({posts: posts})
    //     }).catch(err => {console.log('WEEEWOOOWEEEWOOO', err)})
    // }
}