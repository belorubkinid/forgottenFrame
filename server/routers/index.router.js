/* eslint-disable no-console */
/* eslint-disable camelcase */
const router = require('express').Router();
const { Played_group, sequelize } = require('../database/models');

router.get('/', async (req, res) => {
  try {
    if (req.session.uid) {
      const playedGamesCount = await Played_group.findOne({
        raw: true,
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'count'],
        ],
        where: {
          player_id: req.session.uid,
        },
      });
      return res.json({
        message: 'session',
        nickname: req.session.nickname,
        playedGamesCount: playedGamesCount.count,
      });
    }
    return res.json({ message: 'no session' });
  } catch (error) {
    return console.error(error);
  }
});

module.exports = router;
