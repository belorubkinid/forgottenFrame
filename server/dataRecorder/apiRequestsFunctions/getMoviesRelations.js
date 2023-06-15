/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require('fs');
const { apiURL, apiKey } = require('./utils/utils');

async function getMoviesRelations(movieId, genre) {
  try {
    const responce = await fetch(`${apiURL}/v2.1/films/${movieId}/sequels_and_prequels`, {
      method: 'GET',
      headers: {
        'X-API-KEY': `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const movies = await responce.json();
    if (movies.length === 0) return;
    const dataForRecording = movies.map((item) => ({
      rel1_movie_id: movieId,
      id: item.filmId,
      title: item.nameRu,
      genre,
    }));

    fs.appendFile('./store/relations.txt', `${JSON.stringify(dataForRecording)}\n`, (error) => {
      if (error) throw error;
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getMoviesRelations };
