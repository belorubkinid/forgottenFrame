/* eslint-disable no-console */
const fs = require('fs').promises;
const { Relation } = require('../../database/models');

async function writeMoviesRelationsInDatabase(pathToFile) {
  try {
    const relationsParse = await fs.readFile(`${pathToFile}`, 'utf-8');
    const relationsParseSplited = relationsParse.trim().split('\n');
    relationsParseSplited.forEach((item) => {
      const movies = JSON.parse(item);
      movies.forEach(async (movie) => {
        if (movie.title) {
          try {
            await Relation.create({
              rel1_movie_id: movie.rel1_movie_id,
              rel2_movie_id: movie.id,
            });
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

module.exports = { writeMoviesRelationsInDatabase };
