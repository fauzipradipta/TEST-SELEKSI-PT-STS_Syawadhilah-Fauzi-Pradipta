import React,{useEffect,useState} from "react";
import axios from "axios";
import '../../styles/UserRegister.css';
import { registerUser } from "../../service/api";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    regionLevel: '',
  });
 const [errors, setErrors] = useState<Record<string, string>>({});
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.regionLevel) newErrors.regionLevel = 'Region Level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
       setLoading(true);
       setSuccess(false);
       
       if (!validateForm()) {
         setLoading(false);
         return;
       }
   
       try {
         await registerUser({
            username: formData.username,
            password: formData.password,
            regionLevel: formData.regionLevel,
         });
         
         setSuccess(true);
         setFormData({
          username: '',
          password: '',
          regionLevel: '',
         });
       } catch (error) {
         console.error('Registration error:', error);
         setErrors({
           ...errors,
           form: 'Registration failed. Please try again.'
         });
       } finally {
         setLoading(false);
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
          type="regionLevel"
          name="regionLevel"
          required
          value={formData.regionLevel}
          onChange={handleChange}
        />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;