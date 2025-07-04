"use client";

export default function ModalPenjelasan({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-md">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-2xl rounded-md p-8 shadow-xl relative">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Konten Modal */}
        <h2 className="text-xl font-bold mb-4">Penjelasan surat SK Tidak Mampu</h2>
        <p className="text-sm text-gray-800 mb-4 leading-relaxed">
          Surat Keterangan Tidak Mampu (SKTM) adalah surat resmi yang dikeluarkan oleh
          pemerintah desa sebagai bukti bahwa seseorang tergolong dalam keluarga dengan
          kondisi ekonomi kurang mampu. Surat ini biasanya digunakan untuk keperluan:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-800 mb-6">
          <li>Pengajuan beasiswa</li>
          <li>Pengurusan layanan kesehatan gratis</li>
          <li>Pembebasan atau keringanan biaya pendidikan</li>
          <li>
            Keperluan administratif lainnya yang memerlukan bukti ketidakmampuan ekonomi
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Persyaratan yang Harus Dibawa</h3>
        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-8">
          <li>Fotokopi Kartu Keluarga (KK)</li>
          <li>Fotokopi KTP Pemohon / Orang Tua (jika untuk anak)</li>
          <li>Surat Pengantar dari RT/RW</li>
          <li>
            Keterangan tujuan pembuatan SKTM (misalnya: untuk beasiswa, rumah sakit, dll.)
          </li>
          <li>Mengisi formulir permohonan SKTM di kantor desa</li>
        </ul>

        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm"
          >
            kembali
          </button>
        </div>
      </div>
    </div>
  );
}
