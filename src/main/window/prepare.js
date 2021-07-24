import { app } from 'electron';

import { AppName } from '../../../config/app';

export async function prepare() {
  app.setName(AppName);
}
