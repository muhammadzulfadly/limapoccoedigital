"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { getFormComponent } from "@/component/form";

export default function BuatSuratBaru() {
  const router = useRouter();
  const { jenisSurat } = useParams();
  const capitalizeWords = (text) => text.replace(/\b\w/g, (char) => char.toUpperCase());

  const FormComponent = getFormComponent(jenisSurat);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [nomorSurat, setNomorSurat] = useState("");

  if (!FormComponent) {
    return <p className="text-red-600 p-4">Form untuk jenis surat tidak ditemukan.</p>;
  }

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleFinalSubmit = () => {
    const finalData = {
      ...formData,
      nomorSurat,
    };
    alert("Berhasil mengajukan surat!");
    setShowModal(false);
    router.push(`/admin/pengajuan-surat/${jenisSurat}`);
  };

  return (
    <div className="relative">
      <FormComponent title={`Dashboard Pengajuan Surat / ${capitalizeWords(jenisSurat.replace(/-/g, " "))} / Buat Surat Baru`} onBack={() => router.back()} onSubmit={handleFormSubmit} tombolLabel="Selanjutnya" />

      {/* Modal input nomor surat */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow">
            <h2 className="text-lg font-semibold mb-4">Masukkan Nomor Surat</h2>
            <input type="text" value={nomorSurat} onChange={(e) => setNomorSurat(e.target.value)} placeholder="Contoh: 470/2024" className="w-full border border-gray-300 rounded px-3 py-2 mb-4" />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50" disabled={!nomorSurat.trim()} onClick={handleFinalSubmit}>
                Kirim Surat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
