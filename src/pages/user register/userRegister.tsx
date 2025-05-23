import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/UserRegister.css';
import { registerUser } from "../../service/api";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  regionLevel: string;
}

const UserRegister = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    regionLevel: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.regionLevel) newErrors.regionLevel = 'Region Level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof FormData) => {
    validateForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      navigate('/user-management');
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      
      setErrors({
        ...errors,
        form: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-register-container">
      <h2>Register New User</h2>
      {success && (
        <div className="success-message">
          Registration successful!
        </div>
      )}
      <form className="user-register-form" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          onBlur={() => handleBlur('username')}
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur('password')}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Region Level:</label>
        <input
          type="text"
          name="regionLevel"
          required
          value={formData.regionLevel}
          onChange={handleChange}
          onBlur={() => handleBlur('regionLevel')}
        />
        {errors.regionLevel && <span className="error">{errors.regionLevel}</span>}
        
        {errors.form && <div className="form-error">{errors.form}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default UserRegister;