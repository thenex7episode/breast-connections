module.exports = {
    sendMessage: (req, res) => {
        console.log('in add Message')
        req.app.get('db').sendMessage([req.session.user.username, req.body.body, req.body.receiver, req.session.user.user_id, req.body.receiver_id, req.body.chat_id]).then(data => {
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
    },
    getMessages: (req, res) => {
        req.app.get('db').getMessages(req.params.chat_id).then(data => {
            res.status(200).send(data)
        })
    }
}