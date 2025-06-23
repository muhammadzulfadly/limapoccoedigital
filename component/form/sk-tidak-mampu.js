"use client";

import { useState } from "react";

export default function FormSurat({ title = "Pengajuan Surat", onBack, onSubmit, tombolLabel = "Kirim" }) {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tempatLahir: "",
    tanggalLahir: "",
    pekerjaan: "",
    alamat: "",
    jenisKelamin: "",
    namaAyah: "",
    namaIbu: "",
    pekerjaanAyah: "",
    pekerjaanIbu: "",
    jumlahTanggungan: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const formatDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
    const formatYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;

    if (!/^\p{L}+(\s\p{L}+)*$/u.test(formData.nama)) newErrors.nama = "Nama lengkap tidak valid.";
    if (!/^\d{16}$/.test(formData.nik)) newErrors.nik = "NIK tidak valid.";
    if (!/^\p{L}+(\s\p{L}+)*$/u.test(formData.tempatLahir)) newErrors.tempatLahir = "Tempat lahir tidak valid.";
    if (!formatDDMMYYYY.test(formData.tanggalLahir) && !formatYYYYMMDD.test(formData.tanggalLahir)) {
      newErrors.tanggalLahir = "Gunakan format: DD/MM/YYYY atau YYYY-MM-DD";
    }
    if (!/^\p{L}+(\s\p{L}+)*$/u.test(formData.pekerjaan)) newErrors.pekerjaan = "Pekerjaan tidak valid.";
    if (formData.alamat.length < 10) newErrors.alamat = "Alamat minimal 10 karakter.";
    if (!formData.jenisKelamin) newErrors.jenisKelamin = "Wajib pilih jenis kelamin.";
    if (!/^\p{L}+(\s\p{L}+)+$/u.test(formData.namaAyah)) newErrors.namaAyah = "Nama Ayah tidak valid.";
    if (!/^\p{L}+(\s\p{L}+)+$/u.test(formData.namaIbu)) newErrors.namaIbu = "Nama Ibu tidak valid.";
    if (!/^\p{L}+(\s\p{L}+)*$/u.test(formData.pekerjaanAyah)) newErrors.pekerjaanAyah = "Pekerjaan Ayah tidak valid.";
    if (!/^\p{L}+(\s\p{L}+)*$/u.test(formData.pekerjaanIbu)) newErrors.pekerjaanIbu = "Pekerjaan Ibu tidak valid.";
    if (!/^\d+$/.test(formData.jumlahTanggungan)) newErrors.jumlahTanggungan = "Masukkan angka saja.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit?.(formData);
    }
  };

  const inputStyle = (field) => `w-full border rounded-md px-3 py-2 ${errors[field] ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-xl font-semibold mb-6">{title}</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-sm p-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label>Nama</label>
              <input name="nama" className={inputStyle("nama")} onChange={handleChange} />
              {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
            </div>
            <div>
              <label>NIK</label>
              <input name="nik" className={inputStyle("nik")} onChange={handleChange} />
              {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
            </div>
            <div>
              <label>Tempat Lahir</label>
              <input name="tempatLahir" className={inputStyle("tempatLahir")} onChange={handleChange} />
              {errors.tempatLahir && <p className="text-red-500 text-sm">{errors.tempatLahir}</p>}
            </div>
            <div>
              <label>Tanggal Lahir</label>
              <input type="date" name="tanggalLahir" className={inputStyle("tanggalLahir")} onChange={handleChange} />
              {errors.tanggalLahir && <p className="text-red-500 text-sm">{errors.tanggalLahir}</p>}
            </div>
            <div>
              <label>Pekerjaan</label>
              <input name="pekerjaan" className={inputStyle("pekerjaan")} onChange={handleChange} />
              {errors.pekerjaan && <p className="text-red-500 text-sm">{errors.pekerjaan}</p>}
            </div>
            <div>
              <label>Alamat</label>
              <input name="alamat" className={inputStyle("alamat")} onChange={handleChange} />
              {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
            </div>
            <div>
              <label>Jenis Kelamin</label>
              <select name="jenisKelamin" className={inputStyle("jenisKelamin")} onChange={handleChange}>
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin}</p>}
            </div>
          </div>

          <hr className="my-8" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label>Nama Ayah</label>
              <input name="namaAyah" className={inputStyle("namaAyah")} onChange={handleChange} />
              {errors.namaAyah && <p className="text-red-500 text-sm">{errors.namaAyah}</p>}
            </div>
            <div>
              <label>Pekerjaan Ayah</label>
              <input name="pekerjaanAyah" className={inputStyle("pekerjaanAyah")} onChange={handleChange} />
              {errors.pekerjaanAyah && <p className="text-red-500 text-sm">{errors.pekerjaanAyah}</p>}
            </div>
            <div>
              <label>Nama Ibu</label>
              <input name="namaIbu" className={inputStyle("namaIbu")} onChange={handleChange} />
              {errors.namaIbu && <p className="text-red-500 text-sm">{errors.namaIbu}</p>}
            </div>
            <div>
              <label>Pekerjaan Ibu</label>
              <input name="pekerjaanIbu" className={inputStyle("pekerjaanIbu")} onChange={handleChange} />
              {errors.pekerjaanIbu && <p className="text-red-500 text-sm">{errors.pekerjaanIbu}</p>}
            </div>
            <div>
              <label>Jumlah Tanggungan</label>
              <input name="jumlahTanggungan" className={inputStyle("jumlahTanggungan")} onChange={handleChange} />
              {errors.jumlahTanggungan && <p className="text-red-500 text-sm">{errors.jumlahTanggungan}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button type="button" onClick={onBack} className="px-6 py-2 bg-green-600 text-white rounded-md">
              Kembali
            </button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
              {tombolLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
