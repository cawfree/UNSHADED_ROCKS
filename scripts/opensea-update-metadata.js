import {config} from 'dotenv';

config({path: `.env.${process.env.VITE_ENV}`});

import axios from 'axios';

const START_TOKEN = 0;
const TO_TOKEN_NUMBER = 10_000;
const CONTRACT_ADDRESS  = '0xfda1d24e927f8da58f86f653e976cb1f7e6cc9b7';

void (async () => {

  const failedTokens = [];

  for (let i = START_TOKEN; i < TO_TOKEN_NUMBER; i++) {
    for (let j = 0; j < 3; j += 1) {
      try {
        console.log(`Trying token ${i}...`);
        await axios({
          url: `https://api.opensea.io/api/v1/asset/${CONTRACT_ADDRESS}/${i}/?force_update=true`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.OPENSEA_API_KEY,
          },
        });
        console.log('Done.');
        await new Promise(resolve => setTimeout(resolve, 250));
        break;
      } catch (e) {
        console.error(`Error on token ${i}. Retrying...`);
      }
    }
    failedTokens.push(i);
  }
  console.log(`Done with ${failedTokens.length} failures: [${failedTokens.join(', ')}].`);
})();
