import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='bear'>zustand 기본 사용법</Link>
          </li>
          <li>
            <Link to='like-redux'>redux 처럼 쓰기</Link>
          </li>
          <li>
            <Link to='selector'>selector example</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
