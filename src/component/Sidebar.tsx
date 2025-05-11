import React,{useState} from 'react';
import {Link,Outlet,useLocation} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)
    return(
        <div className="layout-container">
            <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
                <div className='sidebar-header'>
                    <h2 className="sidebar-title">Admin</h2>
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                    {isOpen ? '✕' : '☰'}
                    </button>
                </div>
               
                <nav className="sidebar-nav">
                <Link
                    to="/dashboard"
                    className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/management"
                    className={`sidebar-link ${location.pathname === '/management' ? 'active' : ''}`}
                >
                    Penduduk
                </Link>
                </nav>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
    </div>
    )
}

export default Sidebar;