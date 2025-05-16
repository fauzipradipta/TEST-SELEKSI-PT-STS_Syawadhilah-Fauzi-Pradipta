import React from 'react';
import type { User, UserLevel } from '../../types/userTypes';


interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const levelLabels: Record<UserLevel, string> = {
  'admin-pusat': 'Admin Pusat',
  'admin-provinsi': 'Admin Provinsi',
  'admin-kabupaten': 'Admin Kabupaten',
  'admin-kecamatan': 'Admin Kecamatan',
  'admin-kelurahan': 'Admin Kelurahan'
};

export const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Level</th>
            <th>Wilayah Kerja</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{levelLabels[user.level]}</td>
              <td>{user.wilayah}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="actions">
                <button onClick={() => onEdit(user)} className="edit-button">
                  Update
                </button>
                <button onClick={() => onDelete(user.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};