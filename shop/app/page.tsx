"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  discount?: number;
};

const products: Product[] = [
  { id: 1, title: "هدفون بلوتوثی مدل Pro", price: 1899000, oldPrice: 2299000, rating: 4.6, reviews: 312, discount: 17, badge: "ارسال سریع" },
  { id: 2, title: "اسمارت‌واچ سری X", price: 2499000, oldPrice: 2999000, rating: 4.4, reviews: 180, discount: 17 },
  { id: 3, title: "اسپیکر قابل‌حمل Bass+", price: 1599000, oldPrice: 1799000, rating: 4.2, reviews: 94, discount: 11 },
  { id: 4, title: "ماوس گیمینگ RGB", price: 899000, oldPrice: 1199000, rating: 4.7, reviews: 540, discount: 25, badge: "پرفروش" },
  { id: 5, title: "کیبورد مکانیکال Blue", price: 1699000, oldPrice: 1899000, rating: 4.3, reviews: 76, discount: 11 },
  { id: 6, title: "دوربین اکشن 4K", price: 3299000, oldPrice: 3799000, rating: 4.1, reviews: 51, discount: 13 },
  { id: 7, title: "هارد اکسترنال 1TB", price: 2099000, oldPrice: 2399000, rating: 4.5, reviews: 420, discount: 12 },
  { id: 8, title: "کارت حافظه 128GB", price: 639000, oldPrice: 799000, rating: 4.4, reviews: 260, discount: 20 },
];

function faPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

function Stars({ value = 0 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5" aria-label={`امتیاز ${value} از ۵`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} viewBox="0 0 24 24" className="w-4 h-4 fill-yellow-400"><path d="m12 17.27 6.18 3.73-1.64-7.03L21.5 9.5l-7.19-.62L12 2 9.69 8.88 2.5 9.5l4.96 4.47-1.64 7.03z"/></svg>
      ))}
      {half && (
        <svg viewBox="0 0 24 24" className="w-4 h-4"><defs><linearGradient id="half"><stop offset="50%" /><stop offset="50%" stopColor="transparent"/></linearGradient></defs><path d="m12 17.27 6.18 3.73-1.64-7.03L21.5 9.5l-7.19-.62L12 2 9.69 8.88 2.5 9.5l4.96 4.47-1.64 7.03z" fill="url(#half)" stroke="currentColor"/></svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} viewBox="0 0 24 24" className="w-4 h-4 text-slate-300" fill="currentColor"><path d="m12 17.27 6.18 3.73-1.64-7.03L21.5 9.5l-7.19-.62L12 2 9.69 8.88 2.5 9.5l4.96 4.47-1.64 7.03z"/></svg>
      ))}
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={
            p.id === 1 ? "/images/headphone.png"
            : p.id === 2 ? "/images/smartWatch.png"
            : p.id === 3 ? "/images/speacker.png"
            : p.id === 4 ? "/images/mouse.png"
            : p.id === 5 ? "/images/keyboard.png"
            : p.id === 6 ? "/images/webcam.png"
            : p.id === 7 ? "/images/ssd.png"
            : p.id === 8 ? "/images/cpu.png"
            : "/images/intro.png"
          }
          alt={p.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover"
          priority
        />
        {p.discount && (
          <span className="absolute top-3 start-3 text-[11px] px-2 py-1 rounded-full bg-rose-600 text-white">
            %{p.discount} تخفیف
          </span>
        )}
        {p.badge && (
          <span className="absolute top-3 end-3 text-[11px] px-2 py-1 rounded-full bg-cyan-600 text-white">
            {p.badge}
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 min-h-[40px] text-slate-800">{p.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars value={p.rating} />
            {p.reviews ? (
              <span className="text-xs text-slate-500">({p.reviews.toLocaleString("fa-IR")})</span>
            ) : null}
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">
              {faPrice(p.price)} <span className="text-slate-500 text-xs">تومان</span>
            </span>
            {p.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {faPrice(p.oldPrice)} تومان
              </span>
            )}
          </div>
          <button className="rounded-xl border px-3 py-1.5 text-sm border-slate-200 hover:border-cyan-300 hover:bg-cyan-50">
            افزودن به سبد
          </button>
        </div>
      </div>
    </div>
  );
}

function Countdown({ to }: { to: Date }) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, to.getTime() - now.getTime());
  const sec = Math.floor(diff / 1000);
  const hh = Math.floor(sec / 3600);
  const mm = Math.floor((sec % 3600) / 60);
  const ss = sec % 60;
  const pad = (n: number) => n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 });
  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">{pad(hh)}</span>:
      <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">{pad(mm)}</span>:
      <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">{pad(ss)}</span>
    </div>
  );
}

export default function Home() {
  const endTime = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + 6);
    return d;
  }, []);

  const cats = ["موبایل", "لپ‌تاپ", "هدفون", "ساعت هوشمند", "گیمینگ", "حافظه", "اسپیکر", "دوربین"];

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-2">
        <div className="flex items-center gap-3 py-3">
          <div className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/intro.png"
              alt="لوگو"
              width={48}
              height={20}
              className="object-cover rounded-md"
              priority
            />
          </div>

          <div className="flex-1">
            <label className="relative block">
              <input
                type="search"
                placeholder="جستجو در محصولات..."
                className="w-full rounded-xl bg-white border border-slate-200 px-4 py-2.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 text-sm text-slate-700">
            {cats.map((c) => (
              <a key={c} href="#products" className="shrink-0 px-3 py-1.5 rounded-full hover:bg-slate-100">
                {c}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative h-48 sm:h-64 lg:col-span-2 rounded-2xl overflow-hidden">
            <Image
              src="/images/laptop.png"
              alt="بنر اصلی"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
            <div className="absolute bottom-4 right-4 text-white">
              <h1 className="text-xl sm:text-2xl font-bold">پیشنهادهای ویژه</h1>
              <p className="text-white/90 text-sm mt-1">ارسال سریع به سراسر کشور</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["/images/phone.png", "/images/headphone.png", "/images/smartWatch.png", "/images/speacker.png"].map((src, i) => (
              <div key={i} className="relative h-24 sm:h-30 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image src={src} alt={`بنر ${i + 1}`} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-8" id="offers">
        <div className="rounded-2xl border border-rose-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-rose-50">
            <div className="flex items-center gap-3">
              <span className="text-rose-700 font-bold">پیشنهادهای شگفت‌انگیز</span>
              <Countdown to={new Date(Date.now() + 21600000)} />
            </div>
            <a href="#products" className="text-sm text-rose-700 hover:underline">مشاهده همه</a>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-10" id="products">
        <div className="flex items-end justify-between">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900">محصولات منتخب</h2>
          <a className="text-sm text-cyan-700 hover:underline" href="#">مشاهده همه</a>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <footer id="contact" className="border-t border-slate-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900">فروشگاه دیجیتال</h4>
              <p className="text-sm text-slate-500 mt-2">تجربه‌ی سریع، مطمئن و لذت‌بخش از خرید آنلاین.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">دسترسی سریع</h4>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li><a href="#products" className="hover:text-cyan-700">محصولات</a></li>
                <li><a href="#offers" className="hover:text-cyan-700">پیشنهادها</a></li>
                <li><a href="#contact" className="hover:text-cyan-700">تماس با ما</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">ارتباط با ما</h4>
              <p className="text-sm text-slate-600 mt-2">ایمیل: support@example.com</p>
              <p className="text-sm text-slate-600">تلفن: 021-00000000</p>
            </div>
          </div>
          <div className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} کلیه حقوق محفوظ است.</div>
        </div>
      </footer>
    </div>
  );
}
