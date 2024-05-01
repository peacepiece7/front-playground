import { create } from 'zustand'
import { redux } from 'zustand/middleware'

// FLUX Pattern

type GrumpyDispatchType = 'INCREASE' | 'DECREASE'
type GrumpyActionArgs = { type: GrumpyDispatchType; by?: number }
interface GrumpyState {
  grumpiness: number
}
interface GrumpyActions {
  dispatch: (args: GrumpyActionArgs) => unknown
}
const types = { increase: 'INCREASE', decrease: 'DECREASE' } as const

const reducer = (state: GrumpyState, { type, by = 1 }: GrumpyActionArgs) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by }
    case types.decrease:
      return { grumpiness: state.grumpiness - by }
  }
}

// 고차함수로 직접 구현하거나
const useGrumpyStore = create<GrumpyState & GrumpyActions>((set) => ({
  grumpiness: 0,
  dispatch: (args) => set((state) => reducer(state, args)),
}))

// redux 미들웨어를 사용하여 구현할 수 있습니다.
const useReduxStore = create(redux(reducer, { grumpiness: 0 }))

export const LikeRedux = () => {
  const grumyDispatch = useGrumpyStore((state) => state.dispatch)
  const grumpiness = useGrumpyStore((state) => state.grumpiness)

  const dispatch = useReduxStore((state) => state.dispatch)
  const grumpinessRedux = useReduxStore((state) => state.grumpiness)
  return (
    <div>
      {'grumpiness : ' + grumpiness}
      <div>
        <button onClick={() => grumyDispatch({ type: 'INCREASE', by: 1 })}>
          INCREASE
        </button>
        <button onClick={() => grumyDispatch({ type: 'DECREASE', by: 1 })}>
          DECREASE
        </button>
      </div>
      {'grumpiness : ' + grumpinessRedux}
      <div>
        <button onClick={() => dispatch({ type: 'INCREASE', by: 1 })}>
          INCREASE
        </button>
        <button onClick={() => dispatch({ type: 'DECREASE', by: 1 })}>
          DECREASE
        </button>
      </div>
    </div>
  )
}
