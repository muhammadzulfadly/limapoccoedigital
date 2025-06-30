'use client'

import {
  Ban,
  Cog,
  FileText,
  BadgeCheck,
  UserCheck,
  Search,
  SlidersHorizontal,
  FileDown,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const [stats, setStats] = useState({
    sedangProses: 0,
    butuhKonfirmasi: 0,
    ditolak: 0,
    selesai: 0,
  })

  const [ajuanList, setAjuanList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ajuan-surat/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })

        const data = await res.json()
        console.log(data);
        const list = Array.isArray(data.ajuan_surat) ? data.ajuan_surat : []
        console.log(list);

        const statusCount = list.reduce(
          (acc, item) => {
            const s = normalisasiStatus(item.status)
            if (s === 'sedang proses') acc.sedangProses++
            else if (s === 'butuh konfirmasi') acc.butuhKonfirmasi++
            else if (s === 'ditolak') acc.ditolak++
            else if (s === 'selesai') acc.selesai++
            return acc
          },
          { sedangProses: 0, butuhKonfirmasi: 0, ditolak: 0, selesai: 0 }
        )

        setAjuanList(list)
        setStats(statusCount)
      } catch (err) {
        console.error('❌ Gagal memuat data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const normalisasiStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'processed': return 'sedang proses'
      case 'pending': return 'butuh konfirmasi'
      case 'rejected': return 'ditolak'
      case 'completed': return 'selesai'
      default: return status?.toLowerCase() || '-'
    }
  }

  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const statusStyle = {
    selesai: 'text-green-600 font-semibold',
    'butuh konfirmasi': 'text-blue-600 font-semibold',
    ditolak: 'text-red-600 font-semibold',
    'sedang proses': 'text-gray-500 font-semibold',
  }

  const iconStyle = (status) => {
    const s = normalisasiStatus(status)
    return s === 'selesai' ? <FileDown className="text-green-600" /> : <Search className="text-blue-600" />
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-bold mb-6">Dashboard Pengajuan Surat</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardDashboard count={stats.sedangProses} label="Sedang Proses" icon={<Cog size={50} className="text-gray-500" />} />
          <CardDashboard count={stats.butuhKonfirmasi} label="Butuh Konfirmasi" icon={<BadgeCheck size={50} className="text-teal-600" />} />
          <CardDashboard count={stats.ditolak} label="Ditolak" icon={<Ban size={50} className="text-red-500" />} />
          <CardDashboard count={stats.selesai} label="Selesai" icon={<UserCheck size={50} className="text-green-500" />} />
          <CardDashboard label="User Guide" count="" icon={<FileText size={50} className="text-gray-800" />} linkText="Lihat panduan" href="#" />
        </div>

        <div className="border-t border-gray-400 my-6"></div>
        <div className="flex justify-end mb-6">
          <div className="flex items-center border border-gray-500 rounded-md px-4 py-2 bg-white text-gray-500">
            <Search className="w-5 h-5 mr-3" />
            <input type="text" placeholder="Cari" className="outline-none text-sm w-28 bg-white placeholder-gray-500" />
            <SlidersHorizontal className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-black">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-2 w-1/5 border border-black">Tanggal</th>
                <th className="px-4 py-2 w-1/5 border border-black">Nama</th>
                <th className="px-4 py-2 w-1/5 border border-black">Status</th>
                <th className="px-4 py-2 w-1/5 border border-black">Jenis surat</th>
                <th className="px-4 py-2 w-1/5 border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 italic text-gray-500">Memuat data...</td>
                </tr>
              ) : ajuanList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-700">Belum ada pengajuan surat</td>
                </tr>
              ) : (
                ajuanList.map((item) => {
                  const normalizedStatus = normalisasiStatus(item.status)
                  return (
                    <tr key={item.id} className="bg-white text-center">
                      <td className="px-4 py-2 border border-black">{formatTanggal(item.created_at)}</td>
                      <td className="px-4 py-2 border border-black">{item.user?.name || '-'}</td>
                      <td className={`border border-black p-2 ${statusStyle[normalizedStatus]}`}>{normalizedStatus}</td>
                      <td className="px-4 py-2 border border-black">{item.category || '-'}</td>
                      <td className="border border-black p-2">
                        <Link
                          href={`/admin/pengajuan-surat/${item.id}`}
                          className="flex justify-center items-center gap-1 hover:underline"
                        >
                          {iconStyle(normalizedStatus)}
                          <span className="text-sm">{normalizedStatus === 'selesai' ? 'Unduh' : 'Buka'}</span>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function CardDashboard({ count, label, icon, linkText, href }) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div>
        <div className="text-xl font-semibold">{count}</div>
        <div className="text-sm text-gray-500">{label}</div>
        {linkText && href && (
          <Link href={href} className="text-xs text-blue-500 hover:underline block mt-1">
            {linkText}
          </Link>
        )}
      </div>
      {icon}
    </div>
  )
}
