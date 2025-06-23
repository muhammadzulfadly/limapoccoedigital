// app/beranda/layout.js
import "../globals.css";
import Sidebar from "./sidebar";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

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
          <User size={18} strokeWidth={2} className="text-white" />
          <Link href="#" className="text-white text-sm hover:underline">
            Admin
          </Link>
        </div>
      </header>

      {/* Isi Halaman */}
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
