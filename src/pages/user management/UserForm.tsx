import React, { useState } from 'react';
import type { UserFormData, UserLevel } from '../../types/userTypes';

interface UserFormProps {
  onSubmit: (userData: UserFormData) => void;
  initialData?: UserFormData;
  isEditing?: boolean;
  onCancel?: () => void;
}

const wilayahOptions: Record<UserLevel, string[]> = {
  'admin-pusat': ['Nasional'],
  'admin-provinsi': [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 
    'Banten', 'Bali', 'Sumatera Utara', 'Sumatera Barat'
  ],
  'admin-kabupaten': [
    'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Barat', 
    'Jakarta Utara', 'Jakarta Pusat', 'Kota Bandung', 'Kota Surabaya'
  ],
  'admin-kecamatan': [
    'Jatinegara', 'Tebet', 'Setiabudi', 'Mampang Prapatan',
    'Pancoran', 'Cilandak', 'Kebayoran Baru'
  ],
  'admin-kelurahan': [
    'Kramat Jati', 'Cipinang', 'Kebon Manggis', 'Bidara Cina',
    'Cawang', 'Cililitan', 'Dukuh'
  ]
};

export const UserForm = ({ onSubmit, initialData, isEditing = false, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>(initialData || {
    username: '',
    password: '',
    level: 'admin-provinsi',
    wilayah: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const currentWilayahOptions = wilayahOptions[formData.level] || [];

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">{isEditing ? 'New Password (leave blank to keep current)' : 'Password'}</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="level">User Level</label>
        <select
          id="level"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        >
          <option value="admin-provinsi">Admin Provinsi</option>
          <option value="admin-kabupaten">Admin Kabupaten</option>
          <option value="admin-kecamatan">Admin Kecamatan</option>
          <option value="admin-kelurahan">Admin Kelurahan</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="wilayah">Wilayah Kerja</label>
        <select
          id="wilayah"
          name="wilayah"
          value={formData.wilayah}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Wilayah</option>
          {currentWilayahOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        {isEditing && onCancel && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        )}
        <button type="submit" className="submit-button">
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};