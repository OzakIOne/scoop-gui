import fs from 'node:fs/promises';
import path, { basename, extname } from 'node:path';
import { BUCKETS_PATH, SCOOP_PATH, INSTALLED_BUCKET_PATH, AVAILABLE_BUCKET_LIST } from './utils.js';
import type { Path, AppNamePath } from './utils.js';

import _ from 'lodash';

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

const getDirectoryFiles = async function (directoryPath: Path): Promise<string[]> {
  try {
    return await fs.readdir(directoryPath);
  } catch (error: unknown) {
    throw error;
  }
};

const getNotInstalledBuckets = async function (): Promise<string[]> {
  try {
    return await fs.readFile(AVAILABLE_BUCKET_LIST, { encoding: 'utf8' }).then(async (item) => {
      const bucketsList = Object.keys(JSON.parse(item) as Record<string, unknown>);
      return getDirectoryFiles(INSTALLED_BUCKET_PATH).then((instBuckets) => {
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
    return await getDirectoryFiles(INSTALLED_BUCKET_PATH);
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

const getInstalledAppsNames = async function (): Promise<AppNamePath[]> {
  const apps = await getDirectoryFiles(`${SCOOP_PATH}\\apps`);
  return apps.map((app) => ({
    name: basename(app, extname(app)),
    path: `${SCOOP_PATH}\\apps`,
  }));
};

const getInstalledAppNamesArray = async function (): Promise<string[][]> {
  const buckets = await getInstalledBuckets();
  return buckets.map((bucket) => bucket.split('\\'));
};

const getAllAvailableApps = async function (): Promise<AppNamePath[]> {
  const buckets = await getInstalledBuckets();
  const bucketPaths = buckets.map((bucket) => `${BUCKETS_PATH}\\${bucket}\\bucket`);
  const appNames = bucketPaths.map(async (path) => {
    const files = await getDirectoryFiles(path);
    return files.map((file) => ({
      path: path,
      name: basename(file, extname(file)),
    }));
  });

  return Promise.all(appNames).then((result) => result.flat());
};

const getNotInstalledAppsNames = async function () {
  const installedAppsList = await getInstalledAppsNames();
  const allAvailableApps = await Promise.all(await getAllAvailableApps());
  const names = allAvailableApps.map((app) => ({ name: app.name, path: app.path }));

  return _.differenceBy(
    names,
    installedAppsList.map((app) => ({ name: app.name, path: app.path })),
    'name'
  );
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
  getDirectoryFiles,
  getAppContent,
  getNotInstalledBuckets,
  getInstalledBuckets,
  parseJsonFromFile,
  getInstalledAppsNames,
  getNotInstalledAppsNames,
  getAllAvailableApps,
  getInstalledAppNamesArray,
};
