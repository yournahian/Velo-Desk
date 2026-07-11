import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentIntent } from "@/lib/ababilpay";
import { getOrderById, updateOrderStatus } from "@/lib/orders";
import { logToFile } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let intentId = searchParams.get("intent_id");
    const orderId = searchParams.get("order_id");

    logToFile("Verify route GET called", { orderId, intentId });

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing required param: order_id" },
        { status: 400 }
      );
    }

    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!intentId) {
      intentId = order.intentId;
    }

    if (!intentId) {
      return NextResponse.json(
        { error: "Missing intent_id and no intent associated with this order" },
        { status: 400 }
      );
    }

    if (order.status === "paid" || order.status === "completed") {
      return NextResponse.json({
        verified: true,
        status: order.status,
        order: { ...order, serviceTitle: undefined },
      });
    }

    const intent = await verifyPaymentIntent(intentId);

    if (intent.status === "paid") {
      const updated = updateOrderStatus(orderId, "paid", {
        txHash: intent.tx_hash,
        buyerAddress: intent.buyer_address,
      });
      const result = {
        verified: true,
        status: "paid",
        tx_hash: intent.tx_hash,
        buyer_address: intent.buyer_address,
        order: updated,
      };
      console.log("Verify route returning paid:", result);
      logToFile("Verify route returning paid", result);
      return NextResponse.json(result);
    }

    const result = {
      verified: false,
      status: intent.status,
    };
    console.log("Verify route returning not-paid:", result);
    logToFile("Verify route returning not-paid", result);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed";
    console.error("Payment verification failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
