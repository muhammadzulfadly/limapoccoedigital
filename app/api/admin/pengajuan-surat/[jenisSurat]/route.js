// app/api/surat/[jenisSurat]/route.js
export async function POST(req, { params }) {
  const body = await req.json();
  const { jenisSurat } = params;

  const res = await fetch(`${process.env.API_SECRET_URL}/surat/${jenisSurat}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}


// const handleSubmit = async (formData) => {
//   try {
//     const res = await fetch(`/api/surat/${jenisSurat}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!res.ok) throw new Error("Gagal mengirim data");
//     alert("Surat berhasil diajukan");
//     router.push(`/masyarakat/pengajuan-surat/${jenisSurat}`);
//   } catch (err) {
//     alert("Terjadi kesalahan: " + err.message);
//   }
// };
