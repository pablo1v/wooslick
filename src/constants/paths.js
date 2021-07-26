import { join, resolve } from 'path';

import { app } from 'electron';

export const RESOURCES_PATH =
  process.env.NODE_ENV === 'production'
    ? join(process.resourcesPath, 'resources')
    : resolve(app.getAppPath(), '..', 'resources');
