'use client';

import { useEffect, useState } from 'react';
import { Clock, CheckCheck, UserCheck, FileText, Plus, Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAduan = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/masyarakat/pengaduan-masyarakat', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setData(result.aduan || []);
    };

    fetchAduan();
  }, []);

  const statusStyle = {
    Selesai: 'text-green-600 font-semibold',
    Diterima: 'text-teal-800 font-semibold',
    Menunggu: 'text-orange-600 font-semibold',
  };

  const iconStyle = {
    Buka: <Search className="text-blue-400" />,
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <header>
          <h1 className="text-xl font-bold mb-6">Pengaduan</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {['Menunggu', 'Diterima', 'Selesai'].map((status) => {
            const jumlah = data.filter((item) => item.status === status).length;
            const Icon = status === 'Menunggu' ? Clock : status === 'Diterima' ? CheckCheck : UserCheck;
            const iconColor =
              status === 'Menunggu' ? 'text-orange-500' : status === 'Diterima' ? 'text-teal-800' : 'text-green-600';

            return (
              <div key={status} className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xl font-semibold">{jumlah}</p>
                  <p className="text-sm text-gray-500">{status}</p>
                </div>
                <Icon size={50} className={iconColor} />
              </div>
            );
          })}

          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="font-semibold">User Guid</p>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Lihat panduan
              </Link>
            </div>
            <FileText size={50} className="text-gray-800" />
          </div>
        </div>

        <hr className="border-gray-400 mb-6" />

        <div className="flex justify-between items-center mb-6">
          <Link href="/masyarakat/pengaduan-masyarakat/buat-pengaduan">
            <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition">
              <Plus className="w-5 h-5" strokeWidth={3} />
              Buat Pengaduan
            </button>
          </Link>

          <div className="flex items-center border border-gray-500 rounded-md px-4 py-2 bg-white text-gray-500 transition-colors w-72">
            <Search className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Masukkan Jenis Pengaduan"
              className="flex-1 outline-none text-sm bg-white placeholder-gray-500"
            />
            <SlidersHorizontal className="w-4 h-4 ml-2" />
          </div>
        </div>

        <table className="w-full table-fixed border border-black">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="border border-black p-2 w-1/5">Tanggal</th>
              <th className="border border-black p-2 w-2/5">Jenis Pengaduan</th>
              <th className="border border-black p-2 w-1/5">Status</th>
              <th className="border border-black p-2 w-1/5">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="bg-white text-center">
                <td className="border border-black p-2">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                <td className="border border-black p-2">{item.jenis_pengaduan}</td>
                <td className={`border border-black p-2 ${statusStyle[item.status] || ''}`}>{item.status}</td>
                <td className="border border-black p-2">
                  <Link
                    href={`/masyarakat/pengaduan-masyarakat/${item.id}`}
                    className="flex justify-center items-center gap-1"
                  >
                    {iconStyle['Buka']}
                    <span className="text-sm text-black">Buka</span>
                  </Link>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="bg-white text-center text-black py-4">
                 Belum ada proses pengaduan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
