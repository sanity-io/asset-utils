// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MethodReturnType<T> = T extends (...args: unknown[]) => infer R ? R : any
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown ? A : never

export class UnresolvableError extends Error {
  unresolvable = true

  // The input may not be a valid source, so let's not type it as one
  input?: unknown

  constructor(inputSource: unknown, message = 'Failed to resolve asset ID from source') {
    super(message)
    this.input = inputSource
  }
}

export function isUnresolvableError(err: Error): err is UnresolvableError {
  const error = err as UnresolvableError
  return Boolean(error.input && error.unresolvable)
}

/**
 * Returns a getter which returns `undefined` instead of throwing,
 * if encountering an `UnresolvableAssetError`
 *
 * @param method - Function to use as resolver
 * @returns Function that returns `undefined` if passed resolver throws UnresolvableAssetError
 */
export function getForgivingResolver<T extends Function>(method: T) {
  return function (...args: ArgumentTypes<T>): MethodReturnType<T> | undefined {
    try {
      return method(...args)
    } catch (err) {
      if (isUnresolvableError(err)) {
        return undefined
      }

      throw err
    }
  }
}
