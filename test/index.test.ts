import { describe, expect, it, vi } from 'vitest'
import { Wrapped, wrap } from '~/index'

describe('wrapped', () => {
  it('let transforms the wrapped value', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.let(it => it * 2).value
    expect(result).toBe(10)
  })

  it('also applies the function to the wrapped value', () => {
    const wrapped = new Wrapped(5)
    const spy = vi.fn()
    wrapped.also(spy)
    expect(spy).toHaveBeenCalledWith(5)
  })

  it('takeIf returns the same instance if condition is true', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeIf(it => it > 3)
    expect(result).toBe(wrapped)
  })

  it('takeIf returns undefined if condition is false', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeIf(it => it < 3)
    expect(result).toBeUndefined()
  })

  it('takeUnless returns the same instance if condition is false', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeUnless(it => it < 3)
    expect(result).toBe(wrapped)
  })

  it('takeUnless returns undefined if condition is true', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeUnless(it => it > 3)
    expect(result).toBeUndefined()
  })

  it('takeIfNotNil returns the same instance if value is not null or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeIfNotNil()
    expect(result).toBe(wrapped)
  })

  it('takeIfNotNil returns undefined if value is null or undefined', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.takeIfNotNil()
    expect(result).toBeUndefined()
  })

  it('orDefault returns a new instance with default value if value is null or undefined', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.orDefault(10).value
    expect(result).toBe(10)
  })

  it('orDefault returns the same instance if value is not null or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.orDefault(10)
    expect(result).toBe(wrapped)
  })

  it('orElse returns a new instance with value from function if value is null or undefined', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.orElse(() => 10).value
    expect(result).toBe(10)
  })

  it('orElse returns the same instance if value is not null or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.orElse(() => 10)
    expect(result).toBe(wrapped)
  })

  it('getOrDefault returns the default value if value is null or undefined', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.getOrDefault(10)
    expect(result).toBe(10)
  })

  it('getOrDefault returns the wrapped value if it is not null or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.getOrDefault(10)
    expect(result).toBe(5)
  })

  it('getOrElse returns the value from function if value is null or undefined', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.getOrElse(() => 10)
    expect(result).toBe(10)
  })

  it('getOrElse returns the wrapped value if it is not null or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.getOrElse(() => 10)
    expect(result).toBe(5)
  })

  it('wrap creates a Wrapped instance', () => {
    const wrapped = wrap(5)
    expect(wrapped).toBeInstanceOf(Wrapped)
    expect(wrapped.value).toBe(5)
  })
})
