"use client";

import { useState } from "react";
import { ChevronDown, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PengaduanPage() {
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    judul: "",
    deskripsi: "",
    lokasi: "",
    bukti: null,
  });

  const [error, setError] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    if (!form.nama) newError.nama = "Nama pengadu tidak boleh kosong";
    if (!form.kategori) newError.kategori = "Kategori harus dipilih";
    if (!form.judul) newError.judul = "Judul pengaduan wajib diisi";
    if (!form.deskripsi) newError.deskripsi = "Deskripsi pengaduan tidak boleh kosong";
    if (!form.lokasi) newError.lokasi = "Lokasi kejadian harus diisi";

    setError(newError);
    if (Object.keys(newError).length === 0) {
      alert("Pengaduan berhasil dikirim");
      router.push("/masyarakat/pengaduan-masyarakat");
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-semibold mb-6">Pengaduan / Baru</h1>
        <form className="bg-white rounded-md shadow-sm p-8">
          <div className="grid grid-cols-2 gap-6 flex-grow">
            <div className="space-y-1 col-span-1">
              <label className="text-sm font-medium">Nama</label>
              <input name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama lengkap Anda" className={`w-full p-2 border rounded-md focus:outline-none ${error.nama ? "border-red-500" : "border-gray-300"}`} />
              {error.nama && <p className="text-sm text-red-500">{error.nama}</p>}
            </div>

            <div className="space-y-1 col-span-1 relative">
              <label className="text-sm font-medium">Kategori Pengaduan</label>
              <div className={`relative ${error.kategori ? "border-red-500" : "border-gray-300"} border rounded-md p-2`}>
                <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full bg-transparent appearance-none focus:outline-none">
                  <option value="">Pilih kategori</option>
                  <option value="fasilitas">Fasilitas</option>
                  <option value="lingkungan">Lingkungan</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              {error.kategori && <p className="text-sm text-red-500">{error.kategori}</p>}
            </div>

            <div className="space-y-1 col-span-1">
              <label className="text-sm font-medium">Judul Pengaduan</label>
              <input name="judul" value={form.judul} onChange={handleChange} placeholder="Silakan isi judul pengaduan" className={`w-full p-2 border rounded-md focus:outline-none ${error.judul ? "border-red-500" : "border-gray-300"}`} />
              {error.judul && <p className="text-sm text-red-500">{error.judul}</p>}
            </div>

            <div className="space-y-1 col-span-1">
              <label className="text-sm font-medium">Lokasi Kejadian</label>
              <input name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Contoh: RT 03, Dusun II" className={`w-full p-2 border rounded-md focus:outline-none ${error.lokasi ? "border-red-500" : "border-gray-300"}`} />
              {error.lokasi && <p className="text-sm text-red-500">{error.lokasi}</p>}
            </div>

            <div className="space-y-1 col-span-1">
              <label className="text-sm font-medium">Deskripsi Pengaduan</label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Mohon jelaskan detail pengaduan Anda."
                className={`w-full p-2 border rounded-md focus:outline-none h-32 ${error.deskripsi ? "border-red-500" : "border-gray-300"}`}
              />
              {error.deskripsi && <p className="text-sm text-red-500">{error.deskripsi}</p>}
            </div>

            <div className="space-y-1 col-span-1">
              <label className="text-sm font-medium">Upload Foto (opsional)</label>
              <div className="w-full border border-dashed border-green-300 rounded-md p-6 text-center bg-green-50">
                <UploadCloud className="mx-auto mb-2 text-green-500" />
                <label className="cursor-pointer text-green-600 font-semibold">
                  Drag & drop Foto or <span className="underline">Browse</span>
                  <input type="file" name="bukti" onChange={handleChange} className="hidden" accept="image/*" />
                </label>
                <p className="text-xs text-gray-500 mt-1">Supported formats: JPEG, PNG, IMG</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-end space-x-4 self-end">
            <button onClick={() => router.back()} type="button" className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded">
              Kembali
            </button>
            <button type="submit" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
