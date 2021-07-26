const { spawn } = require('child_process');
const { join } = require('path');

const { ROOT_PATH } = require('../../constants');
const { logBuildInfo } = require('../../logBuildInfo');
const { clearConsole } = require('../../utils/clearConsole');
const { ChildProcessMessageType } = require('./type');

const HOOK_PATH = join(__dirname, 'hook.js');
const ELECTRON_BIN = require('electron'); // eslint-disable-line import/order

class ChildProcess {
  constructor() {
    /**
     * @private
     * @type {import('child_process').ChildProcessWithoutNullStreams|null}
     */
    this.process = null;

    /**
     * @private
     * @type {string|null}
     */
    this.mainFile = null;

    /**
     * @private
     * @type {boolean}
     */
    this.hasPrintedBuildInfo = false;

    Object.defineProperties(this, {
      process: {
        enumerable: false,
      },
      mainFile: {
        enumerable: false,
      },
      hasPrintedBuildInfo: {
        enumerable: false,
      },
      handleExit: {
        value: this.handleExit.bind(this),
      },
      handleMessage: {
        value: this.handleMessage.bind(this),
      },
      handlePrintMessage: {
        value: this.handlePrintMessage.bind(this),
      },
    });
  }

  /**
   * @param {boolean} hard
   */
  reload(hard = false) {
    if (!this.process) {
      return;
    }

    if (hard) {
      this.process.removeAllListeners('exit');
      this.process.send({ type: ChildProcessMessageType.Quit });

      this.process = null;

      this.start();
      return;
    }

    this.process.send({ type: ChildProcessMessageType.Reload });
  }

  /**
   * @param {string} mainFile
   */
  start(mainFile = this.mainFile) {
    if (this.process) {
      return;
    }

    const childProcess = spawn(
      ELECTRON_BIN,
      ['--require', HOOK_PATH, mainFile],
      {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        cwd: ROOT_PATH,
      },
    );

    childProcess.stderr.setEncoding('utf8');
    childProcess.stdout.setEncoding('utf8');

    childProcess.on('exit', this.handleExit);
    childProcess.on('message', this.handleMessage);

    childProcess.stdout.on('data', this.handlePrintMessage);
    childProcess.stderr.on('data', this.handlePrintMessage);

    this.mainFile = mainFile;
    this.process = childProcess;
  }

  /**
   * @private
   */
  handleMessage() {}

  /**
   * @private
   */
  handleExit() {
    process.exit(0);
  }

  /**
   * @private
   * @param {*} chunk
   */
  handlePrintMessage(chunk) {
    if (!this.hasPrintedBuildInfo) {
      clearConsole();
      logBuildInfo();

      this.hasPrintedBuildInfo = true;
    }

    if (chunk) {
      console.log(chunk);
    }
  }

  /**
   * @return {ChildProcess}
   */
  static get() {
    if (this.instance && this.instance instanceof ChildProcess) {
      return this.instance;
    }

    const instance = new ChildProcess();

    this.instance = instance;
    return instance;
  }
}

/**
 * @type {ChildProcess|null}
 */
ChildProcess.instance = null;

module.exports = {
  ChildProcess,
};
