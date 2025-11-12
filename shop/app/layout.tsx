"use client";

import "./globals.css";
import Image from "next/image";
import { useState } from "react";
import { IoCartOutline, IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gradient-to-br from-slate-50 to-cyan-50 min-h-screen font-vazir">
        {/* Header */}
        <header className="z-50">
          <div className="mx-4 mt-4 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
              {/* لوگو */}
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="لوگو"
                  width={64}
                  height={24}
                  className="object-contain"
                  priority
                />
                <span className="hidden sm:inline-block text-slate-700 font-semibold">
                  فروشگاه دیجیتال
                </span>
              </div>

              {/* منو موبایل */}
              <button
                className="md:hidden grid place-items-center size-10 rounded-xl border border-slate-200 hover:bg-slate-100 active:scale-95 transition"
                aria-label="باز/بسته کردن منو"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((p) => !p)}
              >
                <IoMenu className="text-2xl" />
              </button>

              {/* منوی دسکتاپ */}
              <nav className="hidden md:flex items-center gap-2">
                <a
                  href="#products"
                  className="px-4 py-2 rounded-xl text-slate-700 hover:text-cyan-700 hover:bg-cyan-50 transition"
                >
                  محصولات
                </a>
                <a
                  href="#offers"
                  className="px-4 py-2 rounded-xl text-slate-700 hover:text-cyan-700 hover:bg-cyan-50 transition"
                >
                  پیشنهادها
                </a>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl text-slate-700 hover:text-cyan-700 hover:bg-cyan-50 transition"
                >
                  تماس با ما
                </a>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <div className="flex items-center gap-1 ps-2">
                  <button
                    className="text-2xl p-2 rounded-xl hover:bg-slate-100 transition"
                    aria-label="سبد خرید"
                    title="سبد خرید"
                  >
                    <IoCartOutline />
                  </button>
                  <button
                    className="text-2xl p-2 rounded-xl hover:bg-slate-100 transition"
                    aria-label="اعلان‌ها"
                    title="اعلان‌ها"
                  >
                    <FaRegBell />
                  </button>
                </div>
              </nav>
            </div>

            {/* منوی موبایل */}
            <div
              id="mobile-menu"
              className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
                open ? "max-h-72" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 pt-0 flex flex-col gap-2">
                <a
                  href="#products"
                  className="block rounded-xl px-3 py-2 hover:bg-cyan-50 text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  محصولات
                </a>
                <a
                  href="#offers"
                  className="block rounded-xl px-3 py-2 hover:bg-cyan-50 text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  پیشنهادها
                </a>
                <a
                  href="#contact"
                  className="block rounded-xl px-3 py-2 hover:bg-cyan-50 text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  تماس با ما
                </a>

                <div className="flex items-center justify-start gap-1 mt-1">
                  <button
                    className="text-2xl p-2 rounded-xl hover:bg-slate-100 transition"
                    aria-label="سبد خرید"
                    onClick={() => setOpen(false)}
                  >
                    <IoCartOutline />
                  </button>
                  <button
                    className="text-2xl p-2 rounded-xl hover:bg-slate-100 transition"
                    aria-label="اعلان‌ها"
                    onClick={() => setOpen(false)}
                  >
                    <FaRegBell />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="px-4 md:px-6 pt-4 pb-10">{children}</main>
      </body>
    </html>
  );
}
