"use client";

import { useEffect, useState } from "react";
import { User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    pekerjaan: "",
    dusun: "",
    rtRw: "",
  });

  useEffect(() => {
    // Simulasi ambil dari localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setForm({
        nama: user.name || "Asep sofyan",
        tempatLahir: "Makasar",
        tanggalLahir: "17 agustus 1995",
        jenisKelamin: "Laki laki",
        alamat: "Jl. bunga matahari no.10",
        pekerjaan: "Petani",
        dusun: "Bontotangnga",
        rtRw: "RT 03/ RW 07",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logged out!");
    router.push("/beranda");
  };

  return (
    <div className="min-h-screen bg-[#f1f4f9] px-4 py-10 md:px-20">
      <h1 className="text-xl font-bold text-black mb-4">Profile</h1>
      <div className="bg-white rounded-lg p-6 shadow relative">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2DB567] flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <p className="font-semibold text-black">{form.nama}</p>
          </div>
          <button className="bg-[#2DB567] hover:bg-[#239653] text-white text-sm font-medium px-4 py-1.5 rounded">Ubah Profile</button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div>
            <label className="text-xs font-semibold">Nama</label>
            <input type="text" name="nama" value={form.nama} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Tempat Lahir</label>
            <input type="text" name="tempatLahir" value={form.tempatLahir} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Tanggal Lahir</label>
            <input type="text" name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>

          <div className="relative">
            <label className="text-xs font-semibold">Jenis Kelamin</label>
            <select name="jenisKelamin" value={form.jenisKelamin} onChange={handleChange} className="mt-1 appearance-none w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none">
              <option value="Laki laki">Laki laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            <ChevronDown className="absolute right-3 bottom-3 text-black pointer-events-none" size={16} />
          </div>

          <div>
            <label className="text-xs font-semibold">Alamat Domisili</label>
            <input type="text" name="alamat" value={form.alamat} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Pekerjaan</label>
            <input type="text" name="pekerjaan" value={form.pekerjaan} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">Dusun</label>
            <input type="text" name="dusun" value={form.dusun} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>

          <div>
            <label className="text-xs font-semibold">RT/RW</label>
            <input type="text" name="rtRw" value={form.rtRw} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none" />
          </div>
        </form>

        {/* Logout Button */}
        <div className="flex justify-end mt-8">
          <button onClick={handleLogout} className="bg-[#E74C3C] hover:bg-[#c0392b] text-white text-sm font-medium px-5 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
