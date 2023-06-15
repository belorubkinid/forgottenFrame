/* eslint-disable no-console */
const fs = require('fs').promises;
const { Movie } = require('../../database/models');

async function writeIdTitleGenreInDatabase(pathToFile) {
  try {
    const moviesParse = await fs.readFile(`${pathToFile}`, 'utf-8');
    const moviesParseSplited = moviesParse.trim().split('\n');
    moviesParseSplited.forEach((item) => {
      const movies = JSON.parse(item);
      movies.forEach(async (movie) => {
        if (movie === null) return;
        if (movie.title) {
          try {
            const movieTitleInDataBase = await Movie.findOne({ where: { title: movie.title } });
            if (!movieTitleInDataBase) {
              await Movie.create({
                id: movie.id,
                title: movie.title,
                genre: movie.genre,
              });
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { writeIdTitleGenreInDatabase };
