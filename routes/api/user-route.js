const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
let userData;
router
.route('/')
.get( async (req, res) => {
    try{userData = await User.findAll({
        attributes: { exclude: ['[password'] }
    })
    .then(dbUserData => res.json(dbUserData))}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
})
.post( async (req, res) => {
    try {userData = await User.create({
        username: req.body.username,
        password: req.body.password
    })

    .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

router
.route('/:id')
.get( async (req, res) => {
    try { userData = await User.findByPK({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at'
                ]
            },

            {
                model: Comment,
                attributes: ['id', 'content', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
})
.put( async (req, res) => {
    try{ userData = await User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }

})
.delete( async (req, res) => {
    try {userData = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});


router.post('/login', async (req, res) => {
    try { userData = await User.findByPK({
            where: {
                username: req.body.username
            }
        }).then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }
            const validPassword = userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {

                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});





module.exports = router;