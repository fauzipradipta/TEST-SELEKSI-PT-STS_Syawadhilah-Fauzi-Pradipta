import React,{useEffect} from 'react';
import type { User, UserLevel } from '../../types/userTypes';
import { getAllMembers } from '../../service/memberApi';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

interface Members{
    id: string,
    nik: string,
    name: string,
    phone: string,
    province: string,
    regency: string,
    district: string,
    village: string,
    createdAt: string,
}


export const UserList = ({  onEdit, onDelete }: UserListProps) => {
  const [member, setMember] = React.useState<Members[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
   useEffect(() => {
   const fetchMembers = async () => {
  try {
    const data = await getAllMembers();
    console.log(member);
    setMember(Array.isArray(data) ? data : []);
  } catch (err) {
    setError('Failed to load members');
    console.error(err);
    setMember([]);
  } finally {
    setLoading(false);
  }
};

    fetchMembers();
    console.log(member);
    
  }, []);

   if (loading) return <div>Loading members...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list">
      <h2>Member List</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nik</th>
            <th>Nama</th>
            <th>Phone Number</th>
            <th>Provinsi</th>
            <th>Kabupaten</th>
            <th>Kecamatan </th>
            <th>Kelurahan</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(member)?member:[]).map((m,idx)=> (
            <tr key={m.id}>
              <td>{idx + 1}</td>
              <td>{m.nik}</td>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.province}</td>
              <td>{m.regency}</td>
              <td> {m.district}</td>
              <td> {m.village}</td>
              <td>{new Date(m.createdAt).toLocaleDateString()}</td>
              <td className="actions">
                <button onClick={() => onEdit(m)} className="edit-button">
                  Update
                </button>
                <button onClick={() => onDelete(m.id)} className="delete-button">
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