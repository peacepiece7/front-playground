import { create, StateCreator, StoreMutatorIdentifier } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

interface BearState {
  bears: number
  increase: (by: number) => void
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      { name: 'bearStore' }
    )
  )
)

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a)
    console.log(...(name ? [`${name}:`] : []), get())
  }
  const setState = store.setState
  store.setState = (...a) => {
    setState(...a)
    console.log(...(name ? [`${name}:`] : []), store.getState())
  }

  return f(loggedSet, get, store)
}

export const logger = loggerImpl as unknown as Logger

// https://docs.pmnd.rs/zustand/guides/typescript
export const useMyBearStore = create<BearState>()(
  logger(
    devtools(
      persist(
        (set) => ({
          bears: 0,
          increase: (by) => set((state) => ({ bears: state.bears + by })),
        }),
        { name: 'bearStore' }
      )
    )
  )
)
