import { StoreApi, UseBoundStore } from 'zustand'
import { useBearStore } from './Bear'
import { useStoreWithEqualityFn as useStore } from 'zustand/traditional'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-extra-semi
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

const createVanilaSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-extra-semi
    ;(store.use as any)[k] = () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useStore(_store, (s) => s[k as keyof typeof s])
  }

  return store
}

const useBearSeleector = createSelectors(useBearStore)
const useBearVanilaSeleector = createVanilaSelectors(useBearStore)

export const SelectorExample = () => {
  const bears = useBearSeleector.use.bears()
  const vanilaBears = useBearVanilaSeleector.use.bears()

  const bearStore = useBearStore()
  return (
    <div>
      <div>SELECTOR : {bears}</div>
      <div>VANILA SELECTOR : {vanilaBears}</div>
      <div>BEAR STORE : {bearStore.bears}</div>
      <button onClick={() => bearStore.increase(1)}>INCREMENT</button>
    </div>
  )
}
