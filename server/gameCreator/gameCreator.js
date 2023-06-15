/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
const { Played_group, Movie } = require('../database/models');
const { answerPicker } = require('./answerPicker/answerPicker');
const { createRandomNumber } = require('./helpers/createRundomNumber.helper');

const groupsCountInDatabase = 11;

async function getRandomMovieGroup(groupsCount, playerId) {
  try {
    const playedGroups = await Played_group.findAll({
      raw: true,
      attributes: ['group'],
      where: { player_id: playerId },
    });

    const groupsNumbers = [];
    for (let i = 1; i <= groupsCount; i += 1) {
      groupsNumbers.push(i);
    }

    const groupsForPlaying = groupsNumbers.filter((item) => {
      return !playedGroups.find((element) => element.group === item) && item;
    });

    const randomMoviesGroup = groupsForPlaying[createRandomNumber(groupsForPlaying.length - 1)];
    await Played_group.create({ player_id: playerId, group: randomMoviesGroup });
    return randomMoviesGroup;
  } catch (error) {
    return console.error(error);
  }
}

async function getMoviesForGame(playerId) {
  try {
    const moviesGroup = await getRandomMovieGroup(groupsCountInDatabase, playerId);
    const movies = await Movie.findAll({
      raw: true,
      where: { group: moviesGroup },
    });

    const moviesForGame = movies.map(async (movie) => {
      const answers = await answerPicker(movie);
      return ({
        title: movie.title,
        answers,
        frame: movie.frame,
      });
    });
    return moviesForGame;
  } catch (error) {
    return console.error(error);
  }
}

module.exports = { getMoviesForGame };
