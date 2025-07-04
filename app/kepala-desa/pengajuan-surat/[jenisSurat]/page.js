"use client";

import {
  Ban,
  Cog,
  FileText,
  BadgeCheck,
  UserCheck,
  Search,
  SlidersHorizontal,
  FileDown,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Pemetaan status backend ke label frontend
const statusMap = {
  confirmed: "Butuh Konfirmasi",
  approved: "Selesai",
};

const statusStyle = {
  "Butuh Konfirmasi": "text-blue-600 font-semibold",
  Selesai: "text-green-600 font-semibold",
};

const iconStyle = {
  Unduh: <FileDown className="text-green-600" />,
  Buka: <Search className="text-blue-600" />,
};

const mapStatus = (raw) => statusMap[raw] || raw;

export default function Page() {
  const { jenisSurat } = useParams();
  const [judul, setJudul] = useState("Memuat...");
  const [slug, setSlug] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Ambil metadata surat
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await res.json();
        const surat = result?.jenis_surat?.find((s) => String(s.id) === jenisSurat);
        if (surat) {
          setJudul(surat.nama_surat);
          setSlug(surat.slug);
        } else {
          setJudul("Jenis Surat Tidak Dikenal");
        }
      } catch (err) {
        console.error("Gagal mengambil metadata surat:", err);
        setJudul("Jenis Surat Tidak Dikenal");
      }
    };

    if (jenisSurat) fetchMetadata();
  }, [jenisSurat]);

  // Ambil data pengajuan (filtered)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) return;
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat/${slug}/pengajuan`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await res.json();
        console.log(result);

        const filtered = (result.pengajuan_surat || []).filter(
          (item) => item.status === "confirmed" || item.status === "approved"
        );

        setData(filtered);
      } catch (err) {
        console.error("Gagal mengambil data pengajuan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const ringkasan = {
    butuhKonfirmasi: data.filter((d) => mapStatus(d.status) === "Butuh Konfirmasi").length,
    selesai: data.filter((d) => mapStatus(d.status) === "Selesai").length,
  };

  const formatTanggal = (tgl) => {
    const d = new Date(tgl);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit" });
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-bold mb-6">
          Dashboard Pengajuan Surat / {judul}
        </h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Stat label="Butuh Konfirmasi" value={ringkasan.butuhKonfirmasi} icon={<BadgeCheck size={50} className="text-teal-600" />} />
          <Stat label="Selesai" value={ringkasan.selesai} icon={<UserCheck size={50} className="text-green-500" />} />
          <Stat label="Lihat panduan" value="User Guide" icon={<FileText size={50} className="text-gray-800" />} />
        </div>

        <div className="border-t border-gray-400 mb-6 mt-6" />

        {/* Filter/Search */}
        <div className="flex justify-end items-center mb-6">
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
                <th className="px-4 py-2 w-1/5 border border-black">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="bg-white text-center text-black py-4 italic">
                    Memuat data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="bg-white text-center text-black py-4">
                    Belum ada proses pengajuan surat
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => {
                  const statusLabel = mapStatus(item.status);
                  return (
                    <tr key={idx} className="bg-white text-center">
                      <td className="px-4 py-2 border border-black">{formatTanggal(item.created_at)}</td>
                      <td className="px-4 py-2 border border-black">{item.user?.name || "-"}</td>
                      <td className={`px-4 py-2 border border-black ${statusStyle[statusLabel] || ""}`}>{statusLabel}</td>
                      <td className="px-4 py-2 border border-black">{item.surat?.nama_surat || judul}</td>
                      <td className="px-4 py-2 border border-black">
                        <div className="flex justify-center items-center gap-1">
                          <button
                            onClick={() =>
                              router.push(`/kepala-desa/pengajuan-surat/${jenisSurat}/${item.id}`)
                            }
                            className="flex items-center gap-1 text-sm text-black hover:underline"
                          >
                            {iconStyle[statusLabel === "Selesai" ? "Unduh" : "Buka"]}
                            <span>{statusLabel === "Selesai" ? "Unduh" : "Buka"}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
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
