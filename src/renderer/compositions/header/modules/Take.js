/**
 * @abstract
 */
export class Take {
  /**
   * @abstract
   */
  load() {
    throw new Error('Method not implemented.');
  }

  /**
   * @type {Take}
   */
  static cache = null;

  static get() {
    return this.cache || this.init();
  }

  static init() {
    if (!this.cache || !(this.cache instanceof Take)) {
      if (Object.getPrototypeOf(this) !== Take) {
        throw new Error('Please extends class.');
      }

      this.cache = new this();
    }

    this.cache.load();
    return this.cache;
  }
}
