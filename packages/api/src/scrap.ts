import fs from 'node:fs/promises';
import path from 'node:path';

import _ from 'lodash';

type Path = Buffer | string;

interface AppContent {
  version: string;
  description: string;
  homepage: string;
  license: string;
  suggest: {
    java: string[];
  };
  notes: string;
  url: string;
  hash: string;
  bin: string[];
}

const bucketNames = {
  main: `${process.env['USERPROFILE']}\\scoop\\buckets\\main\\bucket`,
  extras: `${process.env['USERPROFILE']}\\scoop\\buckets\\extras\\bucket`,
};
// const installedAppsPath = `${process.env['USERPROFILE']}\\scoop\\apps`;
const installedBucketPath = `${process.env['USERPROFILE']}\\scoop\\buckets`;
const availableBucketList = `${process.env['USERPROFILE']}\\scoop\\apps\\scoop\\current\\buckets.json`;

const getDirectoryFiles = async function (directoryPath: Path): Promise<string[]> {
  try {
    return await fs.readdir(directoryPath);
  } catch (error: unknown) {
    throw error;
  }
};

const getNotInstalledBuckets = async function (): Promise<string[]> {
  try {
    return await fs.readFile(availableBucketList, { encoding: 'utf8' }).then(async (item) => {
      const bucketsList = Object.keys(JSON.parse(item) as Record<string, unknown>);
      return getDirectoryFiles(installedBucketPath).then((instBuckets) => {
        const instBucketsArray = Object.keys(instBuckets).map((key) => instBuckets[key]); // extract the array of bucket names from the object
        return _.difference(bucketsList, instBucketsArray);
      });
    });
  } catch (error: unknown) {
    throw error;
  }
};

const getFileContent = async function (bucketPath: Path): Promise<AppContent[]> {
  try {
    const files = await getDirectoryFiles(bucketPath); //array of file names
    return await parseJsonFiles(files, bucketPath);
  } catch (error: unknown) {
    throw error;
  }
};

const parseJsonFiles = async function (
  fileNames: string[],
  bucketPath: Path
): Promise<AppContent[]> {
  return Promise.all(
    fileNames.map(async (file) =>
      fs
        .readFile(path.join(bucketPath as string, file))
        .then((buffer) => JSON.parse(buffer.toString()))
    )
  );
};

const sweetPromise = async function (p: Promise<unknown>): Promise<[Error | null, unknown]> {
  return p.then(
    (data) => [null, data],
    (error) => [error, null]
  );
};

const appsArray = async function (bucketPath: Path): Promise<AppContent[]> {
  const [error, appsArray] = await sweetPromise(getFileContent(bucketPath));

  if (error) throw error;

  return appsArray as AppContent[];
};

export default {
  appsArray,
  bucketNames,
  getDirectoryFiles,
  getFileContent,
  getNotInstalledBuckets,
};
