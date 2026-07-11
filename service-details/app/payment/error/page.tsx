"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">Payment Error</h1>
          <p className="text-sm text-gray-500">
            Something went wrong while processing your payment. Please try again or contact support.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-velo hover:bg-velo-dark text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Services
          </button>
        </div>
      </div>
    </div>
  );
}
