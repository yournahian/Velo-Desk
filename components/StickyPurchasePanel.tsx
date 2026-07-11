"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Clock, RotateCcw, CreditCard, Loader2, Check } from "lucide-react";
import { ServicePackage } from "@/lib/types";

interface Props {
  serviceId: string;
  serviceTitle: string;
  packages: ServicePackage[];
  selected: ServicePackage["name"];
  onSelect: (name: ServicePackage["name"]) => void;
}

export default function StickyPurchasePanel({ serviceId, serviceTitle, packages, selected, onSelect }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const current = packages.find((p) => p.name === selected) || packages[0];
  const discount = current.originalPrice
    ? Math.round((1 - current.price / current.originalPrice) * 100)
    : 0;

  const handlePurchase = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          packageName: current.name,
          amountUsdc: 1,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Payment initiation failed");
      }

      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-gray-900">${current.price}</span>
              {current.originalPrice && (
                <span className="text-sm text-gray-400 line-through">${current.originalPrice}</span>
              )}
            </div>
            <p className="text-xs text-gray-500">{current.name} • {current.deliveryDays} day delivery</p>
          </div>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="bg-velo hover:bg-velo-dark text-white font-bold text-sm px-6 py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-velo/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1 text-center">{error}</p>}
      </div>

      {/* Desktop sidebar panel */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-5">
          <h3 className="font-bold text-gray-900">Select Package</h3>

          <div className="space-y-2">
            {packages.map((pkg) => (
              <button
                key={pkg.name}
                onClick={() => onSelect(pkg.name)}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${pkg.name === selected
                    ? "border-velo bg-velo-light"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${pkg.name === selected ? "border-velo" : "border-gray-300"
                        }`}
                    >
                      {pkg.name === selected && <div className="w-2 h-2 rounded-full bg-velo" />}
                    </div>
                    <span className={`font-bold text-sm ${pkg.name === selected ? "text-velo" : "text-gray-900"}`}>
                      {pkg.name}
                    </span>
                  </div>
                  <span className="font-black text-sm text-gray-900">${pkg.price}</span>
                </div>
                {pkg.name === selected && (
                  <div className="mt-2 space-y-1.5 pl-6">
                    {pkg.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Check className="w-3 h-3 text-green-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                    {pkg.features.length > 4 && (
                      <p className="text-xs text-gray-400 pl-5">+{pkg.features.length - 4} more</p>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-gray-900">${current.price}</span>
            </div>
            {current.originalPrice && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-bold text-green-600">-${current.originalPrice - current.price}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-black text-gray-900">${current.price}</span>
            </div>
            {discount > 0 && (
              <p className="text-xs text-green-600 font-semibold">Save {discount}% with this package</p>
            )}
          </div>

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-velo hover:bg-velo-dark text-white font-bold text-sm py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-velo/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? "Processing..." : "Continue"}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Secure payment via AbabilPay</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span>{current.revisions} free revisions included</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{current.deliveryDays} day delivery</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
