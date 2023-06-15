/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require('fs');
const { apiURL, apiKey } = require('./utils/utils');

async function getFramesFromAPI(movieId) {
  try {
    const responce = await fetch(`${apiURL}/v2.2/films/${movieId}/images?type=STILL&page=1`, {
      method: 'GET',
      headers: {
        'X-API-KEY': `${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await responce.json();
    const dataForRecording = {
      id: movieId,
      frame: result.items[1].imageUrl,
    };
    fs.appendFile('./store/frames.txt', `${JSON.stringify(dataForRecording)}\n`, (error) => {
      if (error) throw error;
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getFramesFromAPI };
