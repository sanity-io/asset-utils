import {isUnresolvableError} from './errors'
import type {SafeFunction} from './types'

/**
 * Returns a getter which returns `undefined` instead of throwing,
 * if encountering an `UnresolvableError`
 *
 * @param method - Function to use as resolver
 * @returns Function that returns `undefined` if passed resolver throws UnresolvableError
 * @internal
 */
export function getForgivingResolver<Args extends unknown[], Return>(
  method: (...args: Args) => Return,
): SafeFunction<Args, Return> {
  return (...args: Args): Return | undefined => {
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
