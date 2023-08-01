import child_process from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';

const createDestinationPath = (rockId) => path.resolve('.3mf', `rock${rockId}.3mf`);

const downloadRock = async ({
  rockId,
}) => {

  const stdio = 'inherit';//[];
  const cwd = os.tmpdir();

  try {

    child_process.execSync(
      `wget https://unshaded.s3.us-east-2.amazonaws.com/rocks.glb/rock${rockId}.glb`,
      {stdio, cwd},
    );

    const downloadPath = path.resolve(cwd, `rock${rockId}.glb`);
    console.log('download to', downloadPath);

    if (!fs.existsSync(downloadPath))
      throw new Error(`Expected ${
        downloadPath
      }, but it did not exist.`);

    const intermediate = path.resolve(cwd, `${rockId}.stl`);
    const moveFileTo = createDestinationPath(rockId);

    child_process.execSync(
      `assimp export ${downloadPath} ${intermediate}`,
      {stdio, cwd}
    );

    child_process.execSync(
      `assimp export ${intermediate} ${moveFileTo}`,
      {stdio, cwd}
    );

    // Delete the rock we downloaded.
    fs.unlinkSync(intermediate, {recursive: true});
    fs.unlinkSync(downloadPath, {recursive: true});

    console.log(`Successfully converted #${rockId} to ${moveFileTo}!`)

  } catch(e) {
    console.error(e);
    throw e;
  }
};

function chunk({
  arr,
  chunkSize,
}) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

void (async () => {

  const list = [...Array(10_000)].map((_, i) => i)
    .filter(rockId => !fs.existsSync(createDestinationPath(rockId)));

  console.log(`There are ${list.length} files to convert.`);

  const chunkSize = 1;
  const tasks = chunk({arr: list, chunkSize});

  const successRocks = [];
  const failedRocks = [];

  for (let i = 0; i < tasks.length; i += 1) {

    const task = tasks[i];

    await Promise.all(
      task.map(
        (rockId) => downloadRock({rockId})
          .then(() => successRocks.push(rockId))
          .catch((e) => {
            console.error(e);
            failedRocks.push(rockId);
          })
      ),
    );

    console.log(`(Batch #: ${
      i
    }, Success #: ${
      successRocks.length
    }, Fail #: ${
      failedRocks.length
    }, Total Progress (${
      Math.round(((successRocks.length + failedRocks.length) / tasks.length) * 100)
    }%))`)

  }

  if (failedRocks.length) {
    console.log(`Finished task with ${failedRocks.length} failures:`)
    console.log(JSON.stringify(failedRocks));
  } else {
    console.log('Success!')
  }

})();
