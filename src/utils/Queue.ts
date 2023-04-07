type AnyFn = (...args: any[]) => void | Promise<void>;

export class Queue {
  #queue: Promise<void> = Promise.resolve();

  add(fn: AnyFn): Promise<void> {
    return new Promise((resolve, reject) => {
      this.#queue = this.#queue
        .then(fn)
        .then(() => resolve())
        .catch(err => {
          reject(err);
        });
    });
  }
}
