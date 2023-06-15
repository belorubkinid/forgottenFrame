/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require('fs');
const { apiURL, apiKey } = require('./utils/utils');

async function getDirectorsAndActors(movieId) {
  try {
    const responce = await fetch(`${apiURL}/v1/staff?filmId=${movieId}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const staff = await responce.json();

    const dataForRecording = staff.reduce((acc, item) => {
      if (Object.keys(acc).length > 4) return acc;
      if (item.professionKey === 'DIRECTOR' && !acc?.director) {
        return { ...acc, director: item.nameRu };
      }
      if (item.professionKey === 'ACTOR' && !acc?.actor1) {
        return { ...acc, actor1: item.nameRu };
      }
      if (item.professionKey === 'ACTOR' && !acc?.actor2) {
        return { ...acc, actor2: item.nameRu };
      }
      return acc;
    }, { id: movieId });

    fs.appendFile('./store/directorsAndActors.txt', `${JSON.stringify(dataForRecording)}\n`, (error) => {
      if (error) throw error;
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getDirectorsAndActors };
