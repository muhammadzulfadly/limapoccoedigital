import { Ban, Cog, FileText, UserCheck, BadgeCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'
import Link from 'next/link';

export async function getData() {
  return {
    sedangProses: 0,
    butuhKonfirmasi: 0,
    ditolak: 1,
    selesai: 1,
  }
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <header>
          <h1 className="text-xl font-bold mb-6">Dashboard Pembuatan Surat</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sedang Proses */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data.sedangProses}</div>
              <div className="text-sm text-gray-500">Sedang Proses</div>
            </div>
            <Cog size={50} className="text-gray-500" />
          </div>

          {/* Butuh Konfirmasi */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data.butuhKonfirmasi}</div>
              <div className="text-sm text-gray-500">Butuh Konfirmasi</div>
            </div>
            <BadgeCheck size={50} className="text-teal-600" />
          </div>

          {/* Ditolak */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data.ditolak}</div>
              <div className="text-sm text-gray-500">Ditolak</div>
            </div>
            <Ban size={50} className="text-red-500" />
          </div>

          {/* Selesai */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-xl font-semibold">{data.selesai}</div>
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
      </div>
    </div>
  )
}
