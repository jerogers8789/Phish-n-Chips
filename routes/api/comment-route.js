const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
router
.route('/')
    .get( async (req, res) => {
        try {const commentData = await Comment.findAll({})
        res.json(commentData)}
        catch(err){
        console.log(err);
        res.status(500).json(err);
    }})
    .post( withAuth, async (req, res) => {
        try {
        if (req.session) {
            Comment.create({
                    comment_text: req.body.comment_text,
                    post_id: req.body.post_id,
                    user_id: req.session.user_id,
                })
                .then(commentData => res.json(commentData))
        };
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    };
})

router
    .route('/:id')
    .get( async (req, res) => {
    try {const commentData = await Comment.findByPK({
            where: {
                id: req.params.id
            }
        });
        res.json(commentData)}
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }})
    .put(withAuth, async (req, res) => {
        try { const commentData = await Comment.update({
            comment_text: req.body.comment_text
        }, {
            where: {
                id: req.params.id
            }
        }).then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(commentData);
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
    })
    .delete(withAuth, async (req, res) => {
        try {const commentData = await Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentData);
    })} catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;
