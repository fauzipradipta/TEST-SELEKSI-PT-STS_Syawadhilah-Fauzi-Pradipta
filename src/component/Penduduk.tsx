import React,{useState,useEffect} from "react";
import axios from "axios";
import "../styles/Penduduk.css";

interface Penduduk {
  id: number
  nik: string
  nama: string
  noHp: string
  provinsi: string
  kabupaten: string
  kecamatan: string
  kelurahan: string
}

const PendudukComponent = () => {
  const [PendudukList, setPendudukList] = useState<Penduduk[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchPenduduk()
  }, [])

  const fetchPenduduk = async () => {
    const dummyData: Penduduk[] = [
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
    setPendudukList(dummyData)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus Penduduk ini?')) {
      setPendudukList(prev => prev.filter(Penduduk => Penduduk.id !== id))
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = PendudukList.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(PendudukList.length / itemsPerPage)

  return (
    <div className="Penduduk-container">
      <h2 className="Penduduk-title">Manajemen Penduduk</h2>
      <table className="Penduduk-table">
        <thead>
          <tr className="Penduduk-table-header">
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
          {currentItems.map(Penduduk => (
            <tr key={Penduduk.id}>
              <td>{Penduduk.nik}</td>
              <td>{Penduduk.nama}</td>
              <td>{Penduduk.noHp}</td>
              <td>{Penduduk.provinsi}</td>
              <td>{Penduduk.kabupaten}</td>
              <td>{Penduduk.kecamatan}</td>
              <td>{Penduduk.kelurahan}</td>
              <td>
                <button onClick={() => handleDelete(Penduduk.id)} className="button">
                  Update
                </button>
                <button onClick={() => handleDelete(Penduduk.id)} className="delete-button">
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

export default PendudukComponent;