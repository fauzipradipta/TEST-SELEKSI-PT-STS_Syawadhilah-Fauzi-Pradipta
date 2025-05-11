import { useState, useEffect } from 'react';
import { UserForm } from './UserForm';
import { UserList } from './UserList';
import type { User, UserFormData } from '../../types/userTypes'
import '../../styles/UserManagement.css';

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'admin_jakarta',
        password: 'hashed_password',
        level: 'admin-provinsi',
        wilayah: 'DKI Jakarta',
        createdAt: new Date('2023-01-15')
      },
      {
        id: '2',
        username: 'admin_jatinegara',
        password: 'hashed_password',
        level: 'admin-kecamatan',
        wilayah: 'Jatinegara',
        createdAt: new Date('2023-02-20')
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date()
    };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleUpdateUser = (userData: UserFormData) => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...userData } 
        : user
    );
    
    setUsers(updatedUsers);
    setEditingUser(null);
    setShowForm(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div className="user-management">
      <h1>User Management (Admin Pusat)</h1>
      
      <div className="controls">
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="add-user-button"
          >
            Add New User
          </button>
        )}
      </div>

      {showForm && (
        <UserForm
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          initialData={editingUser || undefined}
          isEditing={!!editingUser}
          onCancel={handleCancelEdit}
        />
      )}

      <UserList 
        users={users} 
        onEdit={handleEditClick}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};