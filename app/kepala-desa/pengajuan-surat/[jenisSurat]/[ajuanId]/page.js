'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PreviewSuratPage() {
  const { jenisSurat, ajuanId } = useParams();
  const router = useRouter();

  const [slug, setSlug] = useState('');
  const [namaUser, setNamaUser] = useState('');
  const [namaSurat, setNamaSurat] = useState('');
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Ambil token dari localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setErrorMsg('Token tidak ditemukan. Silakan login ulang.');
      return;
    }
    setToken(storedToken);
  }, []);

  // Ambil metadata surat
  useEffect(() => {
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
        } else {
          setNamaSurat('Surat Tidak Diketahui');
        }
      })
      .catch(() => {
        setNamaSurat('Surat');
      });
  }, [token, jenisSurat]);

  // Simulasi data user & status
  useEffect(() => {
    if (ajuanId) {
      setNamaUser('Pemohon');
      setStatus('Butuh konfirmasi');
      setLoading(false);
    } 
  }, [ajuanId]);

  const handleProsesTandaTangan = async () => {
    setProcessing(true);
    setErrorMsg('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surat/${slug}/pengajuan/${ajuanId}/signed`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'approved' }),
        }
      );

      router.push(`/kepala-desa/pengajuan-surat/${jenisSurat}`);
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat mengubah status.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading || !slug || !token) {
    return <div className="p-10">MOHON TUNGGU 10 MENIT.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="mb-4 font-bold text-lg">
        {namaUser} / {namaSurat} / {status || 'Status tidak tersedia'}
      </div>

      <div className="my-4 bg-white shadow-md rounded-md overflow-hidden min-h-[80vh]">
        <iframe
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/preview-surat/${slug}/${ajuanId}?token=${token}`}
          width="100%"
          height="700"
          className="w-full border"
          title="Preview Surat"
        />
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
          {processing ? 'Memproses...' : 'Tanda Tangani Surat'}
        </button>
      </div>
    </div>
  );
}
