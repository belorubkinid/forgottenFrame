/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
require('dotenv').config();
const { writeIdTitleGenreInDatabase } = require('./dataRecorder/databaseWriters/writeIdTitleGenreInDatabase');
const { writeMoviesRelationsInDatabase } = require('./dataRecorder/databaseWriters/writeMoviesRelationsInDatabase');
const { Movie, Relation } = require('./database/models');
const { writeDirectorActorsInDatabase } = require('./dataRecorder/databaseWriters/writeDirectorActorsInDatabase');
const { writeFramesInDatabase } = require('./dataRecorder/databaseWriters/writeFramesInDatabase');

const moviesGroupsCount = +process.env.MOVIES_GROUP_COUNT;
const moviesCountInGroup = +process.env.MOVIES_COUNT_IN_GROUP;
const dataRecorderDelay = +process.env.DATA_RECORDER_DELAY;

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
    const movies = await Movie.findAll();
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

(async function startDatabaseRecorder() {
  try {
    setTimeout(() => writeIdTitleGenreInDatabase('./dataRecorder/store/movies.txt'));
    setTimeout(() => writeIdTitleGenreInDatabase('./dataRecorder/store/relations.txt'), dataRecorderDelay);
    setTimeout(() => writeMoviesRelationsInDatabase('./dataRecorder/store/relations.txt'), dataRecorderDelay * 2);
    setTimeout(() => writeDirectorActorsInDatabase('./dataRecorder/store/directorsAndActors.txt'), dataRecorderDelay * 3);
    setTimeout(() => writeFramesInDatabase('./dataRecorder/store/frames.txt'), dataRecorderDelay * 5);
    setTimeout(() => normalizeDatabase(), dataRecorderDelay * 6);
    setTimeout(() => startMoviesGrouping(), dataRecorderDelay * 7);
  } catch (error) {
    console.error(error);
  }
}());
