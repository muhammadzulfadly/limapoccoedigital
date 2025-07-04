'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PreviewSuratPage() {
  const { jenisSurat, ajuanId } = useParams();
  const router = useRouter();

  const [slug, setSlug] = useState(null);
  const [namaUser, setNamaUser] = useState('');
  const [namaSurat, setNamaSurat] = useState('');
  const [status, setStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Ambil slug & nama surat
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !jenisSurat) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.jenis_surat?.find((item) => item.id.toString() === jenisSurat);
        if (found) {
          setSlug(found.slug);
          setNamaSurat(found.nama_surat);
        }
      })
      .catch(() => {
        setNamaSurat('Surat');
      });
  }, [jenisSurat]);

  // Ambil data preview dari endpoint backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!slug || !ajuanId) return;

    const fetchPreview = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/preview/surat/${slug}/ajuan/${ajuanId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Gagal mengambil preview surat');

        const data = await res.json();
        setNamaUser(data.nama || 'Pemohon');
        setStatus(data.status || '');
        setPreviewUrl(data.url); // URL file PDF
      } catch (err) {
        console.error('⚠️ Gagal fetch preview:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [slug, ajuanId]);

  const handleProsesTandaTangan = async () => {
    setProcessing(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat/${slug}/pengajuan/${ajuanId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'confirmed' }),
      });

      if (!res.ok) throw new Error('Gagal mengubah status menjadi confirmed.');

      router.push(`/admin/pengajuan-surat/${jenisSurat}`);
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat mengubah status.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="p-10">Memuat preview surat...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="mb-4 font-bold text-lg">
        {namaUser} / {namaSurat} / {status || 'Butuh konfirmasi'}
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden min-h-[80vh]">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="Preview Surat"
            className="w-full h-[90vh]"
            frameBorder="0"
          />
        ) : (
          <div className="flex items-center justify-center h-[80vh] text-gray-500">
            Tidak dapat menampilkan preview surat.
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm mt-4 text-right">{errorMsg}</p>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleProsesTandaTangan}
          disabled={processing}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {processing ? 'Memproses...' : 'Proses tanda tangan'}
        </button>
      </div>
    </div>
  );
}
