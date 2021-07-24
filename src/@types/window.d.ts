import 'typescript/lib/lib.dom';

import type { Remote } from 'electron';

declare global {
  interface Window {
    remote: Remote;
  }
}
