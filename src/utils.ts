/* eslint-disable @typescript-eslint/ban-types */
import {isUnresolvableError} from './errors'

/**
 * @internal
 */
export type MethodReturnType<T> = T extends (...args: unknown[]) => infer R ? R : any // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * @internal
 */
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown ? A : never

/**
 * Returns a getter which returns `undefined` instead of throwing,
 * if encountering an `UnresolvableError`
 *
 * @param method - Function to use as resolver
 * @returns Function that returns `undefined` if passed resolver throws UnresolvableError
 * @internal
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

/**
 * Checks whether or not the passed object is an object (and not `null`)
 *
 * @param obj Item to check whether or not is an object
 * @returns Whether or not `obj` is an object
 * @internal
 */
export function isObject(obj: unknown): obj is object {
  return obj !== null && !Array.isArray(obj) && typeof obj === 'object'
}
