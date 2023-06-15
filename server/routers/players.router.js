/* eslint-disable camelcase */
/* eslint-disable no-console */
const router = require('express').Router();
const sequelize = require('sequelize');
const { Player, Played_group } = require('../database/models');

router.get('/rating', async (req, res) => {
  try {
    const rating = await Player.findAll({
      raw: true,
      attributes: [
        'id', 'nickname', 'rating',
        [sequelize.fn('COUNT', sequelize.col('player_id')), 'gamesCount'],
      ],
      group: ['id'],
      include: [{
        model: Played_group,
        attributes: [],
      }],
      order: [
        ['rating', 'DESC'],
      ],
    });
    return res.json(rating);
  } catch (error) {
    return console.log(error);
  }
})
  .get('/played_games_count', async (req, res) => {
    try {
      const { uid } = req.session;
      const playedGamesCount = await Played_group.findOne({
        raw: true,
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'playedGamesCount'],
        ],
        where: {
          player_id: uid,
        },
      });
      return res.json(playedGamesCount);
    } catch (error) {
      return res.json({ error: error?.errors[0]?.message });
    }
  })
  .post('/rating', async (req, res) => {
    try {
      const { rating } = req.body;
      const currentRating = await Player.findOne({ where: { id: req.session.uid } });
      const updatedRating = currentRating.rating + rating;
      await Player.update({ rating: updatedRating }, { where: { id: req.session.uid } });
      return res.json({ message: 'rating successfully recorded' });
    } catch (error) {
      return res.json({ error: error?.errors[0]?.message });
    }
  });

module.exports = router;
