import type { manager } from '../preload';

type HeaderManagerBridgeContext = typeof manager;

declare global {
  interface Window {
    manager: HeaderManagerBridgeContext;
  }
}
