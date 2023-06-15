const router = require('express').Router();
const { getMoviesForGame } = require('../gameCreator/gameCreator');

router.get('/movies', async (req, res) => {
  try {
    const { uid } = req.session;
    getMoviesForGame(uid)
      .then((data) => Promise.all(data))
      .then((data) => res.json(data));
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
