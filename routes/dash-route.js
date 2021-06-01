const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, async  (req, res) => {
    try { const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});
router.route('edit/:id')
.get(withAuth, async (req, res) => {
    try{const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
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
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = postData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});
router
.route('/new')
.get((req, res) => {
    try {
    res.render('new-post');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});
module.exports = router;
