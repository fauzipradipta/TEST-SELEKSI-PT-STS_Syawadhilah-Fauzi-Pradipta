import { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { registerMember } from '../../service/memberApi';
// import { Region } from '../../types/region'; 
import '../../styles/Register.css';


const RegisterMember = () => {
  const [formData, setFormData] = useState({
    nik: '',
    name: '',
    phone: '',
    province: '',
    regency: '',
    district: '',
    village: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nik) newErrors.nik = 'NIK is required';
    else if (!/^\d{16}$/.test(formData.nik)) newErrors.nik = 'NIK must be 16 digits';
    
    if (!formData.name) newErrors.name = 'Name is required';
    
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'Phone must contain only numbers';
    
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.regency) newErrors.regency = 'Regency is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.village) newErrors.village = 'Village is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      await registerMember({
        nik: formData.nik,
        name: formData.name,
        phone: formData.phone,
        province: formData.province,
        regency: formData.regency,
        district: formData.district,
        village: formData.village
      });
      
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        nik: '',
        name: '',
        phone: '',
        province: '',
        regency: '',
        district: '',
        village: ''
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
    <div className="registration-container">
      <h2>Member Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {errors.form && <div className="error-message">{errors.form}</div>}

        <div className="form-group">
          <label htmlFor="nik">NIK (16 digits)</label>
          <input
            type="text"
            id="nik"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            maxLength={16}
            placeholder="Enter 16-digit NIK"
          />
          {errors.nik && <span className="error-text">{errors.nik}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="address-section">
          <h3>Address Information</h3>
          
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Enter province"
            />
            {errors.province && <span className="error-text">{errors.province}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="regency">Regency</label>
            <input
              type="text"
              id="regency"
              name="regency"
              value={formData.regency}
              onChange={handleChange}
              placeholder="Enter regency"
            />
            {errors.regency && <span className="error-text">{errors.regency}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="district">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter district"
            />
            {errors.district && <span className="error-text">{errors.district}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="village">Village</label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="Enter village"
            />
            {errors.village && <span className="error-text">{errors.village}</span>}
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Registering...' : 'Register Member'}
        </button>

        {success && (
          <div className="success-message">
            Member registered successfully!
          </div>
        )}
      </form>
    </div>
  );
};


export default RegisterMember;