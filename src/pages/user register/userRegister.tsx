import React,{useEffect,useState} from "react";
// import axios from "axios";
import '../../styles/UserRegister.css';


const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin_pusat',
  });

//   const [wilayahOptions, setWilayahOptions] = useState([]);

//   useEffect(() => {
//     const fetchWilayah = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/domisili/${formData.role}`);
//         const data = await res.json();
//         setWilayahOptions(data);
//       } catch (error) {
//         console.error('Error fetching wilayah:', error);
//       }
//     };

//     fetchWilayah();
//   }, [formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('User registered successfully');
        setFormData({
          username: '',
          password: '',
          role: 'admin_pusat',
        });
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="user-register-container">
      <h2>Register New User</h2>
      <form className="user-register-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <label>Role:</label>
          <input
          type="role"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
        />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;