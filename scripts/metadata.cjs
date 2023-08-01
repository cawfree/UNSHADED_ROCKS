const csv2json = require('csvtojson');
const path = require('path');
const os = require('os');
const fs = require('fs');
const {ethers} = require('ethers');

const AIRDROP_LIST = path.resolve('.resources', 'AIRDROP_LIST.csv');
const BROKEN_ROCKS = path.resolve('.resources', 'BROKEN_ROCKS.csv');
const EXCLUSION_LIST = path.resolve('.resources', 'EXCLUSION_LIST.csv');
const ROCKS_ATTRIBUTES_V2 = path.resolve('.resources', 'ROCKS_ATTRIBUTES_V2.csv');

const GIFT_LIST_ADDRESSES = path.resolve('.resources', 'GIFT_LIST_ADDRESSES.json');
const GIFT_LIST_TOKENS = path.resolve('.resources', 'GIFT_LIST_TOKENS.json');
//const TOKEN_ID_TO_ROCK_ID = path.resolve('.resources', 'TOKEN_ID_TO_ROCK_ID.json');
const TOKEN_ID_TO_ROCK_ID = path.resolve('.resources', 'TOKEN_ID_TO_ROCK_ID_2.json');

void (async () => {

  const  ROCKS_ATTRIBUTES_V2_FIX= path.resolve(os.tmpdir(), `${Math.random()}`);

  fs.writeFileSync(
    ROCKS_ATTRIBUTES_V2_FIX,
    fs.readFileSync(ROCKS_ATTRIBUTES_V2, 'utf-8')
      .split('\n')
      .filter((_, i) => i > 0)
      .join('\n'),
  );

  const [airdropList, brokenRocks, exclusionList, rocksAttributesV2] = await Promise.all([
    csv2json().fromFile(AIRDROP_LIST),
    csv2json().fromFile(BROKEN_ROCKS),
    csv2json().fromFile(EXCLUSION_LIST),
    csv2json().fromFile(ROCKS_ATTRIBUTES_V2_FIX),
  ]);

  const giftListAddresses = JSON.parse(
    fs.readFileSync(GIFT_LIST_ADDRESSES, 'utf-8'),
  );

  const giftListTokens = JSON.parse(
    fs.readFileSync(GIFT_LIST_TOKENS, 'utf-8'),
  );

  const tokenIdToRockId = JSON.parse(
    fs.readFileSync(TOKEN_ID_TO_ROCK_ID, 'utf-8'),
  );


  const isBroken = (rockId) => Boolean(brokenRocks.find((e) => e['PRE-UPDATE ID'] === String(rockId)));

  const isExcluded = (rockId) => Boolean(exclusionList.find((e) => e['ROCK ID'] === String(rockId)));

  const cleanedRocks = rocksAttributesV2.map(
      (e) => {
        const {
          'ROCK ID': ROCK_ID,
          'Type': type,
          X: x,
          Y: y,
          Z: z,
          Volume: volume,
          Vertices: vertices,
          Polygons: polygons,
        } = e;

        const rockId = parseInt(ROCK_ID.trim());

        const maybeTokenId = tokenIdToRockId.find(e => e.rockID === rockId)?.tokenID;

        if (typeof maybeTokenId !== 'number')
          throw new Error(`Unable to find tokenId for rockId "${rockId}" (found "${maybeTokenId}").`);

        return {
          id: rockId,
          tokenId: maybeTokenId,
          type: parseInt(type),
          x: parseFloat(x),
          y: parseFloat(y),
          z: parseFloat(z),
          volume: parseFloat(volume),
          vertices: parseFloat(vertices),
          polygons: parseFloat(polygons),
          broken: isBroken(rockId),
          //image: `https://arweave.net/i5-y93ey6RtGjq2NflkYXF7WJqjikWakQOvDhGEFiDk/rocks_preview${rockId}.png`,
          image: `https://arweave.net/fpPB-G2YzHJPylvUIF5Of2ALnndyOL_IK8Wmrzgdzcs/rock${rockId}.jpg`,
          animation_url: `https://unshaded.s3.us-east-2.amazonaws.com/rocks.glb/rock${rockId}.glb`,
          excluded: isExcluded(rockId),
        };
      },
  );

  const badAirdropAddresses =  airdropList.filter((e => !ethers.isAddress(e['Address'])));
  const goodAirdropAddresses =  airdropList.filter((e => !badAirdropAddresses.includes(e)));

  const cleanedAirdrop = goodAirdropAddresses.map((e) => {
    const {
      ['Address']: maybeAddress,
      ['Number of rocks to claim']: maybeNumberOfRocksToClaim,
    } = e;
    return {address: ethers.getAddress(maybeAddress), amount: parseInt(maybeNumberOfRocksToClaim)};
  });

  fs.writeFileSync(path.resolve('src', 'rocks', 'assets', 'airdrop.ts'), `export default ${JSON.stringify(cleanedAirdrop)} as const;`);
  fs.writeFileSync(path.resolve('src', 'rocks', 'assets', 'rocks.ts'), `export default ${JSON.stringify(cleanedRocks)} as const;`);
  fs.writeFileSync(path.resolve('src', 'rocks', 'assets', 'index.ts'), `export {default as airdrop} from './airdrop';\nexport {default as rocks} from './rocks';\n`);
})();
