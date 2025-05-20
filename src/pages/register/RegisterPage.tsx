import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerMember } from '../../service/memberApi';
import { Region } from '../../types/region'; 
import '../../styles/Register.css';

const RegisterMember = () => {
  const [formData, setFormData] = useState({
    nik: '',
    name: '',
    phone: '',
    provinceId: 0,
    regencyId: 0,
    districtId: 0,
    villageId: 0
  });
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [regencies, setRegencies] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [villages, setVillages] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch provinces on component mount
    const fetchProvinces = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/regions?level=PROVINSI`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProvinces(data);
      } catch (err) {
        console.error('Error fetching provinces:', err);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    // Fetch regencies when province is selected
    if (formData.provinceId > 0) {
      const fetchRegencies = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');
          
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/regions?parentId=${formData.provinceId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const data = await response.json();
          setRegencies(data);
          setFormData(prev => ({ ...prev, regencyId: 0, districtId: 0, villageId: 0 }));
        } catch (err) {
          console.error('Error fetching regencies:', err);
        }
      };

      fetchRegencies();
    }
  }, [formData.provinceId]);

  useEffect(() => {
    // Fetch districts when regency is selected
    if (formData.regencyId > 0) {
      const fetchDistricts = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');
          
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/regions?parentId=${formData.regencyId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const data = await response.json();
          setDistricts(data);
          setFormData(prev => ({ ...prev, districtId: 0, villageId: 0 }));
        } catch (err) {
          console.error('Error fetching districts:', err);
        }
      };

      fetchDistricts();
    }
  }, [formData.regencyId]);
  
  useEffect(() => {
    // Fetch regencies when province is selected
    if (formData.villageId > 0) {
      const fetchVillage = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');
          
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/regions?parentId=${formData.villageId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const data = await response.json();
          setVillages(data);
          setFormData(prev => ({ ...prev, regencyId: 0, districtId: 0, villageId: 0 }));
        } catch (err) {
          console.error('Error fetching regencies:', err);
        }
      };

      fetchVillage();
    }
  }, [formData.villageId]);

  useEffect(() => {
    // Fetch regencies when province is selected
    if (formData.villageId > 0) {
      const fetchVillage = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');
          
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/regions?parentId=${formData.villageId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const data = await response.json();
          setVillages(data);
          setFormData(prev => ({ ...prev, regencyId: 0, districtId: 0, villageId: 0 }));
        } catch (err) {
          console.error('Error fetching regencies:', err);
        }
      };

      fetchVillage();
    }
  }, [formData.villageId]);
    
  // Similar useEffect for districts and villages...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      
      await registerMember({ token, formData });
      setSuccess(true);
      setTimeout(() => navigate('/members'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.endsWith('Id') ? parseInt(value) : value
    }));
  };

  return (
    <div className="register-container">
      <h1>Register New Member</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Member registered successfully!</div>}

      <form onSubmit={handleSubmit} className="member-form">
        <div className="form-group">
          <label>NIK (16 digits)</label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            pattern="\d{16}"
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Province</label>
          <select
            name="provinceId"
            value={formData.provinceId}
            onChange={handleChange}
            required
          >
            <option value={0}>Select Province</option>
            {provinces.map(province => (
              <option key={province.id} value={province.id}>{province.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Province</label>
          <select
            name="regencyId"
            value={formData.regencyId}
            onChange={handleChange}
            required
          >
            <option value={0}>Select Regency</option>
            {regencies.map(regency => (
              <option key={regency.id} value={regency.id}>{regency.name}</option>
            ))}
          </select>
        </div>    
        <div className="form-group">
          <label>District</label>
          <select
            name="districtId"
            value={formData.districtId}
            onChange={handleChange}
            required
          >
            <option value={0}>Select District</option>
            {regencies.map(districts => (
              <option key={districts.id} value={districts.id}>{districts.name}</option>
            ))}
          </select>
        </div>    

        <div className="form-group">
          <label>Village</label>
          <select
            name="villageId"
            value={formData.villageId}
            onChange={handleChange}
            required
          >
            <option value={0}>Select Village</option>
            {regencies.map(villages=> (
              <option key={villages.id} value={villages.id}>{villages.name}</option>
            ))}
          </select>
        </div> 
        {/* Similar select elements for regency, district, and village */}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Registering...' : 'Register Member'}
        </button>
      </form>
    </div>
  );
};

export default RegisterMember;