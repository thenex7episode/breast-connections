module.exports = {
    sendMessage: (req, res) => {
        req.app.get('db').sendMessage([req.session.user.username, req.body.body, req.body.receiver]).then(data => {
            res.status(200).send(data)
        })
    },
    getUsernames: (req,res) => {
        req.app.get('db').getUsers().then(data => {
            res.status(200).send(data)
        })
    },
    getAllUserChats: (req, res) => {
        req.app.get('db').getAllUserChats(req.session.user.username).then(data => {
            res.status(200).send(data)
        })
    }
}