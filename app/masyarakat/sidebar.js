'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  // Deteksi apakah halaman saat ini adalah bagian dari Pengajuan Surat
  const isPengajuanSuratActive = useMemo(
    () => pathname.startsWith('/masyarakat/pengajuan-surat'),
    [pathname]
  );

  // State dropdown yang mengikuti status aktif awal
  const [isOpen, setIsOpen] = useState(isPengajuanSuratActive);

  // Sinkronkan dropdown dengan perubahan route
  useEffect(() => {
    setIsOpen(isPengajuanSuratActive);
  }, [isPengajuanSuratActive]);

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `${isActive(path) ? 'text-green-500' : 'text-black'} hover:text-green-600 block`;

  return (
    <aside className="w-64 p-4">
      <h2 className="font-semibold text-base mb-4">Pelayanan desa</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/beranda" className={linkClass('/beranda')}>
            Beranda
          </Link>
        </li>
        <li>
          <Link
            href="/masyarakat/pengaduan-masyarakat"
            className={linkClass('/masyarakat/pengaduan-masyarakat')}
          >
            Pengaduan
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-between w-full">
            <Link
              href="/masyarakat/pengajuan-surat"
              className={`font-medium hover:text-green-600 ${
                isPengajuanSuratActive ? 'text-green-500' : 'text-black'
              }`}
            >
              Pengajuan Surat
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 focus:outline-none"
              aria-label="Toggle submenu"
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          {isOpen && (
            <ul className="pl-4 mt-2 space-y-1 text-sm">
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-tidak-mampu"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-tidak-mampu')}
                >
                  SK Tidak mampu
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-usaha"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-usaha')}
                >
                  SK Usaha
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/skck"
                  className={linkClass('/masyarakat/pengajuan-surat/skck')}
                >
                  SKCK
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-rekomendasi-pembelian-bbm"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-rekomendasi-pembelian-bbm')}
                >
                  SK Rekomendasi pembelian BBM
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-kelahiran"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-kelahiran')}
                >
                  SK Kelahiran
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-kehilangan-kk"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-kehilangan-kk')}
                >
                  SK Kehilangan KK
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-belum menikah"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-belum menikah')}
                >
                  SK Belum Menikah
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-mahar"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-mahar')}
                >
                  SK Mahar
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-nikah"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-nikah')}
                >
                  SK Nikah
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-penghasilan"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-penghasilan')}
                >
                  SK Penghasilan
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/surat-domisili"
                  className={linkClass('/masyarakat/pengajuan-surat/surat-domisili')}
                >
                  Surat Domisili
                </Link>
              </li>
              <li>
                <Link
                  href="/masyarakat/pengajuan-surat/sk-belum-memiliki-rumah"
                  className={linkClass('/masyarakat/pengajuan-surat/sk-belum-memiliki-rumah')}
                >
                  SK Belum memiliki rumah
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}
