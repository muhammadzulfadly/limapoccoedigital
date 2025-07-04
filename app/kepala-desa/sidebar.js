"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const isPengajuanSuratActive = useMemo(() => pathname.startsWith("/kepala-desa/pengajuan-surat"), [pathname]);

  const [isOpen, setIsOpen] = useState(isPengajuanSuratActive);
  const [jenisSurat, setJenisSurat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsOpen(isPengajuanSuratActive);
  }, [isPengajuanSuratActive]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJenisSurat(data.jenis_surat || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);
  const linkClass = (path) => `${isActive(path) ? "text-green-500 font-medium" : "text-black"} hover:text-green-600 block`;

  return (
    <aside className="w-56 p-4 h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px]">
      <h1 className="font-semibold text-2xl mb-4">Kepala Desa</h1>
      <h2 className="font-semibold text-base mb-4">Pelayanan Desa</h2>
      <ul className="space-y-3 text-sm pl-4">
        <li>
          <Link href="/beranda" className={linkClass("/beranda")}>
            Beranda
          </Link>
        </li>
        <li>
          <Link href="/kepala-desa/pengaduan-masyarakat" className={linkClass("/kepala-desa/pengaduan-masyarakat")}>
            Pengaduan
          </Link>
        </li>
        <li>
          <div className="flex items-center gap-7">
            <Link href="/kepala-desa/pengajuan-surat" className={`font-medium hover:text-green-600 ${isPengajuanSuratActive ? "text-green-500" : "text-black"}`}>
              Pengajuan Surat
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="ml-1 focus:outline-none" aria-label="Toggle submenu">
              <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-green-500" : "text-black"}`} />
            </button>
          </div>
          {isOpen && (
            <ul className="pl-4 mt-4 space-y-3 text-sm">
              {loading ? (
                <li className="italic text-gray-500">Memuat...</li>
              ) : (
                jenisSurat.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/kepala-desa/pengajuan-surat/${item.id}`}
                      className={linkClass(`/kepala-desa/pengajuan-surat/${item.id}`)}
                    >
                      {item.nama_surat}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
