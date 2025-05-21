import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Sidebar from './component/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import { UserManagement } from './pages/user management/UserManagement'
import Register from './pages/register/RegisterPage'
import UserRegister from './pages/user register/userRegister'
import Login from './pages/login/login'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route element={<Sidebar />}>
            <Route path ="/register" element={<Register/>} />
            <Route path="/user-management" element={<UserManagement/>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
