import { join } from 'path';

import { app } from 'electron';

export const MAIN_PATH =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath();

export const RESOURCES_PATH = join(MAIN_PATH, 'resources');
