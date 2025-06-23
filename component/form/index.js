
import SKTidakMampuForm from "./sk-tidak-mampu";
// import SKUsahaForm from "./sk-usaha";
// import SKCKForm from "./skck";
// import SKRekomendasiBBMForm from "./sk-rekomendasi-pembelian-bbm";
// import SKKelahiranForm from "./sk-kelahiran";
// import SKKehilanganKKForm from "./sk-kehilangan-kk";
// import SKBelumMenikahForm from "./sk-belum-menikah";
// import SKMaharForm from "./sk-mahar";
// import SKNikahForm from "./sk-nikah";
// import SKPenghasilanForm from "./sk-pengasilan";
// import SuratDomisiliForm from "./surat-domisili";
// import SKBelumMemilikiRumahForm from "./sk-belum-memiliki-rumah";


const formMap = {
  "sk-tidak-mampu": SKTidakMampuForm,
//   "sk-usaha": SKUsahaForm,
//   "skck": SKCKForm,
//   "sk-rekomendasi-pembelian-bbm": SKRekomendasiBBMForm,
//   "sk-kelahiran": SKKelahiranForm,
//   "sk-kehilangan-kk": SKKehilanganKKForm,
//   "sk-belum-menikah": SKBelumMenikahForm,
//   "sk-mahar": SKMaharForm,
//   "sk-nikah": SKNikahForm,
//   "sk-penghasilan": SKPenghasilanForm,
//   "surat-domisili": SuratDomisiliForm,
//   "sk-belum-memiliki-rumah": SKBelumMemilikiRumahForm,
};


export function getFormComponent(jenisSurat) {
  return formMap[jenisSurat] || null;
}
