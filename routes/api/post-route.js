const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router
.route('/')
    .get( async (req, res) => {
        try{const postData = await Post.findAll({
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },{
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        res.json(postData.reverse())
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }

    })
    .post(withAuth, async (req, res) => {
        try { const postData =  await Post.create({
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            })
            res.json(postData)
        }   catch(err) {
                console.log(err);
                res.status(500).json(err);
            }
    });
router
.route('/:id')
    .get( async (req, res) => {
        try { const postData = await Post.findByPK({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        }
            catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
})
    .put( withAuth, async  (req, res) => {
        try { const postData = await Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
})
    .delete( withAuth, async (req, res) => {
        try {const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData)}
        catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;