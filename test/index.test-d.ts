import { describe, expectTypeOf, it } from 'vitest'
import { Wrapped, wrap } from '~/index'

describe('Wrapped class type tests', () => {
  it('let returns Wrapped<U>', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.let(it => `${it}`)
    expectTypeOf(result).toEqualTypeOf<Wrapped<string>>()
  })

  it('also returns this', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.also(() => {})
    expectTypeOf(result).toEqualTypeOf<Wrapped<number>>()
  })

  it('takeIf returns this or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeIf(it => it > 3)
    expectTypeOf(result).toEqualTypeOf<Wrapped<number> | undefined>()
  })

  it('takeUnless returns this or undefined', () => {
    const wrapped = new Wrapped(5)
    const result = wrapped.takeUnless(it => it > 3)
    expectTypeOf(result).toEqualTypeOf<Wrapped<number> | undefined>()
  })

  it('takeIfNotNil returns Wrapped<NonNullable<T>> or undefined', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.takeIfNotNil()
    expectTypeOf(result).toEqualTypeOf<Wrapped<number> | undefined>()
  })

  it('orDefault returns Wrapped<NonNullable<T>>', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.orDefault(10)
    expectTypeOf(result).toEqualTypeOf<Wrapped<number>>()
  })

  it('orElse returns Wrapped<NonNullable<T>>', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.orElse(() => 10)
    expectTypeOf(result).toEqualTypeOf<Wrapped<number>>()
  })

  it('getOrDefault returns NonNullable<T>', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.getOrDefault(10)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  it('getOrElse returns NonNullable<T>', () => {
    const wrapped = new Wrapped<number | null>(null)
    const result = wrapped.getOrElse(() => 10)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  it('wrap returns Wrapped<T>', () => {
    const result = wrap(5)
    expectTypeOf(result).toEqualTypeOf<Wrapped<number>>()
  })
})
