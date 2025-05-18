import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// import UserManagement from './pages/Penduduk/UserManagementPage'
import Sidebar from './component/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import { UserManagement } from './pages/user management/UserManagement'
import Register from './pages/register/RegisterPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<UserManagement/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path ="/register" element={<Register/>} />
           
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
