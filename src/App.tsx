import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/register/RegisterPage'
// import UserManagement from './pages/Penduduk/UserManagementPage'
import Sidebar from './component/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/ " element={<RegisterPage/>} />
          
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/management" element={<UserManagement/>} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
