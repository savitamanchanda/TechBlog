const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });
    res.status(200).json(commentData);
} catch(err) {
  res.status(400).json(err)
}
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async(req, res) => {
  try {
    const updateComment = await Comment.update(req.body, {
      where: { id: req.params.id,
      user_id: req.session.user_id }
    });

    res.status(200).json(updateComment);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
