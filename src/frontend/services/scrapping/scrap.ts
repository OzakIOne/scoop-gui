import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { difference, xor } from 'lodash';
import { readFileSync } from 'fs';

const userDirectory = process.env.USERPROFILE ?? '';

const appsPath = join(userDirectory, 'scoop', 'apps');
const installedBucketsPath = join(userDirectory, 'scoop', 'buckets');
const knownBucketPath = join(
  userDirectory,
  'scoop/apps/scoop/current/buckets.json',
);

const getDirectoryContent = async (dirName: string) => await readdir(dirName);

async function getNotInstalledBuckets() {
  const knownBucketList = await readFile(knownBucketPath, {
    encoding: 'utf-8',
  });
  const knownBucketNameList = Object.keys(JSON.parse(knownBucketList));
  const installedBucketList = await getDirectoryContent(installedBucketsPath);
  return difference(knownBucketNameList, installedBucketList);
}

const getInstalledBuckets = async () =>
  await getDirectoryContent(installedBucketsPath);

const getInstalledApps = async () => await readdir(appsPath);

async function getBucketAppsInfo(bucketPath: string) {
  const dirdata = await readdir(bucketPath);
  return parseBucketFiles(dirdata, bucketPath);
}

async function parseBucketFiles(FileName: string[], bucketPath: string) {
  return Promise.all(
    FileName.map((File: any) =>
      readFile(join(bucketPath, File)).then(<any>JSON.parse),
    ),
  );
}

async function getBucketAppsPath() {
  const bucketsName = await getInstalledBuckets();
  return bucketsName.map((name: string) =>
    join(installedBucketsPath, name, 'bucket'),
  );
}

async function getAllAppsName() {
  const bucketAppPath = await getBucketAppsPath();
  return Promise.all(bucketAppPath.map((path: string) => readdir(path)));
}

async function getNotInstalledApps() {
  const installedApps = await getInstalledApps();
  const getAllApps = await getAllAppsName();
  const flatgetAllApps = getAllApps.flat().map((app) => app.slice(0, -5));
  return xor(flatgetAllApps, installedApps);
}

async function getDescriptionInstalledApps() {
  const installedApps = await getInstalledApps();
  return Promise.all(
    installedApps.map(async (app) => {
      if (app !== 'scoop') {
        const data = readFileSync(
          join(appsPath, app, 'current', 'manifest.json'),
        );
        return JSON.parse(data).description;
      }
    }),
  );
}

// async function sweetPromise(P: any) {
//   return P.then(
//     (data: any) => [null, data],
//     (err: any) => [err, null],
//   );
// }

// async function test(bucket: any) {
//   const [err, appsArray] = await sweetPromise(getBucketAppsInfo(bucket));
//   if (err) return console.error(err);
//   return appsArray;
// }

export {
  getNotInstalledBuckets,
  getInstalledApps,
  getInstalledBuckets,
  getAllAppsName,
  getBucketAppsInfo,
  getNotInstalledApps,
  getDescriptionInstalledApps,
};
