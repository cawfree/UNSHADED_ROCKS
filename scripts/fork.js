import {config} from 'dotenv';
import * as child_process from 'child_process';

config({path: `.env.${process.env.VITE_ENV}`});

const ANVIL_FORK_URL = process.env.ANVIL_FORK_URL;

if (typeof ANVIL_FORK_URL !== 'string' || !ANVIL_FORK_URL.length)
  throw new Error(`Expected non-empty string ANVIL_FORK_URL, encountered ${
    String(ANVIL_FORK_URL)
  }".`);

child_process.execSync(`anvil --fork-url ${ANVIL_FORK_URL} --chain-id 1337`, {stdio: 'inherit'});
