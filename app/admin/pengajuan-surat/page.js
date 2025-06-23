import { Ban, Cog, FileText, BadgeCheck, UserCheck, Search, SlidersHorizontal, FileDown } from 'lucide-react'
import Link from 'next/link';

export const metadata = {
  title: 'Status Pengajuan',
}

export async function getData() {
  return {
    sedangProses: 0,
    butuhKonfirmasi: 0,
    ditolak: 1,
    selesai: 1,
  }
}

export default async function Page() {
  const data1 = await getData()

  const data = [
    { tanggal: '24/03/25', nama: 'Asep Sofyan', status: 'Sedang proses', jenis: 'SK tidak mampu', action: 'Buka' },
    { tanggal: '24/03/25', nama: 'Asep Sofyan', status: 'Sedang proses', jenis: 'SK tidak mampu', action: 'Buka' },
    { tanggal: '24/03/25', nama: 'Asep Sofyan', status: 'Butuh Konfirmasi', jenis: 'SK Kehilangan', action: 'Buka' },
    { tanggal: '24/03/25', nama: 'Asep Sofyan', status: 'Ditolak', jenis: 'SK Nikah', action: 'Buka' },
    { tanggal: '24/03/25', nama: 'Asep Sofyan', status: 'Selesai', jenis: 'SK Usaha', action: 'Unduh' },
  ]

  const statusStyle = {
    Selesai: "text-green-600 font-semibold",
    "Butuh Konfirmasi": "text-blue-600 font-semibold",
    Ditolak: "text-red-600 font-semibold",
    "Sedang proses": "text-gray-500 font-semibold",
  };

  const iconStyle = {
    Unduh: <FileDown className=" text-green-600" />,
    Buka: <Search className=" text-blue-600" />,
  };

  return (
    <div className="flex h-full">

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <header>
          <h1 className="text-xl font-bold mb-6">Dashboard Pengajuan Surat</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sedang Proses */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data1.sedangProses}</div>
              <div className="text-sm text-gray-500">Sedang Proses</div>
            </div>
            <Cog size={50} className="text-gray-500" />
          </div>

          {/* Butuh Konfirmasi */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data1.butuhKonfirmasi}</div>
              <div className="text-sm text-gray-500">Butuh Konfirmasi</div>
            </div>
            <BadgeCheck size={50} className="text-teal-600" />
          </div>

          {/* Ditolak */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data1.ditolak}</div>
              <div className="text-sm text-gray-500">Ditolak</div>
            </div>
            <Ban size={50} className="text-red-500" />
          </div>

          {/* Selesai */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data1.selesai}</div>
              <div className="text-sm text-gray-500">Selesai</div>
            </div>
            <UserCheck size={50} className="text-green-500" />
          </div>

          {/* Panduan */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="font-semibold">User Guid</div>
              <Link href="#" className="text-sm text-gray-500 hover:underline">Lihat panduan</Link>
            </div>
            <FileText size={50} className="text-gray-800" />
          </div>
        </div>

        <div className="border-t border-gray-400 mb-6 mt-6"></div>




        <div className="flex justify-end mb-6">
           <div className="flex items-center border border-gray-500 rounded-md px-4 py-2 bg-white text-gray-500 transition-colors">
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
              {data.map((item, index) => (
                <tr key={index} className="bg-white text-center">
                  <td className="px-4 py-2 border border-black">{item.tanggal}</td>
                  <td className="px-4 py-2 border border-black">{item.nama}</td>
                  <td className={`border border-black p-2 ${statusStyle[item.status]}`}>{item.status}</td>
                  <td className="px-4 py-2 border border-black">{item.jenis}</td>
                  <td className="border border-black p-2">
                  <div className="flex justify-center items-center gap-1">
                    {iconStyle[item.action]}
                    <span className="text-sm text-black">{item.action}</span>
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
