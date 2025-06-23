import {
  Ban,
  Cog,
  FileText,
  BadgeCheck,
  UserCheck,
  Search,
  SlidersHorizontal,
  FileDown,
  Plus,
} from "lucide-react";
import Link from "next/link";

// Mapping jenis surat
const judulMap = {
  "sk-tidak-mampu": "SK Tidak Mampu",
  "sk-usaha": "SK Usaha",
  "skck": "SKCK",
  "sk-rekomendasi-pembelian-bbm": "SK Rekomendasi Pembelian BBM",
  "sk-kelahiran": "SK Kelahiran",
  "sk-kehilangan-kk": "SK Kehilangan KK",
  "sk-belum-menikah": "SK Belum Menikah",
  "sk-mahar": "SK Mahar",
  "sk-nikah": "SK Nikah",
  "sk-penghasilan": "SK Penghasilan",
  "surat-domisili": "Surat Domisili",
  "sk-belum-memiliki-rumah": "SK Belum Memiliki Rumah",
};

// Dummy data per jenis surat
const mockDataMap = {
  "sk-belum-memiliki-rumah": [
    {
      tanggal: "24/03/25",
      nama: "Asep Sofyan",
      status: "Sedang proses",
      jenis: "SK Belum Memiliki Rumah",
      action: "Buka",
    },
    {
      tanggal: "24/03/25",
      nama: "Asep Sofyan",
      status: "Selesai",
      jenis: "SK Belum Memiliki Rumah",
      action: "Unduh",
    },
  ],
  "sk-usaha": [
    {
      tanggal: "25/03/25",
      nama: "Dina Laras",
      status: "Ditolak",
      jenis: "SK Usaha",
      action: "Buka",
    },
  ],
};

const statusStyle = {
  Selesai: "text-green-600 font-semibold",
  "Butuh Konfirmasi": "text-blue-600 font-semibold",
  Ditolak: "text-red-600 font-semibold",
  "Sedang proses": "text-gray-500 font-semibold",
};

const iconStyle = {
  Unduh: <FileDown className="text-green-600" />,
  Buka: <Search className="text-blue-600" />,
};

export async function generateMetadata({ params }) {
  const { jenisSurat } = await Promise.resolve(params);
  const title = judulMap[jenisSurat] || "Jenis Surat Tidak Dikenal";

  return {
    title: `Pengajuan Surat / ${title}`,
  };
}

export default async function Page({ params }) {
  const { jenisSurat } = await Promise.resolve(params);
  const judul = judulMap[jenisSurat] || "Jenis Surat Tidak Dikenal";
  const data = mockDataMap[jenisSurat] || [];

  const ringkasan = {
    sedangProses: data.filter((d) => d.status === "Sedang proses").length,
    butuhKonfirmasi: data.filter((d) => d.status === "Butuh Konfirmasi").length,
    ditolak: data.filter((d) => d.status === "Ditolak").length,
    selesai: data.filter((d) => d.status === "Selesai").length,
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-bold mb-6">
          Dashboard Pengajuan Surat / {judul}
        </h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Stat label="Sedang Proses" value={ringkasan.sedangProses} icon={<Cog size={50} className="text-gray-500" />} />
          <Stat label="Butuh Konfirmasi" value={ringkasan.butuhKonfirmasi} icon={<BadgeCheck size={50} className="text-teal-600" />} />
          <Stat label="Ditolak" value={ringkasan.ditolak} icon={<Ban size={50} className="text-red-500" />} />
          <Stat label="Selesai" value={ringkasan.selesai} icon={<UserCheck size={50} className="text-green-500" />} />
          <Stat label="Lihat panduan" value="User Guid" icon={<FileText size={50} className="text-gray-800" />} />
        </div>

        <div className="border-t border-gray-400 mb-6 mt-6"></div>

        {/* Header Table */}
        <div className="flex justify-between items-center mb-6">
          <Link href={`/admin/pengajuan-surat/${jenisSurat}/buat-surat-baru`}>
            <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition">
              <Plus className="w-5 h-5" strokeWidth={3} />
              Buat Pengajuan Surat
            </button>
          </Link>

          <div className="flex items-center border border-gray-500 rounded-md px-4 py-2 bg-white text-gray-500">
            <Search className="w-5 h-5 mr-3" />
            <input type="text" placeholder="Cari" className="outline-none text-sm w-28 bg-white placeholder-gray-500" />
            <SlidersHorizontal className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* TABEL */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-black">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-2 w-1/5 border border-black">Tanggal</th>
                <th className="px-4 py-2 w-1/5 border border-black">Nama</th>
                <th className="px-4 py-2 w-1/5 border border-black">Status</th>
                <th className="px-4 py-2 w-1/5 border border-black">Jenis Surat</th>
                <th className="px-4 py-2 w-1/5 border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
  {data.length === 0 ? (
    <tr>
      <td colSpan={5} className="bg-white text-center text-black py-4">
        Belum ada proses pengajuan surat
      </td>
    </tr>
  ) : (
    data.map((item, idx) => (
      <tr key={idx} className="bg-white text-center">
        <td className="px-4 py-2 border border-black">{item.tanggal}</td>
        <td className="px-4 py-2 border border-black">{item.nama}</td>
        <td className={`px-4 py-2 border border-black ${statusStyle[item.status]}`}>{item.status}</td>
        <td className="px-4 py-2 border border-black">{item.jenis}</td>
        <td className="px-4 py-2 border border-black">
          <div className="flex justify-center items-center gap-1">
            {iconStyle[item.action]}
            <span className="text-sm">{item.action}</span>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}


function Stat({ label, value, icon }) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      {icon}
    </div>
  );
}
