const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoute = require('./homepage-route.js');
const dashRoute = require('./dash-route.js');
router.use('/api', apiRoutes);
router.use('/', homepageRoute);
router.use('/dashboard', dashRoute);
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;