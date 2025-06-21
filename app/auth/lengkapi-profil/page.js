"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    alamat: "",
    dusun: "",
    rtRw: "",
    tanggalLahir: "",
    tempatLahir: "",
    jenisKelamin: "",
    pekerjaan: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.alamat || formData.alamat.length < 10) {
      newErrors.alamat = "Alamat tidak boleh kosong dan harus terdiri dari minimal 10 karakter.";
    }

    if (!/^[A-Za-z\s]+$/.test(formData.dusun)) {
      newErrors.dusun = "Nama Dusun tidak valid. Hanya huruf dan spasi yang diperbolehkan.";
    }

    if (!/^\d{3}\/\d{3}$/.test(formData.rtRw)) {
      newErrors.rtRw = "Format RT/RW tidak valid. Format angka 3 digit, contoh: 005/003.";
    }

    if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.tanggalLahir)) {
      newErrors.tanggalLahir = "Format tanggal lahir tidak valid. Gunakan format: DD-MM-YYYY.";
    }

    if (!/^[A-Za-z\s]+$/.test(formData.tempatLahir)) {
      newErrors.tempatLahir = "Format tempat lahir tidak valid. Hanya huruf dan spasi yang diperbolehkan.";
    }

    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = "Pilih jenis kelamin.";
    }

    if (!/^[A-Za-z\s]+$/.test(formData.pekerjaan)) {
      newErrors.pekerjaan = "Nama pekerjaan tidak boleh kosong dan hanya boleh berisi huruf/spasi.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form is valid!");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 relative hidden lg:flex items-center justify-center">
        <Image src="/bg-limapoccoe.png" alt="Background" layout="fill" objectFit="cover" className="z-0" />
        <div className="z-10 text-center text-white">
          <Image src="/logo.png" alt="Logo" width={200} height={200} className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white">LimapoccoeDigital</h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 relative">
        <div className="w-full max-w-md">
          <button onClick={() => router.back()} className="absolute top-6 left-6 text-2xl">
            ←
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">PROFIL</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div>
              <label className="text-sm">Alamat</label>
              <input name="alamat" className={`w-full border rounded px-4 py-2 mt-1 ${errors.alamat ? "border-red-500" : "border-gray-300"}`} placeholder="Masukkan Alamat Anda" value={formData.alamat} onChange={handleChange} />
              {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-sm">Dusun</label>
                <input name="dusun" className={`w-full border rounded px-4 py-2 mt-1 ${errors.dusun ? "border-red-500" : "border-gray-300"}`} placeholder="Dusun" value={formData.dusun} onChange={handleChange} />
                {errors.dusun && <p className="text-red-500 text-xs mt-1">{errors.dusun}</p>}
              </div>
              <div className="w-1/2">
                <label className="text-sm">RT/RW</label>
                <input name="rtRw" className={`w-full border rounded px-4 py-2 mt-1 ${errors.rtRw ? "border-red-500" : "border-gray-300"}`} placeholder="RT/RW" value={formData.rtRw} onChange={handleChange} />
                {errors.rtRw && <p className="text-red-500 text-xs mt-1">{errors.rtRw}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-sm">Tanggal Lahir</label>
                <input name="tanggalLahir" className={`w-full border rounded px-4 py-2 mt-1 ${errors.tanggalLahir ? "border-red-500" : "border-gray-300"}`} placeholder="Tanggal lahir" value={formData.tanggalLahir} onChange={handleChange} />
                {errors.tanggalLahir && <p className="text-red-500 text-xs mt-1">{errors.tanggalLahir}</p>}
              </div>
              <div className="w-1/2">
                <label className="text-sm">Tempat lahir</label>
                <input name="tempatLahir" className={`w-full border rounded px-4 py-2 mt-1 ${errors.tempatLahir ? "border-red-500" : "border-gray-300"}`} placeholder="Tempat lahir" value={formData.tempatLahir} onChange={handleChange} />
                {errors.tempatLahir && <p className="text-red-500 text-xs mt-1">{errors.tempatLahir}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm">Jenis kelamin</label>
              <select name="jenisKelamin" className={`w-full border rounded px-4 py-2 mt-1 ${errors.jenisKelamin ? "border-red-500" : "border-gray-300"}`} value={formData.jenisKelamin} onChange={handleChange}>
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.jenisKelamin && <p className="text-red-500 text-xs mt-1">{errors.jenisKelamin}</p>}
            </div>

            <div>
              <label className="text-sm">Pekerjaan</label>
              <input name="pekerjaan" className={`w-full border rounded px-4 py-2 mt-1 ${errors.pekerjaan ? "border-red-500" : "border-gray-300"}`} placeholder="Masukkan Pekerjaan Anda" value={formData.pekerjaan} onChange={handleChange} />
              {errors.pekerjaan && <p className="text-red-500 text-xs mt-1">{errors.pekerjaan}</p>}
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" className="border border-green-600 text-green-600 rounded px-6 py-2 hover:bg-green-50">
                Lanjutkan nanti
              </button>
              <button type="submit" className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
