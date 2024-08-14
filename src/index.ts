/**
 * A wrapper class for a value of type T that provides useful call chain style APIs.
 * @template T - The type of the wrapped value
 */
export class Wrapped<T> {
  constructor(private val: T) {
  }

  /**
   * Transforms the wrapped value using the provided function and returns a new Wrapped instance.
   * @template U - The type of the transformed value
   * @param fn - The function to transform the wrapped value
   * @returns A new Wrapped instance containing the transformed value
   * @example
   * ```typescript
   * const wrapped = new Wrapped(5)
   * const result = wrapped.let(it => it * 2).value // result is 10
   * ```
   */
  public let<U>(fn: (it: T) => U): Wrapped<U> {
    return new Wrapped(fn(this.val))
  }

  /**
   * Applies the provided function to the wrapped value and returns the same Wrapped instance.
   * @param fn - The function to apply to the wrapped value
   * @returns The same Wrapped instance
   * @example
   * ```typescript
   * const wrapped = new Wrapped(5)
   * wrapped.also(it => console.log(it)) // logs 5
   * ```
   */
  public also(fn: (it: T) => void): this {
    fn(this.val)
    return this
  }

  /**
   * Returns the same Wrapped instance if the provided function returns true for the wrapped value, otherwise returns undefined.
   * @param fn - The function to test the wrapped value
   * @returns The same Wrapped instance or undefined
   * @example
   * ```typescript
   * const wrapped = new Wrapped(5);
   * wrapped.takeIf(it => it > 3)?.also(it => console.log(it)); // logs 5
   * wrapped.takeIf(it => it < 3)?.also(it => console.log(it)); // does not log anything
   * ```
   */
  public takeIf(fn: (it: T) => boolean): this | undefined {
    if (fn(this.val))
      return this
    return undefined
  }

  /**
   * Returns the same Wrapped instance if the provided function returns false for the wrapped value, otherwise returns undefined.
   * @param fn - The function to test the wrapped value
   * @returns The same Wrapped instance or undefined
   * @example
   * ```typescript
   * const wrapped = new Wrapped(5);
   * wrapped.takeUnless(it => it < 3)?.also(it => console.log(it)); // logs 5
   * wrapped.takeUnless(it => it > 3)?.also(it => console.log(it)); // does not log anything
   * ```
   */
  public takeUnless(fn: (it: T) => boolean): this | undefined {
    if (fn(this.val))
      return undefined
    return this
  }

  /**
   * Returns the same Wrapped instance if the wrapped value is not null or undefined, otherwise returns undefined.
   * @returns The same Wrapped instance or undefined
   * @example
   * ```typescript
   * const wrapped = new Wrapped(randomValue() as number | null)
   * const result = wrapped.takeIfNotNil()
   *   // `it`'s type is `number` in the following line
   *   ?.also(it => console.log(it))
   * ```
   */
  public takeIfNotNil(): Wrapped<NonNullable<T>> | undefined {
    if (this.val == null)
      return undefined
    return this as Wrapped<NonNullable<T>>
  }

  /**
   * Returns a new Wrapped instance containing the default value if the wrapped value is null or undefined.
   * @param defaultValue - The default value to use if the wrapped value is null or undefined
   * @returns A new Wrapped instance containing the default value or the original wrapped value
   * @example
   * ```typescript
   * const wrapped = new Wrapped<number | null>(null)
   * const result = wrapped.orDefault(10).value // result is 10
   * ```
   */
  public orDefault(defaultValue: NonNullable<T>): Wrapped<NonNullable<T>> {
    if (this.val == null)
      return new Wrapped(defaultValue)
    return this as Wrapped<NonNullable<T>>
  }

  /**
   * Returns a new Wrapped instance containing the value provided by the function if the wrapped value is null or undefined.
   * @param fn - The function to provide the value if the wrapped value is null or undefined
   * @returns A new Wrapped instance containing the value provided by the function or the original wrapped value</t>
   * @example
   * ```typescript
   * const wrapped = new Wrapped<number | null>(null)
   * const result = wrapped.orElse(() => 10).value // result is 10
   * ```
   */
  public orElse(fn: () => NonNullable<T>): Wrapped<NonNullable<T>> {
    if (this.val == null)
      return new Wrapped(fn())
    return this as Wrapped<NonNullable<T>>
  }

  /**
   * Returns the wrapped value if it is not null or undefined, otherwise returns the default value.
   * @param defaultValue - The default value to return if the wrapped value is null or undefined
   * @returns The wrapped value or the default value
   * @example
   * ```typescript
   * const wrapped = new Wrapped<number | null>(null)
   * const result = wrapped.getOrDefault(10) // result is 10
   * ```
   */
  public getOrDefault(defaultValue: NonNullable<T>): NonNullable<T> {
    return this.val ?? defaultValue
  }

  /**
   * Returns the wrapped value if it is not null or undefined, otherwise returns the value provided by the function.
   * @param fn - The function to provide the value if the wrapped value is null or undefined
   * @returns The wrapped value or the value provided by the function
   * @example
   * ```typescript
   * const wrapped = new Wrapped<number | null>(null)
   * const result = wrapped.getOrElse(() => 10) // result is 10
   * ```
   */
  public getOrElse(fn: () => NonNullable<T>): NonNullable<T> {
    return this.val ?? fn()
  }

  /**
   * Gets the wrapped value.
   * @template T - The type of the wrapped value
   * @returns {T} The wrapped value
   */
  get value(): T {
    return this.val
  }
}

/**
 * Wraps a value in a Wrapped instance.
 * @template T - The type of the value to wrap
 * @param val - The value to wrap
 * @returns {Wrapped<T>} A Wrapped instance containing the value
 */
export function wrap<T>(val: T): Wrapped<T> {
  return new Wrapped(val)
}
