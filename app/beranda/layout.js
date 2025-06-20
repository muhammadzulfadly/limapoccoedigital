// app/beranda/layout.js
import "../globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Desa Limmapocoe",
  description: "Website Resmi Desa Limmapocoe",
};

export default function BerandaLayout({ children }) {
  return (
    <>
      {/* Header Tetap di Atas */}
      <header className="bg-[#2DB567] fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 shadow">
        {/* Kiri: Logo dan Nama */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo Desa Limmapocoe" width={45} height={45} priority />
          <span className="text-white font-bold text-lg md:text-xl">Desa Limmapocoe</span>
        </div>

        {/* Kanan: Masuk & Daftar */}
        <div className="flex items-center gap-4">
          <Link href="/auth/masuk-akun" className="text-white text-sm underline hover:text-gray-100">
            Masuk
          </Link>
          <Link href="/auth/daftar-akun" className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-200">
            Daftar
          </Link>
        </div>
      </header>

      {/* Isi Halaman */}
      <main className="pt-16">{children}</main>
    </>
  );
}
