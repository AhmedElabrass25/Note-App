// pages/404.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-black/80">404 - Page Not Found</h1>
      <p className="text-black/80 mt-2">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-[#4070f4] text-white rounded-sm"
      >
        Go Home
      </Link>
    </div>
  );
}
