import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Link to='/signUp'>SignUp</Link>
      <Outlet />
    </>
  )
}

export default App
