"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DetailPengaduanPage() {
  const { pengaduanId } = useParams();
  const router = useRouter();
  const [pengaduan, setPengaduan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/kepala-desa/pengaduan-masyarakat/${pengaduanId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data pengaduan.");

        const data = await res.json();
        console.log(data);
        setPengaduan(data.aduan);
      } catch (err) {
        console.error(err);
        setErrorMsg("Gagal memuat detail pengaduan.");
      } finally {
        setLoading(false);
      }
    };

    if (pengaduanId) fetchPengaduan();
  }, [pengaduanId]);

  const statusMap = {
    waiting: "Menunggu",
    processed: "Diterima",
    approved: "Selesai",
  };

  if (loading) return <p className="p-4">Memuat...</p>;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;
  if (!pengaduan) return <p className="p-4">Data tidak ditemukan.</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-8">
          Pengaduan/<span className="capitalize">{pengaduan.user?.name || "Pengguna"}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Nama</label>
            <input type="text" value={pengaduan.user?.name || "-"} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Kategori Pengaduan</label>
            <input type="text" value={pengaduan.category} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Judul Pengaduan</label>
            <input type="text" value={pengaduan.title} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Deskripsi Pengaduan</label>
            <textarea value={pengaduan.content} disabled rows={3} className="w-full border rounded px-3 py-2 bg-gray-100"></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Lokasi Kejadian</label>
            <input type="text" value={pengaduan.location} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <input type="text" value={statusMap[pengaduan.status] || pengaduan.status} disabled className="w-full border rounded px-3 py-2 bg-gray-100 capitalize" />
          </div>

          {pengaduan.evidence ? (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Bukti (Foto/Video)</label>
              <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${pengaduan.evidence}`} alt="Bukti" className="mt-2 max-w-full border rounded" />
            </div>
          ) : (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Bukti</label>
              <div className="px-3 py-2 bg-gray-100 border rounded text-sm text-gray-500">Tidak ada bukti terlampir.</div>
            </div>
          )}

          {pengaduan.response && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Respon Pengaduan</label>
              <textarea value={pengaduan.response} disabled rows={4} className="w-full border rounded px-3 py-2 bg-gray-100"></textarea>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-10">
          <button onClick={() => router.back()} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
