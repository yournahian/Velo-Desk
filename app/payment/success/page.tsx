"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2, ExternalLink, Package, ArrowLeft } from "lucide-react";
import { getOrderById } from "@/lib/orders";
import { Order } from "@/lib/types";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    let resolvedIntentId = searchParams.get("intent_id");

    if (!orderId) {
      setError("Missing order information");
      setVerifying(false);
      return;
    }

    if (!resolvedIntentId) {
      const storedOrder = getOrderById(orderId);
      if (storedOrder?.intentId) {
        resolvedIntentId = storedOrder.intentId;
      }
    }

    const intentId = resolvedIntentId;
    const ordId = orderId;

    async function verify() {
      try {
        const url = `/api/payment/verify?order_id=${encodeURIComponent(ordId)}${intentId ? `&intent_id=${encodeURIComponent(intentId)}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Verification failed");
        }

        const data = await res.json();
        if (data.verified && data.status === "paid") {
          setVerified(true);
          setOrder(data.order || null);
        } else {
          setError(`Payment status: ${data.status || "unknown"}. Please contact support.`);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Verification failed";
        setError(message);
      } finally {
        setVerifying(false);
      }
    }

    const timer = setTimeout(verify, 1500);
    return () => clearTimeout(timer);
  }, [orderId, searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-velo animate-spin mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Verifying your payment...</h2>
          <p className="text-sm text-gray-500">Please wait while we confirm your transaction</p>
        </div>
      </div>
    );
  }

  if (error && !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md mx-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Payment Verification Issue</h2>
          <p className="text-sm text-gray-600">{error}</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-velo text-white font-bold rounded-lg hover:bg-velo-dark transition-colors cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-lg w-full space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Payment Successful!</h1>
          <p className="text-sm text-gray-500">Your order has been confirmed and is being processed.</p>
        </div>

        {order && (
          <div className="bg-gray-50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Package className="w-4 h-4" />
              <span>Order Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono font-bold text-gray-900">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Package</span>
                <span className="font-bold text-gray-900">{order.package.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-bold text-gray-900">${order.amountUsdc} USDC</span>
              </div>
              {order.txHash && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Transaction</span>
                  <a
                    href={`https://etherscan.io/tx/${order.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-velo font-semibold hover:underline"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              {order.buyerAddress && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Wallet</span>
                  <span className="font-mono text-xs text-gray-700">
                    {order.buyerAddress.slice(0, 6)}...{order.buyerAddress.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 bg-velo hover:bg-velo-dark text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-12 h-12 text-velo animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
