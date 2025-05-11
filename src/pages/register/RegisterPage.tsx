import React, { useState,useEffect } from "react";
import axios from "axios";

interface Wilayah {
    id: number;
    nama: string;
}
const RegisterPage = () => {

  const [nik, setNik] = useState('')
  const [nama, setNama] = useState('')
  const [noHp, setNoHp] = useState('')

  const [provinsiList, setProvinsiList] = useState<Wilayah[]>([])
  const [kabupatenList, setKabupatenList] = useState<Wilayah[]>([])
  const [kecamatanList, setKecamatanList] = useState<Wilayah[]>([])
  const [kelurahanList, setKelurahanList] = useState<Wilayah[]>([])

  const [selectedProvinsi, setSelectedProvinsi] = useState('')
  const [selectedKabupaten, setSelectedKabupaten] = useState('')
  const [selectedKecamatan, setSelectedKecamatan] = useState('')
  const [selectedKelurahan, setSelectedKelurahan] = useState('')

  useEffect(() => {
    axios.get('/api/provinsi').then(res => setProvinsiList(res.data))
  }, [])

  useEffect(() => {
    if (selectedProvinsi) {
      axios.get(`/api/kabupaten?provinsi=${selectedProvinsi}`).then(res => setKabupatenList(res.data))
    }
  }, [selectedProvinsi])

  useEffect(() => {
    if (selectedKabupaten) {
      axios.get(`/api/kecamatan?kabupaten=${selectedKabupaten}`).then(res => setKecamatanList(res.data))
    }
  }, [selectedKabupaten])

  useEffect(() => {
    if (selectedKecamatan) {
      axios.get(`/api/kelurahan?kecamatan=${selectedKecamatan}`).then(res => setKelurahanList(res.data))
    }
  }, [selectedKecamatan])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post('/api/Penduduk', {
      nik,
      nama,
      noHp,
      provinsi: selectedProvinsi,
      kabupaten: selectedKabupaten,
      kecamatan: selectedKecamatan,
      kelurahan: selectedKelurahan,
    })
    alert('Pendaftaran berhasil')
  }

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>No. KTP</label>
        <input type="text" maxLength={16} value={nik} onChange={e => setNik(e.target.value)} required className="border px-2 py-1 w-full" />
      </div>
      <div>
        <label>Nama</label>
        <input type="text" value={nama} onChange={e => setNama(e.target.value)} required className="border px-2 py-1 w-full" />
      </div>
      <div>
        <label>No. Handphone</label>
        <input type="text" value={noHp} onChange={e => setNoHp(e.target.value)} required className="border px-2 py-1 w-full" />
      </div>
      <div>
        <label>Provinsi</label>
        <select value={selectedProvinsi} onChange={e => setSelectedProvinsi(e.target.value)} required className="border px-2 py-1 w-full">
          <option value="">-- Pilih Provinsi --</option>
          {/* {provinsiList.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)} */}
           {Array.isArray(provinsiList) && provinsiList.map(item => (
                <option key={item.id} value={item.id}>{item.nama}</option>
            ))}
        </select>
      </div>
      <div>
        <label>Kabupaten</label>
        <select value={selectedKabupaten} onChange={e => setSelectedKabupaten(e.target.value)} required className="border px-2 py-1 w-full">
          <option value="">-- Pilih Kabupaten --</option>
          {kabupatenList.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
        </select>
      </div>
      <div>
        <label>Kecamatan</label>
        <select value={selectedKecamatan} onChange={e => setSelectedKecamatan(e.target.value)} required className="border px-2 py-1 w-full">
          <option value="">-- Pilih Kecamatan --</option>
          {kecamatanList.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
        </select>
      </div>
      <div>
        <label>Kelurahan</label>
        <select value={selectedKelurahan} onChange={e => setSelectedKelurahan(e.target.value)} required className="border px-2 py-1 w-full">
          <option value="">-- Pilih Kelurahan --</option>
          {kelurahanList.map(item => <option key={item.id} value={item.id}>{item.nama}</option>)}
        </select>
      </div>
      <button type="submit" className="button">Register</button>
    </form>
)
}

export default RegisterPage;