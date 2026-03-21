import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
      <div className="text-center">
        <h1 className="text-6xl font-black text-[hsl(25,100%,55%)] mb-4">404</h1>
        <p className="text-white text-xl mb-6">الصفحة غير موجودة</p>
        <Link href="/">
          <span className="bg-[hsl(25,100%,55%)] hover:bg-[hsl(25,100%,48%)] text-white px-6 py-3 rounded-full font-bold cursor-pointer transition-all">
            العودة للرئيسية
          </span>
        </Link>
      </div>
    </div>
  );
}
