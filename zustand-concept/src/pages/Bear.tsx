import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface BearState {
  bears: number
  increase: (by: number) => void
}

export interface BearActions {
  decrease: (by: number) => void
  increase: (by: number) => void
}

export const useBearStore = create<BearState & BearActions>()((set) => {
  return {
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    decrease: (by) => set((state) => ({ bears: state.bears - by })),
  }
})

const useBearCombineStore = create<BearState & BearActions>(
  combine(useBearStore.getState(), (set) => ({
    // increase: (by: number) => set((state) => ({ bears: state.bears + by })), <= 주의
    decrease: (by: number) => set((state) => ({ bears: state.bears - by })),
  }))
)

interface UserState {
  user: {
    deep: {
      name: string
      age: number
    }
  }
}

// nested state
interface UserActions {
  setName: (name: string) => void
  setAge: (age: number) => void
}

const deepStore = create<UserState & UserActions>()(
  immer((set) => {
    return {
      user: {
        deep: {
          name: 'deep',
          age: 20,
        },
      },
      setName: (name) =>
        set((state) => {
          state.user.deep.name = name
        }),
      setAge: (age) =>
        set((state) => {
          state.user.deep.age = age
        }),
    }
  })
)

export const Bear = () => {
  const bearStore = useBearCombineStore()
  const bStore = useBearStore()
  const dStore = deepStore()
  return (
    <div>
      <div>useBearCombineStore : {bearStore.bears}</div>
      <div>
        <button onClick={() => bearStore.increase(1)}>Increase</button>
        <button onClick={() => bearStore.decrease(1)}>Decrease</button>
      </div>
      <div>bStore : {bStore.bears}</div>
      <div>
        <button onClick={() => bStore.increase(1)}>Increase</button>
        <button onClick={() => bStore.decrease(1)}>Decrease</button>
      </div>
      <div>
        <div>
          user : {dStore.user.deep.name}, age : {dStore.user.deep.age}
        </div>
        <div>
          <input type='text' onChange={(e) => dStore.setName(e.target.value)} />
          <input
            type='number'
            onChange={(e) => dStore.setAge(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
