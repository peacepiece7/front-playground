import { Loading } from '@/components/Common/Loading'
import { useTodos } from '@/hooks/fetchTodo'

import { font, size } from '@/styles/variable'
import styled from 'styled-components'

interface RootLayoutProps {
  children: React.ReactNode
}

const Wrapper = styled.div`
  max-width: ${size.maxWidth};
  margin: auto;
  font-size: ${font.size.base};
`

export const RootLayout = ({ children }: RootLayoutProps) => {
  const { todos, isLoading, isError } = useTodos()
  if (isLoading) return <Loading text={'투두 리스트 불러오는 중'} />
  if (isError) throw new Error('투두 리스트를 불러오는데 실패했습니다.')
  console.log('strict 모드 이기 떄문에 todos는 두 번 호출됩니다. ', todos)
  return <Wrapper>{children}</Wrapper>
}
