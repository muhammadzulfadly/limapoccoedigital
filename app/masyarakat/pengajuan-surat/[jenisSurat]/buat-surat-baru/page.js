"use client";

import { useRouter, useParams } from "next/navigation";
import { getFormComponent } from "@/component/form";

export default function BuatSuratBaru() {
  const router = useRouter();
  const { jenisSurat } = useParams();

  const FormComponent = getFormComponent(jenisSurat);
  if (!FormComponent) return <p className="text-red-600 p-4">Form tidak ditemukan.</p>;

  const title = `Pengajuan Surat / ${jenisSurat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} / Buat Surat Baru`;

  return (
    <FormComponent
      title={title}
      onBack={() => router.back()}
      onSubmit={() => {
        alert("Surat berhasil diajukan");
        router.push(`/masyarakat/pengajuan-surat/${jenisSurat}`);
      }}
      tombolLabel="Kirim"
    />
  );
}
