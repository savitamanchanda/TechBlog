const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/blog', blogRoutes)

module.exports = router;