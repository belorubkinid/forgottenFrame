/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable arrow-body-style */
const { Op } = require('sequelize');
const { Movie, Relation } = require('../../database/models');
const { createArrayOfRandomNumbers, createRandomNonZeroNumber } = require('../helpers/createRundomNumber.helper');

const wrongAnswersCount = 3;
const groupsCountInDatabase = 11;

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

async function getMovieIdWithRelation(movieId) {
  try {
    const movieRelations = await Relation.findAll({
      raw: true,
      where: {
        rel1_movie_id: movieId,
      },
    });
    if (movieRelations) {
      return movieRelations.reduce((acc, item) => [...acc, item.rel2_movie_id], []);
    }
    return null;
  } catch (error) {
    return console.error(error);
  }
}

async function getRandomMoviesId(moviesId) {
  try {
    const arrayOfRandomNumbers = createArrayOfRandomNumbers(moviesId.length - 1, 3);
    const arrayOfRandomMoviesId = moviesId.filter((id, index) => {
      if (arrayOfRandomNumbers.includes(index)) return id;
      return null;
    });
    const moviesIdForGame = await Movie.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        id: {
          [Op.or]: arrayOfRandomMoviesId,
        },
      },
    });
    return moviesIdForGame;
  } catch (error) {
    return console.error(error);
  }
}

async function getMoviesTitle(moviesId) {
  try {
    const moviesTitleForGame = [];
    const moviesTitle = await Movie.findAll({
      raw: true,
      attributes: ['title'],
      where: {
        id: {
          [Op.or]: moviesId,
        },
      },
    });
    moviesTitle.forEach((movie) => moviesTitleForGame.push(movie.title));
    return moviesTitleForGame;
  } catch (error) {
    return console.error(error);
  }
}

async function getAnswersWithRelations(movie) {
  try {
    const moviesId = [];
    const moviesIdForAnswersFromRelation = await getMovieIdWithRelation(movie.id);
    if (moviesIdForAnswersFromRelation) {
      if (moviesIdForAnswersFromRelation.length > 3) {
        const moviesIdForGame = await getRandomMoviesId(moviesIdForAnswersFromRelation);
        moviesIdForGame.forEach((item) => moviesId.push(item.id));
      } else {
        moviesIdForAnswersFromRelation.forEach((id) => moviesId.push(id));
      }
    }
    return moviesId;
  } catch (error) {
    return console.error(error);
  }
}

async function getMoviesIdWithDirector(movie) {
  try {
    const moviesWithDirector = await Movie.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        director: movie.director,
      },
    });
    if (moviesWithDirector) return moviesWithDirector.reduce((acc, item) => [...acc, item.id], []);
    return null;
  } catch (error) {
    return console.error(error);
  }
}

async function getAnswersWithDirector(movie) {
  try {
    const moviesId = [];
    const moviesIdForAnswersFromRelation = await getMoviesIdWithDirector(movie);
    if (moviesIdForAnswersFromRelation) {
      if (moviesIdForAnswersFromRelation.length > 3) {
        const moviesIdForGame = await getRandomMoviesId(moviesIdForAnswersFromRelation);
        moviesIdForGame.forEach((item) => moviesId.push(item.id));
      } else {
        moviesIdForAnswersFromRelation.forEach((id) => moviesId.push(id));
      }
    }
    return moviesId;
  } catch (error) {
    return console.error(error);
  }
}

async function getMoviesIdWithActor(movie, actorNumber) {
  try {
    const actor = `actor${actorNumber}`;
    const moviesWithActor = await Movie.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        [Op.or]: [
          { actor1: movie[actor] },
          { actor2: movie[actor] },
        ],
      },
    });
    if (moviesWithActor) return moviesWithActor.reduce((acc, item) => [...acc, item.id], []);
    return null;
  } catch (error) {
    return console.error(error);
  }
}

