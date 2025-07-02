import { Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Nav from './pages/Nav'
import { Toaster } from 'react-hot-toast'
import useGlobalShortcut from './hook/useGlobalShortcut'


function App() {

  useGlobalShortcut();
  return (
    <div>
      <Nav />
      <Outlet />
      <Toaster position="top-left" />
    </div>
  )
}

export default App
