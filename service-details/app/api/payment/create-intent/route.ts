import { NextRequest, NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/ababilpay";
import { createOrder, generateOrderId } from "@/lib/orders";

function corsResponse(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { serviceId, packageName, amountUsdc } = await req.json();

    if (!serviceId || !packageName || !amountUsdc) {
      return corsResponse(
        { error: "Missing required fields: serviceId, packageName, amountUsdc" },
        400
      );
    }

    if (typeof amountUsdc !== "number" || amountUsdc <= 0) {
      return corsResponse(
        { error: "amountUsdc must be a positive number" },
        400
      );
    }

    const orderId = generateOrderId();
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      `http://localhost:${process.env.PORT || 3001}`;

    const intent = await createPaymentIntent({
      amount_usdc: amountUsdc,
      description: `Service: ${serviceId} - ${packageName}`,
      order_id: orderId,
      redirect_url: `${baseUrl}/payment/success?order_id=${orderId}`,
      cancel_url: `${baseUrl}/payment/cancel?order_id=${orderId}`,
    });

    console.log("AbabilPay intent created:", { intentId: intent.id, orderId });

    createOrder({
      id: orderId,
      serviceId,
      serviceTitle: serviceId,
      package: { name: packageName, price: amountUsdc } as any,
      sellerId: "seller-1",
      sellerName: "Alex Morgan",
      buyerAddress: "",
      amountUsdc,
      status: "pending",
      intentId: intent.id,
    });

    const responsePayload = {
      id: intent.id,
      checkout_url: intent.checkout_url,
      status: intent.status,
      order_id: orderId,
    };
    console.log("Returning create-intent response payload:", responsePayload);

    return corsResponse(responsePayload);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("Payment intent creation failed:", err);
    return corsResponse({ error: message }, 500);
  }
}
