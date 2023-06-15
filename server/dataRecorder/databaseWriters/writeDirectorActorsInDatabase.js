/* eslint-disable no-console */
const fs = require('fs').promises;
const { Movie } = require('../../database/models');

async function writeDirectorActorsInDatabase(pathToFile) {
  try {
    const directorAndActorsParse = await fs.readFile(`${pathToFile}`, 'utf-8');
    const directorAndActorsParseSplited = directorAndActorsParse.trim().split('\n');
    directorAndActorsParseSplited.forEach(async (item) => {
      const {
        id, director, actor1, actor2,
      } = JSON.parse(item);
      try {
        await Movie.update({ director, actor1, actor2 }, { where: { id } });
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { writeDirectorActorsInDatabase };
