"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const isPengajuanSuratActive = useMemo(() => pathname.startsWith("/kepala-desa/pengajuan-surat"), [pathname]);

  const [isOpen, setIsOpen] = useState(isPengajuanSuratActive);

  useEffect(() => {
    setIsOpen(isPengajuanSuratActive);
  }, [isPengajuanSuratActive]);

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

  const linkClass = (path) => `${isActive(path) ? "text-green-500 font-medium" : "text-black"} hover:text-green-600 block`;

  const suratMenu = [
    { label: "SK Tidak Mampu", href: "/kepala-desa/pengajuan-surat/sk-tidak-mampu" },
    { label: "SK Usaha", href: "/kepala-desa/pengajuan-surat/sk-usaha" },
    { label: "SKCK", href: "/kepala-desa/pengajuan-surat/skck" },
    { label: "SK Rekomendasi Pembelian BBM", href: "/kepala-desa/pengajuan-surat/sk-rekomendasi-pembelian-bbm" },
    { label: "SK Kelahiran", href: "/kepala-desa/pengajuan-surat/sk-kelahiran" },
    { label: "SK Kehilangan KK", href: "/kepala-desa/pengajuan-surat/sk-kehilangan-kk" },
    { label: "SK Belum Menikah", href: "/kepala-desa/pengajuan-surat/sk-belum-menikah" },
    { label: "SK Mahar", href: "/kepala-desa/pengajuan-surat/sk-mahar" },
    { label: "SK Nikah", href: "/kepala-desa/pengajuan-surat/sk-nikah" },
    { label: "SK Penghasilan", href: "/kepala-desa/pengajuan-surat/sk-penghasilan" },
    { label: "Surat Domisili", href: "/kepala-desa/pengajuan-surat/surat-domisili" },
    { label: "SK Belum Memiliki Rumah", href: "/kepala-desa/pengajuan-surat/sk-belum-memiliki-rumah" },
  ];

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
              {suratMenu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}