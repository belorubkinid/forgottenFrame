/* eslint-disable camelcase */
/* eslint-disable no-console */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Player, Played_group, sequelize } = require('../database/models');

router.post('/registration', async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, +process.env.SALT_ROUND);
    const newPlayer = await Player.create({
      nickname, email, password: hashedPass,
    });
    req.session.uid = newPlayer.id;
    req.session.nickname = newPlayer.nickname;
    const playedGamesCount = await Played_group.findOne({
      raw: true,
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('player_id')), 'count'],
      ],
      where: {
        player_id: newPlayer.id,
      },
    });
    return res.json({
      message: 'registration completed successfully',
      nickname: newPlayer.nickname,
      playedGamesCount: playedGamesCount.count,
    });
  } catch (error) {
    if (/Ключ "\(nickname\)/g.test(error?.parent?.detail)) {
      return res.json({ error: 'Данный никнейм уже зарегистрирован' });
    }
    if (/Ключ "\(email\)/g.test(error?.parent?.detail)) {
      return res.json({ error: 'Данный адрес электронной почты уже зарегистрирован' });
    }
    if (error?.errors[0]?.message === 'Validation isEmail on email failed') {
      return res.json({ error: 'Введен некорректный адрес электронной почты' });
    }
    if (error?.errors[0]?.message === 'nickname must be unique') {
      return res.json({ error: 'Данный никнейм уже зарегистрирован' });
    }
    if (error?.errors[0]?.message === 'email must be unique') {
      return res.json({ error: 'Данный адрес электронной почты уже зарегистрирован' });
    }
    if (error?.errors[0]?.message === 'Validation isEmail on email failed') {
      return res.json({ error: 'Введен некорректный адрес электронной почты' });
    }
    return console.error(error);
  }
});

router.post('/login', async (req, res) => {
  async function isValidPassword(passwordWithuotHashing, hashedPassword) {
    const result = await bcrypt.compare(passwordWithuotHashing, hashedPassword);
    return result;
  }
  try {
    const { email, password } = req.body;
    const player = await Player.findOne({
      where: {
        email,
      },
    });
    if (player === null) return res.json({ error: 'Неверный адрес электронной почты' });
    if (player && await isValidPassword(password, player.password)) {
      req.session.uid = player.id;
      req.session.nickname = player.nickname;
      const playedGamesCount = await Played_group.findOne({
        raw: true,
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('player_id')), 'count'],
        ],
        where: {
          player_id: player.id,
        },
      });
      return res.json({
        message: 'login completed successfully',
        nickname: player.nickname,
        playedGamesCount: playedGamesCount.count,
      });
    }
    return res.json({ error: 'Неверный пароль' });
  } catch (error) {
    return console.error(error);
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('uid');
    return res.json({ message: 'logout completed successfully' });
  } catch (error) {
    console.error(error);
    return res.json({ error: error?.errors[0]?.message });
  }
});

module.exports = router;
