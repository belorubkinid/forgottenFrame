/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require('fs');
const { apiURL, apiKey } = require('./utils/utils');

async function getMoviesFromAPI(pageNum) {
  try {
    const responce = await fetch(`${apiURL}/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${pageNum}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await responce.json();

    const dataForRecording = result.films.map((item) => {
      const firstLimitation = item.genres.find((element) => element.genre === 'мультфильм');
      const secondLimitation = item.countries.find((element) => element.country === 'СССР');
      if (firstLimitation || secondLimitation) return;
      return ({
        id: item.filmId,
        title: item.nameRu,
        genre: item.genres[0].genre,
      });
    });

    fs.appendFile('./store/movies.txt', `${JSON.stringify(dataForRecording)}\n`, (error) => {
      if (error) throw error;
      console.log(`successfull request ${pageNum}`);
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getMoviesFromAPI };
