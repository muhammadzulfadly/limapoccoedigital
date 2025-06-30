"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isPengajuanSuratActive = useMemo(
    () => pathname.startsWith("/masyarakat/pengajuan-surat"),
    [pathname]
  );

  const [isOpen, setIsOpen] = useState(isPengajuanSuratActive);
  const [jenisSurat, setJenisSurat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsOpen(isPengajuanSuratActive);
  }, [isPengajuanSuratActive]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/surat/all`, {
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
  }, [router]);

  const isActive = (path) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const linkClass = (path) =>
    `${isActive(path) ? "text-green-500 font-medium" : "text-black"} hover:text-green-600 block`;

  return (
    <aside className="w-56 p-4 h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px]">
      <h2 className="font-semibold text-base mb-4">Pelayanan Desa</h2>
      <ul className="space-y-3 text-sm pl-4">
        <li>
          <Link href="/beranda" className={linkClass("/beranda")}>
            Beranda
          </Link>
        </li>
        <li>
          <Link
            href="/masyarakat/pengaduan-masyarakat"
            className={linkClass("/masyarakat/pengaduan-masyarakat")}
          >
            Pengaduan
          </Link>
        </li>
        <li>
          <div className="flex items-center gap-7">
            <Link
              href="/masyarakat/pengajuan-surat"
              className={`font-medium hover:text-green-600 ${
                isPengajuanSuratActive ? "text-green-500" : "text-black"
              }`}
            >
              Pengajuan Surat
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-1 focus:outline-none"
              aria-label="Toggle submenu"
            >
              <ChevronRight
                size={16}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-90 text-green-500" : "text-black"
                }`}
              />
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
                      href={`/masyarakat/pengajuan-surat/${item.id}`}
                      className={linkClass(
                        `/masyarakat/pengajuan-surat/${item.id}`
                      )}
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
