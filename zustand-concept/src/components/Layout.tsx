import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='test'>TEST</Link>
          </li>
          <li>
            <Link to='foo'>FOO</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
