"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    telepon: "",
    password: "",
    konfirmasi: "",
  });

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!/^([a-zA-Z]+\s){1,}[a-zA-Z]+$/.test(form.nama)) {
      newErrors.nama = "Nama lengkap tidak valid. Harus terdiri dari minimal 2 kata dan hanya huruf.";
    }
    if (!/^\d{16}$/.test(form.nik)) {
      newErrors.nik = "NIK tidak valid. Harus terdiri dari 16 digit angka.";
    }
    if (!/^08\d{8,11}$/.test(form.telepon)) {
      newErrors.telepon = "Nomor telepon tidak valid. Harus dimulai dengan 08 dan 10-13 digit.";
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(form.password)) {
      newErrors.password = "Kata sandi tidak kuat. Minimal 8 karakter dan kombinasi huruf & angka.";
    }
    if (form.password !== form.konfirmasi) {
      newErrors.konfirmasi = "Kata sandi tidak valid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form valid!");
      router.push("/auth/verifikasi-otp");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 relative hidden lg:flex items-center justify-center">
        <Image src="/bg-limapoccoe.png" alt="Background" layout="fill" objectFit="cover" className="z-0" />
        <div className="z-10 text-center text-white">
          <Image src="/logo.png" alt="Logo" width={200} height={200} className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white">LimapoccoeDigital</h1>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 relative">
        <div className="w-full max-w-md">
          <button onClick={() => router.back()} className="absolute top-6 left-6 text-2xl">
            ←
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">DAFTAR AKUN</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Nama Lengkap Sesuai KTP</label>
              <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama lengkap Anda" className={`w-full border ${errors.nama ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm`} />
              {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
            </div>

            {/* NIK */}
            <div>
              <label className="text-xs font-semibold text-gray-600">NIK</label>
              <input
                type="text"
                name="nik"
                value={form.nik}
                onChange={(e) => {
                  const value = e.target.value;
                  // Hanya biarkan angka dan pastikan panjangnya maksimal 16 karakter
                  if (/^\d{0,16}$/.test(value)) {
                    handleChange(e); // Hanya update state jika valid
                  }
                }}
                placeholder="Masukkan NIK Anda"
                className={`w-full border ${errors.nik ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm`}
              />
              {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
            </div>

            {/* Telepon */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Nomor Telepon</label>
              <input
                type="text"
                name="telepon"
                value={form.telepon}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // hanya angka
                  setForm({ ...form, telepon: value });
                }}
                placeholder="Masukkan nomor telepon Anda"
                className={`w-full border-b ${errors.telepon ? "border-red-500" : "border-black"} p-2 mt-1 text-sm`}
              />
              {errors.telepon && <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Kata Sandi</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi unik Anda"
                  className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm pr-10`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Konfirmasi */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Konfirmasi Password</label>
              <div className="relative">
                <input
                  type={showKonfirmasi ? "text" : "password"}
                  name="konfirmasi"
                  value={form.konfirmasi}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi unik Anda"
                  className={`w-full border ${errors.konfirmasi ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm pr-10`}
                />
                <button type="button" onClick={() => setShowKonfirmasi(!showKonfirmasi)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {showKonfirmasi ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.konfirmasi && <p className="text-red-500 text-xs mt-1">{errors.konfirmasi}</p>}
            </div>

            {/* Submit */}
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded text-sm font-semibold mt-4">
              Daftar
            </button>

            <p className="text-center mt-4 text-sm">
              Sudah punya akun?{" "}
              <Link href="/auth/masuk-akun" className="text-green-600 font-semibold hover:underline">
                Masuk
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
