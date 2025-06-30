// app/beranda/layout.js
"use client"; // wajib di atas

import "../globals.css";
import Sidebar from "./sidebar";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function BerandaLayout({ children }) {
  const [namaUser, setNamaUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setNamaUser(user?.name || "");
    }
  }, []);

  return (
    <>
      <header className="bg-[#2DB567] fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 shadow">
        <Link href="/beranda" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo Desa Limmapocoe" width={45} height={45} priority />
          <span className="text-white font-bold text-lg md:text-xl">Desa Limapocoe</span>
        </Link>
        <div className="flex items-center gap-4">
          <User size={18} strokeWidth={2} className="text-white" />
          <Link href="/masyarakat/profil" className="text-white text-sm hover:underline">
            {namaUser || "Pengguna"}
          </Link>
        </div>
      </header>

      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
