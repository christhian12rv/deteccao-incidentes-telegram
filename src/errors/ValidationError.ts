export default class ValidationError extends Error {
  constructor(message) {
    super('');
    this.name = this.constructor.name;
    this.stack = message + ' : ' + this.stack;
  }
}
