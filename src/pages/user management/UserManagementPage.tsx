import React,{useState,useEffect} from "react";
import axios from "axios";
import "../../styles/UserManagement.css";

interface Anggota {
  id: number
  nik: string
  nama: string
  noHp: string
  provinsi: string
  kabupaten: string
  kecamatan: string
  kelurahan: string
}

const UserManagement = () => {
  const [anggotaList, setAnggotaList] = useState<Anggota[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchAnggota()
  }, [])

  const fetchAnggota = async () => {
    const dummyData: Anggota[] = [
      {
        id: 1,
        nik: '1234567890',
        nama: 'John Doe',
        noHp: '08123456789',
        provinsi: 'Jawa Barat',
        kabupaten: 'Bandung',
        kecamatan: 'Cicendo',
        kelurahan: 'Sukamaju',
      },
      {
        id: 2,
        nik: '0987654321',
        nama: 'Jane Smith',
        noHp: '08987654321',
        provinsi: 'DKI Jakarta',
        kabupaten: 'Jakarta Selatan',
        kecamatan: 'Kebayoran Baru',
        kelurahan: 'Gandaria',
      },
      {
        id: 3,
        nik: '0987654321',
        nama: 'Syawadhilah Fauzi Pradipta',
        noHp: '08987654321',
        provinsi: 'DKI Jakarta',
        kabupaten: 'Jakarta Selatan',
        kecamatan: 'Kebayoran Baru',
        kelurahan: 'Gandaria',
      },
      {
        id: 4,
        nik: '0987654321',
        nama: 'Syawadhilah Fauzi Pradipta',
        noHp: '08987654321',
        provinsi: 'DKI Jakarta',
        kabupaten: 'Jakarta Selatan',
        kecamatan: 'Kebayoran Baru',
        kelurahan: 'Gandaria',
      },
      {
        id: 5,
        nik: '0987654321',
        nama: 'Jake Paul',
        noHp: '08987654321',
        provinsi: 'DKI Jakarta',
        kabupaten: 'Jakarta Selatan',
        kecamatan: 'Kebayoran Baru',
        kelurahan: 'Gandaria',
      },
      {
        id: 6,
        nik: '0987654321',
        nama: 'Kylie Jenner',
        noHp: '08987654321',
        provinsi: 'DKI Jakarta',
        kabupaten:'Jakarta Timur',
        kecamatan: 'Jatinegara',
        kelurahan: 'Cipinang',
      },
    ]
    setAnggotaList(dummyData)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus anggota ini?')) {
      setAnggotaList(prev => prev.filter(anggota => anggota.id !== id))
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = anggotaList.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(anggotaList.length / itemsPerPage)

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Manajemen Anggota</h2>
      <table className="anggota-table">
        <thead>
          <tr className="anggota-table-header">
            <th>NIK</th>
            <th>Nama</th>
            <th>No. HP</th>
            <th>Provinsi</th>
            <th>Kabupaten</th>
            <th>Kecamatan</th>
            <th>Kelurahan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(anggota => (
            <tr key={anggota.id}>
              <td>{anggota.nik}</td>
              <td>{anggota.nama}</td>
              <td>{anggota.noHp}</td>
              <td>{anggota.provinsi}</td>
              <td>{anggota.kabupaten}</td>
              <td>{anggota.kecamatan}</td>
              <td>{anggota.kelurahan}</td>
              <td>
                <button onClick={() => handleDelete(anggota.id)} className="button">
                  Update
                </button>
                <button onClick={() => handleDelete(anggota.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserManagement;