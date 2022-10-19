/**
 * gulp module/component that gets used to build the component-gulp 
 * the component-gulp can be used via cli on posix systems
 * the stealify component manager can use this directly
 * or the compiled component. depending on your performance needs.
 * and overall lifetime of the component.
 * a .component.js file contains all definitions to create and execute
 * the component via a @stealify/component-manager 
 * and or posix interfaces like cli stdin stdout pipes ....
 */
export const ComponentGulp = (...Tasks) => {}

/**
export interface RunEffects {
  <A>(stream: Stream<A>, scheduler: Scheduler): Promise<void>
  <A>(stream: Stream<A>): (scheduler: Scheduler) => Promise<void>
}

export const runEffects: RunEffects = curry2((stream: Stream<void | PromiseLike<void>>, scheduler: Scheduler): Promise<void> =>
  new Promise((resolve, reject) =>
    runStream(stream, scheduler, resolve, reject)))

function runStream <A>(stream: Stream<A>, scheduler: Scheduler, resolve: (a: A | undefined) => void, reject: (e: Error) => void): void {
  const disposable = new SettableDisposable()
  const observer = new RunEffectsSink(resolve, reject, disposable)

  disposable.setDisposable(stream.run(observer, scheduler))
}

class RunEffectsSink<A> implements Sink<A> {
  private readonly _disposable: Disposable
  private active: boolean;
  private _error: (e: Error) => void
  private _end: (x: A | undefined) => void

  constructor(end: (x: A | undefined) => void, error: (e: Error) => void, disposable: Disposable) {
    this._end = end
    this._error = error
    this._disposable = disposable
    this.active = true
  }

  event(): void {}

  end(): void {
    if (!this.active) {
      return
    }
    this.dispose(this._error, this._end, undefined)
  }

  error(_t: Time, e: Error): void {
    this.dispose(this._error, this._error, e)
  }

  private dispose <X>(error: (e: Error) => void, end: (x: X) => void, x: X): void {
    this.active = false
    tryDispose(error, end, x, this._disposable)
  }
}

function tryDispose <X>(error: (e: Error) => void, end: (x: X) => void, x: X, disposable: Disposable): void {
  try {
    disposable.dispose()
  } catch (e) {
    error(e)
    return
  }

  end(x)
}
*/
