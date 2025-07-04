'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const formSchemaBySuratKode = {
  SKTM: [
    { name: 'nama_ayah', label: 'Nama Ayah', type: 'text' },
    { name: 'pekerjaan_ayah', label: 'Pekerjaan Ayah', type: 'text' },
    { name: 'nama_ibu', label: 'Nama Ibu', type: 'text' },
    { name: 'pekerjaan_ibu', label: 'Pekerjaan Ibu', type: 'text' },
    { name: 'jumlah_tanggungan', label: 'Jumlah Tanggungan', type: 'number' },
    { name: 'pekerjaan', label: 'Pekerjaan', type: 'text' },
  ],
  SKU: [
    { name: 'pekerjaan', label: 'Pekerjaan', type: 'text' },
    { name: 'nama_usaha', label: 'Nama Usaha', type: 'text' },
    { name: 'lokasi_usaha', label: 'Lokasi Usaha', type: 'text' },
  ],
};

export default function BuatSuratBaru() {
  const router = useRouter();
  const { jenisSurat } = useParams(); // ini ID dari URL
  const [formKey, setFormKey] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
  });
  const [lampiran, setLampiran] = useState(null);
  const [surat, setSurat] = useState(null);
  const [suratSlug, setSuratSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurat = async () => {
      const token = localStorage.getItem('token');
      if (!token || !jenisSurat) return;

      try {
        const suratRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const suratData = await suratRes.json();
        const selected = suratData.jenis_surat?.find((item) => item.id.toString() === jenisSurat);
        if (!selected) throw new Error('Surat tidak ditemukan.');

        setSurat(selected);
        setFormKey(selected.kode_surat);
        setSuratSlug(selected.slug);
      } catch (err) {
        console.error('Gagal memuat jenis surat:', err);
        alert('Gagal memuat data surat.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurat();
  }, [jenisSurat]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Token tidak tersedia.');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(`data_surat[${key}]`, value);
    });
    if (lampiran) data.append('lampiran', lampiran);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat/${suratSlug}/pengajuan`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
          body: data,
        }
      );

      const result = await res.json();
      if (!res.ok) {
        console.error('Gagal:', result);
        return alert(`Gagal: ${result.message || 'Terjadi kesalahan.'}`);
      }

      alert('✅ Pengajuan berhasil dibuat!');
      router.push(`/admin/pengajuan-surat/${jenisSurat}`);
    } catch (err) {
      console.error('Gagal submit:', err);
      alert('Gagal mengirim pengajuan.');
    }
  };

  const fields = formSchemaBySuratKode[formKey] || [];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        📝 Tambah Pengajuan Surat {surat?.nama_surat || ''}
      </h2>

      {loading ? (
        <p>⏳ Memuat data formulir...</p>
      ) : !formKey ? (
        <p className="text-red-600">Formulir tidak tersedia untuk jenis surat ini.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Manual oleh Admin */}
          <fieldset className="border p-4 rounded bg-gray-50">
            <legend className="text-sm font-semibold text-gray-700">👤 Data Pemohon</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="text-sm block text-gray-600 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm block text-gray-600 mb-1">NIK</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>
          </fieldset>

          {/* Form dinamis berdasarkan jenis surat */}
          <div>
            <h3 className="text-sm font-semibold mb-2">📋 Data Tambahan</h3>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Upload lampiran */}
          <div>
            <label className="block text-sm font-medium mb-1">📎 Lampiran (opsional)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setLampiran(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded font-semibold"
            >
              🚀 Simpan Pengajuan
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