async function getAnswersWithActor1(movie) {
  try {
    const moviesId = [];
    const moviesIdForAnswersFromRelation = await getMoviesIdWithActor(movie, 1);
    if (moviesIdForAnswersFromRelation) {
      if (moviesIdForAnswersFromRelation.length > 3) {
        const moviesIdForGame = await getRandomMoviesId(moviesIdForAnswersFromRelation);
        moviesIdForGame.forEach((item) => moviesId.push(item.id));
      } else {
        moviesIdForAnswersFromRelation.forEach((id) => moviesId.push(id));
      }
    }
    return moviesId;
  } catch (error) {
    return console.error(error);
  }
}

async function getAnswersWithActor2(movie) {
  try {
    const moviesId = [];
    const moviesIdForAnswersFromRelation = await getMoviesIdWithActor(movie, 2);
    if (moviesIdForAnswersFromRelation) {
      if (moviesIdForAnswersFromRelation.length > 3) {
        const moviesIdForGame = await getRandomMoviesId(moviesIdForAnswersFromRelation);
        moviesIdForGame.forEach((item) => moviesId.push(item.id));
      } else {
        moviesIdForAnswersFromRelation.forEach((id) => moviesId.push(id));
      }
    }
    return moviesId;
  } catch (error) {
    return console.error(error);
  }
}

async function getMoviesIdWithGenre(movie) {
  try {
    const moviesWithGenre = await Movie.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        genre: movie.genre,
      },
    });
    if (moviesWithGenre) return moviesWithGenre.reduce((acc, item) => [...acc, item.id], []);
    return null;
  } catch (error) {
    return console.error(error);
  }
}

async function getAnswersWithGenre(movie) {
  try {
    const moviesId = [];
    const moviesIdForAnswersFromRelation = await getMoviesIdWithGenre(movie);
    if (moviesIdForAnswersFromRelation) {
      if (moviesIdForAnswersFromRelation.length > 3) {
        const moviesIdForGame = await getRandomMoviesId(moviesIdForAnswersFromRelation);
        moviesIdForGame.forEach((item) => moviesId.push(item.id));
      } else {
        moviesIdForAnswersFromRelation.forEach((id) => moviesId.push(id));
      }
    }
    return moviesId;
  } catch (error) {
    return console.error(error);
  }
}

async function getRandomAnswer() {
  try {
    const moviesId = [];
    const randomMoviesId = [];
    const randomGroup = createRandomNonZeroNumber(groupsCountInDatabase);
    const randomMoviesIdForAnswers = await Movie.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        group: randomGroup,
      },
    });
    randomMoviesIdForAnswers.forEach((item) => randomMoviesId.push(item.id));
    const moviesIdForGame = await getRandomMoviesId(randomMoviesId);
    moviesIdForGame.forEach((item) => moviesId.push(item.id));
    return moviesId;
  } catch (error) {
    return console.error(error);
  }
}

async function getMoviesIdForAnswers(movie) {
  const moviesId = [movie.id];
  const functions = [
    getAnswersWithRelations,
    getAnswersWithActor1,
    getAnswersWithActor2,
    getAnswersWithDirector,
    getAnswersWithGenre,
    getRandomAnswer,
  ];
  for (let i = 0; moviesId.length <= wrongAnswersCount; i += 1) {
    const pickedMoviesId = await functions[i](movie);
    pickedMoviesId.forEach((id) => (!moviesId.includes(id) ? moviesId.push(id) : null));
  }
  const slicedMoviesId = moviesId.slice(0, 4);
  shuffleArray(slicedMoviesId);
  return slicedMoviesId;
}

async function answerPicker(movie) {
  try {
    const moviesIdForGame = await getMoviesIdForAnswers(movie);
    const moviesTitleForGame = await getMoviesTitle(moviesIdForGame);
    return moviesTitleForGame;
  } catch (error) {
    return console.error(error);
  }
}

module.exports = { answerPicker };
