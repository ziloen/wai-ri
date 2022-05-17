import { IsPos, ToPos, GreatThan } from './Number'

export type Max<N extends number[], N1 extends N[0]> = {
  [K in keyof N]: GreatThan<N[K], N1>
}[number]
// export type Max<N1 extends number, N2 extends number> = 0

export type Min<N extends number[]> = 0


export type Floor<N extends number> = 0


export type Round<N extends number> = 0


export type Sign<N extends number> = N extends 0 ? 0 : IsPos<N> extends true ? 1 : -1


export type Abs<N extends number> = ToPos<N>