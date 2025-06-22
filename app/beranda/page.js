"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/banners/slide1.png",
  },
  {
    image: "/banners/slide2.png",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  const slide = slides[current];

  return (
    <>
      {/* Banner */}
      <div className="relative w-full h-[450px] overflow-hidden bg-black">
        {/* Gambar tampil utuh */}
        <Image src={slide.image} alt="Banner Slide" fill className="object-cover" priority />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Tombol Panah */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 z-20">
          <button onClick={prevSlide} className="text-white bg-black bg-opacity-30 hover:bg-opacity-60 p-2 rounded-full">
            <span className="text-2xl">{"<"}</span>
          </button>
          <button onClick={nextSlide} className="text-white bg-black bg-opacity-30 hover:bg-opacity-60 p-2 rounded-full">
            <span className="text-2xl">{">"}</span>
          </button>
        </div>
      </div>

      {/* LAYANAN KAMI */}
      <section className="py-20 px-4 bg-[#F6F6F6] text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">LAYANAN KAMI</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base">
          Kami menyediakan platform digital untuk mempermudah masyarakat dalam mengajukan permohonan surat serta menyampaikan pengaduan secara online. Tanpa perlu datang ke kantor desa, semua layanan kini dapat diakses dengan cepat, mudah,
          dan transparan.
        </p>

        <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 items-center">
          {/* Pengajuan Surat */}
          <div className="max-w-xs text-center">
            <Image src="/icons/surat.png" alt="Ikon Surat" width={150} height={150} className="mx-auto" />

            <Link href="/masyarakat/pengajuan-surat">
              <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow-md font-medium hover:bg-green-600 transition">Pengajuan Surat</button>
            </Link>

            <p className="mt-4 text-gray-600 text-sm">Ajukan berbagai jenis surat secara online, mudah dan tanpa antre.</p>
          </div>

          {/* Pengaduan */}
          <div className="max-w-xs text-center">
            <Image src="/icons/pengaduan.png" alt="Ikon Pengaduan" width={150} height={150} className="mx-auto" />

            <Link href="/masyarakat/pengaduan-masyarakat">
              <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow-md font-medium hover:bg-green-600 transition">Pengaduan</button>
            </Link>

            <p className="mt-4 text-gray-600 text-sm">Sampaikan keluhan atau aspirasi Anda langsung ke pihak desa, cepat dan praktis.</p>
          </div>
        </div>
      </section>

      {/* Tentang Desa */}
      <section className="bg-[#F0FFF6] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Kiri: Gambar */}
          <div className="rounded-xl overflow-hidden border-4 border-blue-100">
            <Image src="/images/tentang-desa.png" alt="Tentang Desa Limmapocoe" width={700} height={400} className="w-full h-auto object-cover" />
          </div>

          {/* Kanan: Teks */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Tentang Desa Limmapocoe</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              <strong>Sekilas tentang desa.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc et convallis placerat, ex nisi volutpat sapien, vel eleifend elit libero a erat. Sed nec augue at urna
              vehicula pretium sit amet vel odio. Praesent ac orci eu tortor vehicula.
            </p>

            <div className="space-y-5">
              {/* Kepala Desa */}
              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.534 6.121 1.476M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sugeng Raharjo</p>
                  <p className="text-sm text-gray-600">Kepala Desa Limmapocoe</p>
                </div>
              </div>

              {/* Wakil Desa */}
              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.534 6.121 1.476M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Hendra Gunawan</p>
                  <p className="text-sm text-gray-600">Wakil Desa Limmapocoe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Desa Limmapocoe */}
      <section className="bg-[#F6F6F6] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Berita Desa Limmapocoe</h2>
          <p className="text-gray-600 mb-10 text-sm sm:text-base max-w-2xl">Berita Desa Limmapocoe menyajikan informasi terbaru seputar kegiatan, pengumuman, dan perkembangan di lingkungan Desa Limmapocoe.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden border border-green-400 shadow-sm">
                {/* Gambar */}
                <div className="relative">
                  <Image src="/images/berita-desa.png" alt="Foto Rapat" width={400} height={250} className="w-full h-52 object-cover" />
                  <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded">9 Mei 2025</span>
                </div>

                {/* Isi */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Hasil sidang rapat desa</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Hasil sidang rapat desa Hasil sidang rapat desa Hasil sidang rapat desa Hasil sidang rapat desa Hasil sidang rapat desa Hasil sidang rapat desa</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wisata Desa Limmapocoe */}
      <section className="bg-[#F0FFF6] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Wisata Desa Limmapocoe</h2>
          <p className="text-gray-700 mb-10 text-sm sm:text-base max-w-3xl">Wisata Desa Limmapoccoe menawarkan pesona alam dan budaya lokal yang masih asri, cocok untuk rekreasi dan pengalaman wisata desa yang autentik.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-green-400">
                {/* Gambar */}
                <div className="rounded-t-2xl overflow-hidden">
                  <Image src="/images/wisata-desa.png" alt="Wisata Desa" width={400} height={250} className="w-full h-52 object-cover" />
                </div>

                {/* Konten */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pemandian air hangat</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc et convallis placerat, ex nisi volutpat sapien, vel eleifend elit libero a erat.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Desa Limmapocoe */}
      <section className="bg-[#F6F6F6] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Galeri Desa Limmapocoe</h2>
          <p className="text-gray-600 mb-10 text-sm sm:text-base max-w-2xl">Galeri Desa Limmapocoe menampilkan dokumentasi foto kegiatan yang berlangsung di desa Limapoccoe.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["/images/galeri1.png", "/images/galeri2.png", "/images/galeri1.png", "/images/galeri2.png", "/images/galeri1.png", "/images/galeri2.png"].map((src, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <Image src={src} alt={`Galeri ${index + 1}`} width={400} height={250} className="w-full h-56 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Desa Limmapocoe */}
      <section className="bg-[#F0FFF6] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Produk Desa Limmapocoe</h2>
          <p className="text-gray-700 mb-10 text-sm sm:text-base max-w-3xl">Produk Desa Limapoccoe merupakan hasil karya dan potensi lokal yang mencerminkan kekayaan sumber daya dan keterampilan masyarakat desa.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["/images/produk/produk1.png", "/images/produk/produk2.png", "/images/produk/produk3.png", "/images/produk/produk3.png", "/images/produk/produk3.png", "/images/produk/produk3.png"].map((src, index) => (
              <div key={index} className="rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src={src} alt={`Produk ${index + 1}`} width={400} height={250} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="flex justify-between items-center bg-green-500 text-white px-4 py-3 text-sm font-semibold rounded-b-xl">
                  <span>Kripik kaca</span>
                  <span>Rp. 100.000</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jumlah Penduduk Desa Limmapocoe */}
      <section className="bg-[#F6F6F6] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Jumlah Penduduk Desa Limmapocoe</h2>
          <p className="text-gray-700 mb-10 text-sm sm:text-base max-w-3xl">Jumlah Penduduk dan Kepala Keluarga Desa Limapoccoe mencerminkan data demografis terkini yang digunakan sebagai dasar perencanaan dan pelayanan publik desa.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* TOTAL PENDUDUK */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <Image src="/images/penduduk/total.png" alt="Total Penduduk" width={60} height={60} />
              <div>
                <p className="text-lg font-semibold text-gray-600">TOTAL PENDUDUK</p>
                <p className="text-xl font-bold text-gray-800">
                  1.092 <span className="font-medium">Jiwa</span>
                </p>
              </div>
            </div>

            {/* KEPALA KELUARGA */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <Image src="/images/penduduk/kepala-keluarga.png" alt="Kepala Keluarga" width={60} height={60} />
              <div>
                <p className="text-lg font-semibold text-gray-600">KEPALA KELUARGA</p>
                <p className="text-xl font-bold text-gray-800">
                  1.092 <span className="font-medium">Jiwa</span>
                </p>
              </div>
            </div>

            {/* PEREMPUAN */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <Image src="/images/penduduk/perempuan.png" alt="Perempuan" width={60} height={60} />
              <div>
                <p className="text-lg font-semibold text-gray-600">PEREMPUAN</p>
                <p className="text-xl font-bold text-gray-800">
                  1.092 <span className="font-medium">Jiwa</span>
                </p>
              </div>
            </div>

            {/* LAKI-LAKI */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <Image src="/images/penduduk/laki-laki.png" alt="Laki-Laki" width={60} height={60} />
              <div>
                <p className="text-lg font-semibold text-gray-600">LAKI-LAKI</p>
                <p className="text-xl font-bold text-gray-800">
                  1.092 <span className="font-medium">Jiwa</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tombol WhatsApp Floating */}
      <a href="https://wa.me/6282246805359" target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition">
        <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
        <span className="text-sm font-medium">Chat</span>
      </a>
    </>
  );
}
