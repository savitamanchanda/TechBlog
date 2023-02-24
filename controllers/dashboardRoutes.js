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

  router.get('/blog/:id', async (req, res) => {
    try {
  
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
              model: Comment,
          }
        ],
      });
  
      const commentData = await Comment.findAll(req.params.id, {
      where: {
        blog_id: req.params.id
      },
      include: {
        model: User,
        attributes: ['name'],
      }
      })
  
      const posts = blogData.get({ plain: true });
      const comment = commentData.map(comments => comments.get({plain: true}))
      posts.comments = comment
  
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