import {
  FileDown,
  Search,
  Plus,
  Info,
  SlidersHorizontal,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";

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

const mockDataMap = {
  "sk-tidak-mampu": [
    { tanggal: "24/03/25", jenis: "SK Tidak Mampu", status: "Selesai", action: "Unduh" },
    { tanggal: "24/03/25", jenis: "SK Tidak Mampu", status: "Butuh Konfirmasi", action: "Buka" },
    { tanggal: "24/03/25", jenis: "SK Tidak Mampu", status: "Ditolak", action: "Buka" },
    { tanggal: "24/03/25", jenis: "SK Tidak Mampu", status: "Ditolak", action: "Buka" },
    { tanggal: "24/03/25", jenis: "SK Tidak Mampu", status: "Sedang proses", action: "Buka" },
  ],
  "sk-usaha": [
    { tanggal: "25/03/25", jenis: "SK Usaha", status: "Selesai", action: "Unduh" },
  ],
};

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

const disabledStyle = {
  "Sedang proses": "opacity-50",
  "Butuh Konfirmasi": "opacity-50",
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
  const title = judulMap[jenisSurat] || "Jenis Surat Tidak Dikenal";
  const data = mockDataMap[jenisSurat] || [];

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-semibold mb-6">
          Pengajuan Surat / <span className="font-bold">{title}</span>
        </h1>

        <div className="bg-white rounded-md shadow-sm p-8 h-screen">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-6">
              <Link href={`/masyarakat/pengajuan-surat/${jenisSurat}/buat-surat-baru`}>
                <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition">
                  <Plus className="w-5 h-5" strokeWidth={3} />
                  Buat Pengajuan Surat
                </button>
              </Link>
              <button className="flex items-center gap-1 px-4 py-2 bg-green-100 text-sm rounded-md text-gray">
                <Info className="w-4 h-4" />
                Penjelasan dan Persyaratan
              </button>
            </div>
            <div className="flex items-center border border-gray-500 rounded-md px-4 py-2 bg-white text-gray-500 transition-colors">
              <Search className="w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Cari"
                className="outline-none text-sm w-28 bg-white placeholder-gray-500"
              />
              <SlidersHorizontal className="w-4 h-4 ml-1" />
            </div>
          </div>

          <table className="w-full table-fixed border border-black">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border border-black p-2 w-1/5">Tanggal</th>
                <th className="border border-black p-2 w-1/5">Jenis surat</th>
                <th className="border border-black p-2 w-1/5">Status</th>
                <th className="border border-black p-2 w-1/5">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-black py-4">
                    Belum ada proses pengajuan surat
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-black p-2">{item.tanggal}</td>
                    <td className="border border-black p-2">{item.jenis}</td>
                    <td className={`border border-black p-2 ${statusStyle[item.status]}`}>
                      {item.status}
                    </td>
                    <td className={`border border-black p-2 ${disabledStyle[item.status] || ""}`}>
                      <div className="flex justify-center items-center gap-1">
                        {iconStyle[item.action]}
                        <span className="text-sm text-black">{item.action}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION (Optional UI Saja) */}
          <div className="flex justify-center mt-6">
            <div className="flex border border-slate-800 divide-x divide-slate-800 text-slate-800 text-sm">
              <button className="px-3 py-1">
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1">1</button>
              <button className="px-3 py-1">2</button>
              <button className="px-3 py-1">3</button>
              <button className="px-3 py-1">4</button>
              <button className="px-3 py-1">
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
