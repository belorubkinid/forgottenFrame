/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const { getMoviesFromAPI } = require('./apiRequestsFunctions/getMovies');
const { getMoviesRelations } = require('./apiRequestsFunctions/getMoviesRelations');
const { writeIdTitleGenreInDatabase } = require('./databaseWriters/writeIdTitleGenreInDatabase');
const { writeMoviesRelationsInDatabase } = require('./databaseWriters/writeMoviesRelationsInDatabase');
const { Movie, Relation } = require('../database/models');
const { getDirectorsAndActors } = require('./apiRequestsFunctions/getDirectorsAndActors');
const { writeDirectorActorsInDatabase } = require('./databaseWriters/writeDirectorActorsInDatabase');
const { getFramesFromAPI } = require('./apiRequestsFunctions/getFrames');
const { writeFramesInDatabase } = require('./databaseWriters/writeFramesInDatabase');

const pagesCount = 13;
const delay = +process.env.REQUEST_DELAY;
const databaseRecorderDelay = +process.env.API_REQUEST_AND_DATA_RECORDER_DELAY;
const moviesGroupsCount = +process.env.MOVIES_GROUP_COUNT;
const moviesCountInGroup = +process.env.MOVIES_COUNT_IN_GROUP;

async function startGetMoviesFromAPI() {
  try {
    for (let i = 1; i <= pagesCount; i += 1) {
      setTimeout(() => {
        getMoviesFromAPI(i);
      }, i * delay);
    }
  } catch (error) {
    console.error(error);
  }
}

async function startGetMovieRelations() {
  try {
    const movies = await Movie.findAll();
    for (let i = 0; i < movies.length; i += 1) {
      setTimeout(getMoviesRelations, i * delay, movies[i].id, movies[i].genre);
    }
  } catch (error) {
    console.error(error);
  }
}

async function startGetDirectorsAndActors() {
  try {
    const movies = await Movie.findAll();
    for (let i = 0; i < movies.length; i += 1) {
      setTimeout(getDirectorsAndActors, i * delay, movies[i].id);
    }
  } catch (error) {
    console.error(error);
  }
}

async function startGetFramesFromAPI() {
  try {
    const movies = await Movie.findAll({
      where: {
        frame: null,
      },
    });
    for (let i = 0; i < movies.length; i += 1) {
      setTimeout(getFramesFromAPI, i * delay, movies[i].id);
    }
  } catch (error) {
    console.error(error);
  }
}

async function normalizeDatabase() {
  try {
    const moviesForDeleting = await Movie.findAll({
      attributes: ['id'],
      raw: true,
      where: {
        frame: null,
      },
    });
    moviesForDeleting.forEach(async (item) => {
      try {
        await Relation.destroy({
          where: {
            rel2_movie_id: item.id,
          },
        });
        await Movie.destroy({
          where: {
            id: item.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function startMoviesGrouping() {
  try {
    const movies = await Movie.findAll({
    });
    for (let i = 0; i < moviesCountInGroup * moviesGroupsCount; i += moviesGroupsCount) {
      for (let j = 0; j < moviesGroupsCount; j += 1) {
        try {
          console.log(i, j);
          await Movie.update({
            group: (j + 1),
          }, {
            where: {
              id: movies[i + j].id,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

(async function startDatabaseCreator() {
  try {
    setTimeout(() => startGetMoviesFromAPI());
    setTimeout(() => writeIdTitleGenreInDatabase('./store/movies.txt'), databaseRecorderDelay * 1);
    setTimeout(() => startGetMovieRelations(), databaseRecorderDelay * 2);
    setTimeout(() => writeIdTitleGenreInDatabase('./store/relations.txt'), databaseRecorderDelay * 3);
    setTimeout(() => writeMoviesRelationsInDatabase('./store/relations.txt'), databaseRecorderDelay * 4);
    setTimeout(() => startGetDirectorsAndActors(), databaseRecorderDelay * 5);
    setTimeout(() => writeDirectorActorsInDatabase('./store/directorsAndActors.txt'), databaseRecorderDelay * 6);
    setTimeout(() => startGetFramesFromAPI(), databaseRecorderDelay * 7);
    setTimeout(() => writeFramesInDatabase('./store/frames.txt'), databaseRecorderDelay * 8);
    setTimeout(() => normalizeDatabase(), databaseRecorderDelay * 9);
    setTimeout(() => startMoviesGrouping(), databaseRecorderDelay * 10);
  } catch (error) {
    console.error(error);
  }
}());
