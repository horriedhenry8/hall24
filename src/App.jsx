import { Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import routes from './routes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster position="top-left" />
    </div>
  )
}

export default App
