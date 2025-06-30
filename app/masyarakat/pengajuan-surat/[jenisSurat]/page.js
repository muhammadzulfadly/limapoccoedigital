"use client";

import { FileDown, Search, Plus, Info, SlidersHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const { jenisSurat } = useParams();
  const router = useRouter();

  const [surat, setSurat] = useState(null);
  const [ajuanList, setAjuanList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!jenisSurat || !token) return;

    const fetchData = async () => {
      try {
        const [suratRes, ajuanRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/surat/${jenisSurat}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ajuan-surat/masyarakat/${jenisSurat}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
        ]);

        const suratData = await suratRes.json();
        const ajuanData = await ajuanRes.json();
        console.log(ajuanData);

        setSurat(suratData.jenis_surat || null);
        setAjuanList(ajuanData.ajuan_surat || []);
        setLoading(false);
      } catch (error) {
        console.error("Gagal memuat data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [jenisSurat]);

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusStyle = {
    selesai: "text-green-600 font-semibold",
    "butuh konfirmasi": "text-blue-600 font-semibold",
    ditolak: "text-red-600 font-semibold",
    "sedang proses": "text-gray-500 font-semibold",
  };

  const iconStyle = (status) => {
    if (status === "selesai") return <FileDown className="text-green-600" />;
    return <Search className="text-blue-600" />;
  };

  const disabledStyle = (status) => (["sedang proses", "butuh konfirmasi"].includes(status) ? "opacity-50" : "");

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-semibold mb-6">
          Pengajuan Surat / <span className="font-bold">{loading ? "Memuat..." : surat?.nama_surat || "Tidak ditemukan"}</span>
        </h1>

        <div className="bg-white rounded-md shadow-sm p-8">
          {/* Tombol aksi */}
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
              <input type="text" placeholder="Cari" className="outline-none text-sm w-28 bg-white placeholder-gray-500" />
              <SlidersHorizontal className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tabel data */}
          <table className="w-full table-fixed border border-black">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border border-black p-2 w-1/5">Tanggal</th>
                <th className="border border-black p-2 w-1/5">Jenis surat</th>
                <th className="border border-black p-2 w-1/5">Status</th>
                <th className="border border-black p-2 w-1/5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center text-black py-4 italic">
                    Memuat data...
                  </td>
                </tr>
              ) : ajuanList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-black py-4">
                    Belum ada proses pengajuan surat
                  </td>
                </tr>
              ) : (
                ajuanList.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="border border-black p-2">{formatTanggal(item.created_at)}</td>
                    <td className="border border-black p-2">{surat?.nama_surat}</td>
                    <td className={`border border-black p-2 ${statusStyle[item.status.toLowerCase()]}`}>{item.status}</td>
                    <td className={`border border-black p-2 ${disabledStyle(item.status.toLowerCase())}`}>
                      <div className="flex justify-center items-center gap-1">
                        <button onClick={() => router.push(`/masyarakat/pengajuan-surat/${jenisSurat}/${item.id}`)} className="flex items-center gap-1 text-sm text-black hover:underline">
                          {iconStyle(item.status.toLowerCase())}
                          <span>{item.status.toLowerCase() === "selesai" ? "Unduh" : "Buka"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Opsional: Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex border border-slate-800 divide-x divide-slate-800 text-slate-800 text-sm">
              <button className="px-3 py-1">
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1">1</button>
              <button className="px-3 py-1">2</button>
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
