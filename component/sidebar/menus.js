// components/sidebar/menus.js

export const getSidebarMenu = (role) => {
  const sharedMenu = [
    { label: "Beranda", href: "/beranda" },
    { label: "Pengaduan", href: `/${role}/pengaduan-masyarakat` },
    {
      label: "Pengajuan Surat",
      href: `/${role}/pengajuan-surat`,
      children: [
        { label: "SK Tidak Mampu", href: `/${role}/pengajuan-surat/sk-tidak-mampu` },
        { label: "SK Usaha", href: `/${role}/pengajuan-surat/sk-usaha` },
        { label: "SKCK", href: `/${role}/pengajuan-surat/skck` },
        { label: "SK Rekomendasi Pembelian BBM", href: `/${role}/pengajuan-surat/sk-rekomendasi-pembelian-bbm` },
        { label: "SK Kelahiran", href: `/${role}/pengajuan-surat/sk-kelahiran` },
        { label: "SK Kehilangan KK", href: `/${role}/pengajuan-surat/sk-kehilangan-kk` },
        { label: "SK Belum Menikah", href: `/${role}/pengajuan-surat/sk-belum-menikah` },
        { label: "SK Mahar", href: `/${role}/pengajuan-surat/sk-mahar` },
        { label: "SK Nikah", href: `/${role}/pengajuan-surat/sk-nikah` },
        { label: "SK Penghasilan", href: `/${role}/pengajuan-surat/sk-penghasilan` },
        { label: "Surat Domisili", href: `/${role}/pengajuan-surat/surat-domisili` },
      ],
    },
  ];

  const adminExtra = [
    { label: "Informasi Desa", href: "/admin/informasi-desa" },
    { label: "Data Penduduk", href: "/admin/data-kependudukan" },
  ];

  if (role === "admin") {
    // Sisipkan adminExtra setelah "Beranda"
    return [
      sharedMenu[0],     // "Beranda"
      ...adminExtra,
      ...sharedMenu.slice(1), // "Pengaduan" dan "Pengajuan Surat"
    ];
  }

  return sharedMenu;
};
