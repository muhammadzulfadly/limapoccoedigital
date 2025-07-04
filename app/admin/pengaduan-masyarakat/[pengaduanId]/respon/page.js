'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ResponPengaduanPage() {
  const { pengaduanId } = useParams();
  const router = useRouter();
  const [response, setRespon] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [namaUser, setNamaUser] = useState('');

  useEffect(() => {
    const fetchNamaPengadu = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/admin/pengaduan-masyarakat/${pengaduanId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Gagal mengambil data pengguna.');

        const data = await res.json();
        const nama = data.aduan?.user?.name || 'Pengguna';
        setNamaUser(nama);
      } catch (err) {
        console.error(err);
        setNamaUser('Pengguna');
      }
    };

    if (pengaduanId) {
      fetchNamaPengadu();
    }
  }, [pengaduanId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/pengaduan-masyarakat/${pengaduanId}/processed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          response,

        }),
      });

      if (!res.ok) {
        throw new Error('Gagal mengirim respon.');
      }

      router.push('/admin/pengaduan-masyarakat');
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-6">
          Pengaduan/<span className="capitalize">{namaUser}</span>
        </h1>
        <h2 className="text-lg font-semibold mb-4">Respon Pengaduan</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={response}
            onChange={(e) => setRespon(e.target.value)}
            placeholder="Ketik tanggapan..."
            rows={5}
            className="w-full border rounded px-4 py-3 mb-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          ></textarea>

          {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Mengirim...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
