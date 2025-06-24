"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    alamat: "",
    dusun: "",
    rt_rw: "",
    tanggal_lahir: "",
    tempat_lahir: "",
    jenis_kelamin: "",
    pekerjaan: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const formatYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;

    if (!formData.alamat || formData.alamat.length < 10) newErrors.alamat = "Alamat minimal 10 karakter.";

    if (!formData.dusun) newErrors.dusun = "Dusun wajib dipilih.";

    if (formData.rt_rw && !/^\d{3}\/\d{3}$/.test(formData.rt_rw)) newErrors.rt_rw = "Format RT/RW tidak valid. Contoh: 005/003.";

    if (!formatYYYYMMDD.test(formData.tanggal_lahir)) newErrors.tanggal_lahir = "Gunakan format tanggal: YYYY-MM-DD.";

    if (!/^[A-Za-z\s]+$/.test(formData.tempat_lahir)) newErrors.tempat_lahir = "Tempat lahir hanya huruf dan spasi.";

    if (!formData.jenis_kelamin) newErrors.jenis_kelamin = "Jenis kelamin wajib dipilih.";

    if (!/^[A-Za-z\s]+$/.test(formData.pekerjaan)) newErrors.pekerjaan = "Pekerjaan hanya huruf dan spasi.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/auth/lengkapi-profil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result.user_data));
        localStorage.setItem("profile", JSON.stringify(result.profile));
        alert(result.message || "Profil berhasil disimpan.");
        router.push("/masyarakat/pengajuan-surat");
      } else {
        alert(result.message || "Gagal menyimpan profil.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <button onClick={() => router.back()} className="absolute top-6 left-6 text-2xl">
        ←
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">PROFIL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm">Alamat</label>
          <input name="alamat" value={formData.alamat} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.alamat ? "border-red-500" : "border-gray-300"}`} />
          {errors.alamat && <p className="text-red-500 text-xs">{errors.alamat}</p>}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm">Dusun</label>
            <select name="dusun" value={formData.dusun} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.dusun ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Pilih Dusun</option>
              {["WT.Bengo", "Barua", "Mappasaile", "Kampala", "Kaluku", "Jambua", "Bontopanno", "Samata"].map((dusun) => (
                <option key={dusun} value={dusun}>
                  {dusun}
                </option>
              ))}
            </select>
            {errors.dusun && <p className="text-red-500 text-xs">{errors.dusun}</p>}
          </div>

          <div className="w-1/2">
            <label className="text-sm">RT/RW (opsional)</label>
            <input name="rt_rw" value={formData.rt_rw} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.rt_rw ? "border-red-500" : "border-gray-300"}`} />
            {errors.rt_rw && <p className="text-red-500 text-xs">{errors.rt_rw}</p>}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm">Tanggal Lahir</label>
            <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.tanggal_lahir ? "border-red-500" : "border-gray-300"}`} />
            {errors.tanggal_lahir && <p className="text-red-500 text-xs">{errors.tanggal_lahir}</p>}
          </div>
          <div className="w-1/2">
            <label className="text-sm">Tempat Lahir</label>
            <input name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.tempat_lahir ? "border-red-500" : "border-gray-300"}`} />
            {errors.tempat_lahir && <p className="text-red-500 text-xs">{errors.tempat_lahir}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm">Jenis Kelamin</label>
          <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.jenis_kelamin ? "border-red-500" : "border-gray-300"}`}>
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.jenis_kelamin && <p className="text-red-500 text-xs">{errors.jenis_kelamin}</p>}
        </div>

        <div>
          <label className="text-sm">Pekerjaan</label>
          <input name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} className={`w-full border rounded px-4 py-2 mt-1 ${errors.pekerjaan ? "border-red-500" : "border-gray-300"}`} />
          {errors.pekerjaan && <p className="text-red-500 text-xs">{errors.pekerjaan}</p>}
        </div>

        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push("/masyarakat/pengajuan-surat")} className="border border-green-600 text-green-600 rounded px-6 py-2 hover:bg-green-50">
            Lanjutkan nanti
          </button>

          <button type="submit" disabled={loading} className="bg-green-600 text-white rounded px-6 py-2 hover:bg-green-700 disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
