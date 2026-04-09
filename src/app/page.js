"use client"; 
import React, { useState, useEffect } from 'react';

const images = {
  pump: 'https://m.media-amazon.com/images/I/61M2I-yo-cS._AC_UF894,1000_QL80_FMwebp_.jpg',
  suspension: 'https://d36dbl6v34yjc1.cloudfront.net/eyJidWNrZXQiOiJwcm9kdWN0LWltYWdlcy1zaGFyZWQtMjAyMjA5MTUxMjM4MzI1Njk4MDAwMDAwMDEiLCJrZXkiOiJzdHJ1XC8xNzE2OTFsMTcxNjkxci1wMDQtMTE5OXgxNDYxLXlscG1kdXFkeXRoM3Nnbm54NW5iaHN3cXBqcS5qcGciLCJlZGl0cyI6eyJ3ZWJwIjp0cnVlLCJqcGVnIjp0cnVlLCJyZXNpemUiOnsid2lkdGgiOjg4MCwiaGVpZ2h0Ijo4ODAsImZpdCI6Imluc2lkZSJ9fX0=',
  brakes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcFhD9pT7Lab7rtieUWTGgkDuUeXvfw123c5S3MtXqphlrQnN5LKGfrefK&s=10',
};

export default function HomePage() {
  const [lang, setLang] = useState('en'); 
  const [view, setView] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timer, setTimer] = useState(59);

  const translations = {
    en: {
      langBtn: "العربية",
      loginBtn: "Login",
      searchPlaceholder: "Search for parts (e.g. Brake Pads)...",
      catTitle: "Top Categories",
      hotDeals: "Hot Deals / Products",
      buyNow: "Buy Now",
      back: "← Back",
      viewDetails: "View Details",
      currency: "EGP",
      loginHeader: "Welcome Back",
      phonePlaceholder: "Phone Number",
      sendCode: "Send Verification Code",
      otpTitle: "Verify OTP",
      otpMsg: "Enter the 4-digit code sent to your device",
      resend: "Resend in",
      confirm: "Confirm & Login",
      footer: "© 2026 AutoPartsStore - All Rights Reserved",
      pumps: "Pumps",
      brakes: "Brake Pads",
      suspension: "Suspension"
    },
    ar: {
      langBtn: "English",
      loginBtn: "دخول",
      searchPlaceholder: "ابحث عن قطع الغيار (مثل تيل فرامل)...",
      catTitle: "الأقسام الرئيسية",
      hotDeals: "أحدث العروض والمنتجات",
      buyNow: "اشتري الآن",
      back: "→ رجوع",
      viewDetails: "التفاصيل",
      currency: "جنية مصري",
      loginHeader: "مرحباً بك مجدداً",
      phonePlaceholder: "رقم الهاتف",
      sendCode: "إرسال كود التحقق",
      otpTitle: "تأكيد الكود",
      otpMsg: "أدخل الكود المكون من 4 أرقام المرسل لجهازك",
      resend: "إعادة إرسال خلال",
      confirm: "تأكيد وتسجيل الدخول",
      footer: "© ٢٠٢٦ متجر قطع الغيار - جميع الحقوق محفوظة",
      pumps: "طلمبات",
      brakes: "تيل فرامل",
      suspension: "عفشة ومساعدين"
    }
  };

  const t = translations[lang];

  const products = [
    { id: 1, name: lang === 'en' ? 'Ceramic Brake Pads' : 'تيل فرامل سيراميك', price: `1,250 ${t.currency}`, category: t.brakes, image: images.brakes },
    { id: 2, name: lang === 'en' ? 'High-Flow Water Pump' : 'طلمبة مياه أصلية', price: `1,950 ${t.currency}`, category: t.pumps, image: images.pump },
    { id: 3, name: lang === 'en' ? 'Front Shock Absorber' : 'مساعدين أمامية', price: `2,800 ${t.currency}`, category: t.suspension, image: images.suspension },
  ];

  useEffect(() => {
    let interval;
    if (view === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view, timer]);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-white p-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <button onClick={() => setView('home')} className="mb-6 font-bold text-blue-900">{t.back}</button>
        <div className="max-w-md mx-auto border border-slate-100 p-8 rounded-3xl shadow-xl mt-10">
          <h2 className="text-3xl font-black mb-8 text-blue-900">{t.loginHeader}</h2>
          <input type="tel" placeholder={t.phonePlaceholder} className="w-full p-4 bg-slate-50 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-900 border border-slate-100" />
          <button onClick={() => setView('otp')} className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold shadow-lg">
            {t.sendCode}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'otp') {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <h2 className="text-3xl font-black text-blue-900 mb-4">{t.otpTitle}</h2>
        <p className="text-slate-500 mb-8">{t.otpMsg}</p>
        <input type="number" placeholder="0000" className="w-40 text-center text-3xl font-bold p-4 rounded-2xl border-2 border-blue-900 outline-none mb-6" />
        <div className="text-sm text-slate-400 mb-8">{t.resend} <span className="text-orange-500 font-bold">0:{timer < 10 ? `0${timer}` : timer}</span></div>
        <button onClick={() => setView('home')} className="w-full max-w-xs bg-blue-900 text-white py-4 rounded-xl font-bold">{t.confirm}</button>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-white p-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <button onClick={() => setSelectedProduct(null)} className="mb-6 font-bold text-blue-900 bg-slate-100 px-4 py-2 rounded-xl">{t.back}</button>
        <div className="max-w-2xl mx-auto">
          <img src={selectedProduct.image} className="w-full h-64 object-cover rounded-3xl shadow-lg mb-6" />
          <h2 className="text-4xl font-black mb-4">{selectedProduct.name}</h2>
          <p className="text-3xl font-bold text-blue-900 mb-10">{selectedProduct.price}</p>
          <button className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold text-xl shadow-lg">{t.buyNow}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="bg-blue-900 text-white p-5 sticky top-0 z-50 flex justify-between items-center shadow-md">
        {/* الاسم هنا أصبح ثابتاً بالإنجليزي دائماً */}
        <h1 className="text-xl font-black italic text-orange-400 tracking-tight" dir="ltr">
          AutoPartsStore
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="bg-blue-800 px-3 py-1 rounded-lg text-[10px] font-bold border border-blue-700 uppercase">
            {t.langBtn}
          </button>
          <button onClick={() => setView('login')} className="bg-orange-500 px-4 py-1 rounded-lg text-xs font-bold uppercase">
            {t.loginBtn}
          </button>
        </div>
      </nav>

      <header className="bg-blue-900 py-12 px-6 text-center text-white border-t border-blue-800">
        <input type="text" placeholder={t.searchPlaceholder} className="w-full max-w-md p-4 rounded-2xl text-slate-900 outline-none shadow-2xl" />
      </header>

      <main className="container mx-auto py-10 px-4">
        <h3 className="text-xl font-bold mb-8 border-l-4 border-orange-500 pl-3 pr-3 text-slate-800">{t.hotDeals}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} onClick={() => setSelectedProduct(p)} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 cursor-pointer active:scale-95 transition-all">
              <img src={p.image} className="w-full h-40 object-cover rounded-2xl mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">{p.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-black">{p.price}</span>
                <span className="text-xs font-bold text-orange-500">{t.viewDetails}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-500 py-8 text-center mt-20 text-xs">
        {t.footer}
      </footer>
    </div>
  );
}