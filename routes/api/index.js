const router = require('express').Router();
const userRoute = require('./user-route');
const postRoute = require('./post-route');
const commentRoute = require('./comment-route');
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

module.exports = router;
