export type Path = Buffer | string;
export type AppNamePath = {
  name: string;
  path: Path;
};

export const BUCKETS_PATH = `${process.env['USERPROFILE']}\\scoop\\buckets`;
export const SCOOP_PATH: Path = process.env['SCOOP'] || `${process.env['USERPROFILE']}\\scoop`;
export const BUCKET_NAMES = {
  main: `${SCOOP_PATH}\\buckets\\main\\bucket`,
  extras: `${SCOOP_PATH}\\buckets\\extras\\bucket`,
};
// export const installedAppsPath = `${process.env['USERPROFILE']}\\scoop\\apps`;
export const INSTALLED_BUCKET_PATH: Path = `${SCOOP_PATH}\\buckets`;
export const AVAILABLE_BUCKET_LIST: Path = `${SCOOP_PATH}\\apps\\scoop\\current\\buckets.json`;
