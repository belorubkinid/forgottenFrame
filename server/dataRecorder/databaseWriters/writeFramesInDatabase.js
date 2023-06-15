/* eslint-disable no-console */
const fs = require('fs').promises;
const { Movie } = require('../../database/models');

async function writeFramesInDatabase(pathToFile) {
  try {
    const directorAndActorsParse = await fs.readFile(`${pathToFile}`, 'utf-8');
    const directorAndActorsParseSplited = directorAndActorsParse.trim().split('\n');
    directorAndActorsParseSplited.forEach(async (item) => {
      const {
        id, frame,
      } = JSON.parse(item);
      try {
        await Movie.update({ frame }, { where: { id } });
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { writeFramesInDatabase };
