"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nik: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!/^\d{16}$/.test(form.nik)) {
      newErrors.nik = "NIK tidak valid. Harus terdiri dari 16 digit angka.";
    }
    if (form.password.trim() === "") {
      newErrors.password = "Kata sandi wajib diisi.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/auth/masuk-akun", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert(result.message || "Login berhasil");
        router.push("/masyarakat/pengajuan-surat");
      } else {
        setErrors({ general: result.message || "Login gagal. Cek kembali NIK dan kata sandi Anda." });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Gagal menghubungi server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <button onClick={() => router.back()} className="absolute top-6 left-6 text-2xl">←</button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">MASUK</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NIK */}
        <div>
          <label className="text-xs font-semibold text-gray-600">NIK</label>
          <input
            type="text"
            name="nik"
            value={form.nik}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,16}$/.test(value)) handleChange(e);
            }}
            placeholder="Masukkan NIK Anda"
            className={`w-full border ${errors.nik ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm`}
          />
          {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
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

        {/* General Error */}
        {errors.general && <p className="text-red-600 text-sm text-center">{errors.general}</p>}

        {/* Lupa password */}
        <div className="text-center text-sm">
          Lupa{" "}
          <Link href="#" className="text-green-600 font-semibold hover:underline">
            Password
          </Link>
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50">
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>

      {/* Daftar */}
      <p className="text-center text-sm mt-6">
        Belum punya akun?{" "}
        <Link href="/auth/daftar-akun" className="text-green-600 font-semibold hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
