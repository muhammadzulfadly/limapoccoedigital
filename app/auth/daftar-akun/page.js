"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    nik: "",
    no_whatsapp: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]{3,}$/.test(form.name)) {
      newErrors.name = "Nama harus terdiri dari minimal 3 huruf dan hanya huruf/spasi.";
    }
    if (!/^\d{16}$/.test(form.nik)) {
      newErrors.nik = "NIK harus terdiri dari 16 digit angka.";
    }
    if (!/^08\d{8,11}$/.test(form.no_whatsapp)) {
      newErrors.no_whatsapp = "Nomor telepon tidak valid. Harus dimulai dengan 08 dan 10-13 digit.";
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/.test(form.password)) {
      newErrors.password = "Kata sandi minimal 12 karakter dan kombinasi simbol, huruf besar, huruf kecil & angka.";
    }
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Konfirmasi password tidak cocok.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/auth/daftar-akun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        const newErrors = {};

        if (result?.errors) {
          if (result.errors.nik) newErrors.nik = result.errors.nik[0];
          if (result.errors.no_whatsapp) newErrors.no_whatsapp = result.errors.no_whatsapp[0];
          if (result.errors.name) newErrors.name = result.errors.name[0];
          if (result.errors.password) newErrors.password = result.errors.password[0];
        }

        newErrors.general = result?.message || "Terjadi kesalahan saat mendaftar.";
        setErrors(newErrors);
        return;
      }

      localStorage.setItem("registration_token", result.registration_token);
      alert(result.message || "Pendaftaran berhasil!");
      router.push("/auth/verifikasi-otp");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Gagal menghubungi server." });
    }
  };

  return (
    <div className="w-full max-w-md">
      <button onClick={() => router.back()} className="absolute top-6 left-6 text-2xl">
        ←
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">DAFTAR AKUN</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <InputField label="Nama Lengkap" name="name" value={form.name} onChange={handleChange} error={errors.name} />

        {/* NIK */}
        <InputField
          label="NIK"
          name="nik"
          value={form.nik}
          maxLength={16}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setForm({ ...form, nik: value });
          }}
          error={errors.nik}
        />

        {/* Telepon */}
        <InputField
          label="Nomor Telepon"
          name="no_whatsapp"
          value={form.no_whatsapp}
          maxLength={13}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setForm({ ...form, no_whatsapp: value });
          }}
          error={errors.no_whatsapp}
        />

        {/* Password */}
        <PasswordField label="Kata Sandi" name="password" value={form.password} onChange={handleChange} error={errors.password} visible={showPassword} toggle={() => setShowPassword(!showPassword)} />

        {/* Konfirmasi Password */}
        <PasswordField
          label="Konfirmasi Password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          error={errors.password_confirmation}
          visible={showKonfirmasi}
          toggle={() => setShowKonfirmasi(!showKonfirmasi)}
        />

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
  );
}

// Komponen tambahan
function InputField({ label, name, value, onChange, error, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600">{label}</label>
      <input name={name} value={value} onChange={onChange} placeholder={`Masukkan ${label.toLowerCase()}`} className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm`} {...props} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PasswordField({ label, name, value, onChange, error, visible, toggle }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Masukkan ${label.toLowerCase()}`}
          className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded p-2 mt-1 text-sm pr-10`}
        />
        <button type="button" onClick={toggle} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
