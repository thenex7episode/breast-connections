module.exports = {
    sendMessage: (req, res) => {
        req.app.get('db').sendMessage([req.session.user.username, req.body.body, req.body.receiver]).then(data => {
            res.status(200).send(data)
        })
    }
}