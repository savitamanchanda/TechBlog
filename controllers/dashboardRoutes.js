const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      
      const blogData = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comment,
            attributes: ['id', 'text', 'blog_id', 'user_id'],
          }
        ],
      });
  
     
      const posts = blogData.map((posts) => posts.get({ plain: true }));
  
      
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/new', (req,res) => {
    res.render('addPost');
});

module.exports = router;