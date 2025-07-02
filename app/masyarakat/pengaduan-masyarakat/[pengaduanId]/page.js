"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetailPengaduanPage() {
  const { pengaduanId } = useParams();
  const [pengaduan, setPengaduan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/masyarakat/pengaduan-masyarakat/${pengaduanId}`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data pengaduan.");
        }

        const data = await res.json();
        console.log("Detail:", data.aduan);
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

  if (loading) return <p className="p-4">Memuat...</p>;
  if (errorMsg) return <p className="p-4 text-red-500">{errorMsg}</p>;
  if (!pengaduan) return <p className="p-4">Data tidak ditemukan.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{pengaduan.title}</h1>

      <div className="mb-2">
        <span className="text-sm font-semibold">Kategori:</span>{" "}
        {pengaduan.category}
      </div>

      <div className="mb-2">
        <span className="text-sm font-semibold">Lokasi:</span>{" "}
        {pengaduan.location}
      </div>

      <div className="mb-2">
        <span className="text-sm font-semibold">Status:</span>{" "}
        <span className="capitalize">{pengaduan.status}</span>
      </div>

      <div className="mb-2">
        <span className="text-sm font-semibold">Tanggal Dibuat:</span>{" "}
        {new Date(pengaduan.created_at).toLocaleString()}
      </div>

      <div className="mt-4 mb-6">
        <span className="text-sm font-semibold">Deskripsi:</span>
        <p className="mt-1 whitespace-pre-line">{pengaduan.content}</p>
      </div>

      {pengaduan.evidence && (
        //..........................................//
        //..........................................//
        //..........................................//
        //..........................................//
        // KODE INI PERBAIKI AGAR MENGGUNAKAN ROUTE.//
        //..........................................//
        //..........................................//
        //..........................................//
        //..........................................//
        <div className="mt-6">
          <span className="text-sm font-semibold">Bukti Foto:</span>
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/${pengaduan.evidence}`}
            alt="Bukti"
            className="mt-2 max-w-full rounded border"
          />
        </div>
        //..........................................//
        //..........................................//
        //..........................................//
        //..........................................//
        // KODE INI PERBAIKI AGAR MENGGUNAKAN ROUTE.//
        //..........................................//
        //..........................................//
        //..........................................//
        //..........................................//
      )}
    </div>
  );
}
