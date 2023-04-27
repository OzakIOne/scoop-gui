import fs from 'node:fs/promises';
import path from 'node:path';

import { execa } from 'execa';
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

const SCOOP_PATH: Path = process.env['SCOOP'] || `${process.env['USERPROFILE']}\\scoop`;
const BUCKETS_PATH = `${process.env['USERPROFILE']}\\scoop\\buckets`;

const bucketNames = {
  main: `${SCOOP_PATH}\\buckets\\main\\bucket`,
  extras: `${SCOOP_PATH}\\buckets\\extras\\bucket`,
};
// const installedAppsPath = `${process.env['USERPROFILE']}\\scoop\\apps`;
const installedBucketPath: Path = `${SCOOP_PATH}\\buckets`;
const availableBucketList: Path = `${SCOOP_PATH}\\apps\\scoop\\current\\buckets.json`;

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

const getInstalledBuckets = async function (): Promise<string[]> {
  try {
    return await getDirectoryFiles(installedBucketPath);
  } catch (error: unknown) {
    throw error;
  }
};

const getAppContent = async function (bucketPath: Path): Promise<AppContent[]> {
  try {
    const files = await getDirectoryFiles(bucketPath); //array of file names
    return await parseJsonFiles(files, bucketPath);
  } catch (error: unknown) {
    throw error;
  }
};

const parseJsonFromFile = async (filePath: string): Promise<AppContent> => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
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

const getInstalledAppsNames = async function (): Promise<string[]> {
  return getDirectoryFiles('C:\\Users\\ozaki\\scoop\\apps');
};

const getInstalledAppNamesArray = async function (): Promise<string[][]> {
  const buckets = await getInstalledBuckets();
  return buckets.map((bucket) => bucket.split('\\'));
};

const getAllInstalledAppsNames = async function (): Promise<string[]> {
  const { stdout } = await execa('es', ['-p', BUCKETS_PATH, '-s', `*.json`]);
  const list = stdout.split('\r\n').filter((item) => item.includes('\\bucket\\'));
  return list.map((item) => {
    const name = item.split('\\');
    return name[name.length - 1].split('.')[0];
  });
};

const getNotInstalledAppsNames = async function (): Promise<string[]> {
  const buckets = await getInstalledBuckets();
  const installedAppsList = await getInstalledAppsNames();
  const list = await Promise.all(
    buckets.map(async (bucket) => {
      const bucketPath = `${BUCKETS_PATH}\\${bucket}\\bucket`;
      const { stdout } = await execa('es', ['-p', bucketPath, '-s', `*.json`]);
      return stdout.split('\r\n').flatMap((item) => {
        const name = item.split('\\');
        return name[name.length - 1].split('.')[0];
      });
    })
  );
  return _.difference(list.flat(), installedAppsList);
};

const sweetPromise = async function (p: Promise<unknown>): Promise<[Error | null, unknown]> {
  return p.then(
    (data) => [null, data],
    (error) => [error, null]
  );
};

const appsArray = async function (bucketPath: Path): Promise<AppContent[]> {
  const [error, appsArray] = await sweetPromise(getAppContent(bucketPath));

  if (error) throw error;

  return appsArray as AppContent[];
};

export default {
  appsArray,
  bucketNames,
  getDirectoryFiles,
  getFileContent: getAppContent,
  getNotInstalledBuckets,
  getInstalledBuckets,
  parseJsonFromFile,
  getInstalledAppsNames,
  getNotInstalledAppsNames,
  getAllInstalledAppsNames,
  getInstalledAppNamesArray,
};
