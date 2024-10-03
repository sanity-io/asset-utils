/**
 * Error type thrown when the library fails to resolve a value, such as an asset ID,
 * filename or project ID/dataset information.
 *
 * The `input` property holds the value passed as the input, which failed to be
 * resolved to something meaningful.
 *
 * @public
 */
export class UnresolvableError extends Error {
  unresolvable = true

  // The input may not be a valid source, so let's not type it as one
  input?: unknown

  constructor(inputSource: unknown, message = 'Failed to resolve asset ID from source') {
    super(message)
    this.input = inputSource
  }
}

/**
 * Checks whether or not an error instance is of type UnresolvableError
 *
 * @param err - Error to check for unresolvable error type
 * @returns True if the passed error instance appears to be an unresolvable error
 * @public
 */
export function isUnresolvableError(err: unknown): err is UnresolvableError {
  const error = err as UnresolvableError
  return Boolean(error.unresolvable && 'input' in error)
}
