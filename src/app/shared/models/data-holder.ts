/**
 * Helper class to hold data and errors to emit them through subjects without
 * having to call .error() witch will kill the subject and stop it's stream
 * preventing it from emitting values anymore
 */
export class DataHolder<T> {
  data:T;
  error: Error;

  constructor(data?: T,err?:Error ) {
    this.data = data;
    this.error = err;
  }

  static from<T>(data: T): DataHolder<T> {
    return new DataHolder<T>(data);
  }
  static error<T>(err: Error): DataHolder<T> {
    return new DataHolder<T>(null,err);
  }
}
