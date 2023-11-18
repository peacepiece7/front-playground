import { font } from '@/styles/variable'
import styled from 'styled-components'

const LoadingWrapper = styled.div`
  font-size: ${font.size.xxl};
  font-weight: ${font.weight.bold};
`

export const Loading = () => {
  return <LoadingWrapper>Loading...</LoadingWrapper>
}
