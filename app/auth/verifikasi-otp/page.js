"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    const newOtp = [...otp];
    if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    newOtp[index] = value.charAt(0);
    setOtp(newOtp);

    // Fokus ke input selanjutnya jika ada
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code !== "112233") {
      setError(true);
    } else {
      setError(false);
      alert("OTP Valid");
      router.push("/auth/lengkapi-profil");
    }
  };

  return (
    <div className="w-full max-w-md">
      <button onClick={() => router.back()} className="absolute top-6 left-6 text-2xl">
        ←
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">VERIFIKASI OTP</h2>
      <p className="text-center text-gray-600 mb-2">
        Masukan kode OTP yang di kirim
        <br />
        ke nomor <span className="font-bold">+6281123123123</span>
      </p>

      <div className="flex justify-between items-center gap-2 mt-6 mb-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`w-12 h-14 text-center text-2xl border rounded-md focus:outline-none ${error ? "border-red-500 text-red-500" : "border-gray-400"}`}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-center font-semibold mt-1">Kode OTP Tidak Valid</p>}

      <div className="text-green-600 text-center mt-4">05:00</div>

      <p className="text-center text-sm mt-2">
        Tidak dapat kode OTP?{" "}
        <a href="#" className="text-sm underline">
          Kirim ulang kode
        </a>
      </p>

      <div className="flex justify-center mt-6">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-2 rounded-md">
          Verifikasi
        </button>
      </div>
    </div>
  );
}
