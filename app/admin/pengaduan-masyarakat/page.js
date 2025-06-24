import { Clock, CheckCheck, UserCheck, FileText, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Pengaduan Masyarakat",
};

export async function getData() {
  return {
    sedangProses: 0,
    butuhKonfirmasi: 0,
    ditolak: 1,
    selesai: 1,
  };
}

export default async function Page() {
  const data1 = await getData();

  const data = [
    { tanggal: "24/03/25", nama: "Asep Sofyan", status: "Menunggu", jenis: "Fasilitas Desa", action: "Buka" },
    { tanggal: "24/03/25", nama: "Asep Sofyan", status: "Diterima", jenis: "Layanan Masyarakat", action: "Buka" },
    { tanggal: "24/03/25", nama: "Asep Sofyan", status: "Selesai", jenis: "Fasilitas Desa", action: "Buka" },
  ];

  const statusStyle = {
    Selesai: "text-green-600 font-semibold",
    Diterima: "text-teal-800 font-semibold",
    Menunggu: "text-orange-600 font-semibold",
  };

  const iconStyle = {
    Buka: <Search className=" text-blue-600" />,
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <header>
          <h1 className="text-xl font-bold mb-6">Dashboard Pengaduan</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {["Menunggu", "Diterima", "Selesai"].map((status) => {
            const jumlah = data.filter((item) => item.status === status).length;
            const Icon = status === "Menunggu" ? Clock : status === "Diterima" ? CheckCheck : UserCheck;
            const iconColor = status === "Menunggu" ? "text-orange-500" : status === "Diterima" ? "text-teal-800" : "text-green-600";

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

        <div className="border-t border-gray-400 mb-6 mt-6"></div>

        <div className="flex justify-end mb-6">
          <div className="flex items-center border border-gray-500 rounded-md px-4 py-2 bg-white text-gray-500 transition-colors w-72">
            <Search className="w-5 h-5 mr-2" />
            <input type="text" placeholder="Masukkan Jenis Pengaduan" className="flex-1 outline-none text-sm bg-white placeholder-gray-500" />
            <SlidersHorizontal className="w-4 h-4 ml-2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-black">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-2 w-1/5 border border-black">Tanggal</th>
                <th className="px-4 py-2 w-1/5 border border-black">Nama</th>
                <th className="px-4 py-2 w-1/5 border border-black">Status</th>
                <th className="px-4 py-2 w-1/5 border border-black">Kategori Pengaduan</th>
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
                    <Link href={`/pengaduan/${item.id}`} className="flex justify-center items-center gap-1  hover:underline">
                      {iconStyle[item.action]}
                      <span className="text-sm">{item.action}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
