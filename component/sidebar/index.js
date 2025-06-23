"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getSidebarMenu } from "./menus";

export default function Sidebar({ role = "admin" }) {
  const pathname = usePathname();
  const menu = getSidebarMenu(role);

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);
  const linkClass = (path) => `${isActive(path) ? "text-green-500 font-medium" : "text-black"} hover:text-green-600 block`;

  const isPengajuanSuratActive = useMemo(() => pathname.startsWith(`/${role}/pengajuan-surat`), [pathname]);

  const [isOpen, setIsOpen] = useState(isPengajuanSuratActive);

  const roleDisplay = {
    admin: "Admin",
    "kepala-desa": "Kepala Desa",
    masyarakat: "",
  };

  useEffect(() => {
    const hasActiveChildren = menu.some((item) => item.children?.some((child) => isActive(child.href)));
    if (hasActiveChildren) setIsOpen(true);
  }, [pathname]);

  useEffect(() => {
    setIsOpen(isPengajuanSuratActive);
  }, [isPengajuanSuratActive]);

  return (
    <aside className="w-56 p-4 h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px]">
{role !== "masyarakat" && (
  <h1 className="font-semibold text-2xl mb-4">
    {roleDisplay[role] || ""}
  </h1>
)}

      <h2 className="font-semibold text-base mb-4">Pelayanan Desa</h2>
      <ul className="space-y-3 text-sm pl-4">
        {menu.map((item) =>
          item.children ? (
            <li key={item.label}>
              <div className="flex items-center gap-7">
                <Link href={item.href} className={`font-medium hover:text-green-600 ${isActive(item.href) ? "text-green-500" : "text-black"}`}>
                  {item.label}
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="ml-1 focus:outline-none">
                  <ChevronRight size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-green-500" : "text-black"}`} />
                </button>
              </div>
              {isOpen && (
                <ul className="pl-4 mt-4 space-y-3 text-sm">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className={linkClass(child.href)}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </aside>
  );
}
