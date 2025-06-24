"use client";

import { useEffect, useState } from "react";
import { ChevronDown, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PengaduanPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    judul: "",
    deskripsi: "",
    lokasi: "",
    bukti: null,
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setForm((prev) => ({ ...prev, nama: user?.name || "" }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "bukti" && files.length > 0) {
      const file = files[0];

      if (file.size > 10 * 1024 * 1024) {
        // 5MB
        alert("Ukuran file maksimal 10MB.");
        return;
      }

      setForm({ ...form, [name]: file });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newError = {};

    if (!form.nama) newError.nama = "Nama tidak ditemukan.";
    if (!form.kategori) newError.kategori = "Kategori harus dipilih";
    if (!form.judul) newError.judul = "Judul wajib diisi";
    if (!form.deskripsi) newError.deskripsi = "Deskripsi tidak boleh kosong";
    if (!form.lokasi) newError.lokasi = "Lokasi harus diisi";

    // Validasi file jika ada
    if (form.bukti) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(form.bukti.type)) {
        newError.bukti = "File harus berupa gambar JPG, JPEG, atau PNG.";
      }
      if (form.bukti.size > 10 * 1024 * 1024) {
        newError.bukti = "Ukuran file maksimal 10MB.";
      }
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.judul);
      formData.append("content", form.deskripsi);
      formData.append("location", form.lokasi);
      formData.append("category", form.kategori);
      if (form.bukti) formData.append("evidence", form.bukti);

      const res = await fetch("/api/masyarakat/pengaduan-masyarakat/buat-pengaduan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Pengaduan berhasil dikirim.");
        router.push("/masyarakat/pengaduan-masyarakat");
      } else {
        alert(result.message || "Gagal mengirim pengaduan.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-semibold mb-6">Pengaduan / Baru</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-sm p-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="text-sm font-medium">Nama</label>
              <input name="nama" value={form.nama} readOnly className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-500" />
              {error.nama && <p className="text-sm text-red-500">{error.nama}</p>}
            </div>

            <div className="col-span-1 relative">
              <label className="text-sm font-medium">Kategori Pengaduan</label>
              <div className={`relative ${error.kategori ? "border-red-500" : "border-gray-300"} border rounded-md p-2`}>
                <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full bg-transparent appearance-none focus:outline-none">
                  <option value="">Pilih kategori</option>
                  <option value="Administrasi">Administrasi</option>
                  <option value="Infrastruktur & Fasilitas">Infrastruktur & Fasilitas</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Lingkungan">Lingkungan</option>
                  <option value="Kinerja Perangkat Desa">Kinerja Perangkat Desa</option>
                  <option value="Ekonomi & Pekerjaan">Ekonomi & Pekerjaan</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              {error.kategori && <p className="text-sm text-red-500">{error.kategori}</p>}
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium">Judul Pengaduan</label>
              <input name="judul" value={form.judul} onChange={handleChange} className={`w-full p-2 border rounded-md ${error.judul ? "border-red-500" : "border-gray-300"}`} />
              {error.judul && <p className="text-sm text-red-500">{error.judul}</p>}
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium">Lokasi Kejadian</label>
              <input name="lokasi" value={form.lokasi} onChange={handleChange} className={`w-full p-2 border rounded-md ${error.lokasi ? "border-red-500" : "border-gray-300"}`} />
              {error.lokasi && <p className="text-sm text-red-500">{error.lokasi}</p>}
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium">Deskripsi Pengaduan</label>
              <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className={`w-full p-2 border rounded-md h-32 ${error.deskripsi ? "border-red-500" : "border-gray-300"}`} />
              {error.deskripsi && <p className="text-sm text-red-500">{error.deskripsi}</p>}
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium">Upload Foto (opsional)</label>
              <div className="w-full border border-dashed border-green-300 rounded-md p-6 text-center bg-green-50">
                <UploadCloud className="mx-auto mb-2 text-green-500" />
                <label className="cursor-pointer text-green-600 font-semibold">
                  Upload Foto
                  <p className="text-xs text-gray-500 mt-1">Format yang didukung: JPG, JPEG, PNG. Maks 10MB</p>
                  <input type="file" name="bukti" onChange={handleChange} className="hidden" accept="image/*" />
                </label>
                {form.bukti && <p className="mt-2 text-sm text-gray-600">File: {form.bukti.name}</p>}
              </div>
              {error.bukti && <p className="text-sm text-red-500 mt-1">{error.bukti}</p>}
            </div>
          </div>

          <div className="mt-10 flex justify-end space-x-4">
            <button onClick={() => router.back()} type="button" className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-6 py-2 rounded">
              Kembali
            </button>
            <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded">
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
