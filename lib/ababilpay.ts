import "server-only";
import { CreateIntentResponse, VerifyIntentResponse } from "./types";
import { logToFile } from "./logger";

const API_BASE = "https://testnetv1.ababilpay.xyz/api/v1/x402";

async function getApiKey(): Promise<string> {
  let key = process.env.ABABIL_PAY_API_KEY || process.env.ABABILPAY_SECRET_KEY;
  if (!key || key === "YOUR_SECRET_KEY_HERE") {
    throw new Error("ABABIL_PAY_API_KEY is not configured in environment variables");
  }
  key = key.trim().replace(/^["']|["']$/g, "");
  return key;
}

interface AbabilCreateResponse {
  success: boolean;
  data: {
    intent_id: string;
    status: string;
    amount_usdc: number;
    checkout_url: string;
    expires_at: string;
  };
}

interface AbabilVerifyResponse {
  success: boolean;
  data: {
    intent?: {
      id: string;
      status: string;
      amount_usdc: number;
      tx_hash?: string;
      buyer_address?: string;
      chain?: string;
      paid_at?: string;
    };
    intent_id?: string;
    status?: string;
    amount_usdc?: number;
    tx_hash?: string;
    buyer_address?: string;
    chain?: string;
    paid_at?: string;
  };
}

export async function createPaymentIntent(params: {
  amount_usdc: number;
  description: string;
  order_id: string;
  redirect_url: string;
  cancel_url: string;
}): Promise<CreateIntentResponse> {
  const apiKey = await getApiKey();

  const response = await fetch(`${API_BASE}/intents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    let errorBody = "";
    try {
      errorBody = await response.text();
    } catch {
      errorBody = "(unable to read response)";
    }
    throw new Error(
      `AbabilPay create intent failed [${response.status}]: ${errorBody}`
    );
  }

  const raw: AbabilCreateResponse = await response.json();
  console.log("Raw AbabilPay API response:", JSON.stringify(raw));
  logToFile("Raw AbabilPay API response", raw);
  if (!raw.success || !raw.data) {
    throw new Error(`AbabilPay create intent failed: API returned success=false`);
  }

  return {
    id: raw.data.intent_id,
    checkout_url: raw.data.checkout_url || `https://testnetv1.ababilpay.xyz/pay/${raw.data.intent_id}`,
    status: raw.data.status,
    amount_usdc: raw.data.amount_usdc,
    order_id: params.order_id,
  };
}

export async function verifyPaymentIntent(
  intentId: string
): Promise<VerifyIntentResponse> {
  const apiKey = await getApiKey();

  const response = await fetch(`${API_BASE}/intents/${intentId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    let errorBody = "";
    try {
      errorBody = await response.text();
    } catch {
      errorBody = "(unable to read response)";
    }
    throw new Error(
      `AbabilPay verify intent failed [${response.status}]: ${errorBody}`
    );
  }

  const raw: AbabilVerifyResponse = await response.json();
  console.log("Raw AbabilPay verify response:", JSON.stringify(raw));
  logToFile("Raw AbabilPay verify response", raw);
  if (!raw.success || !raw.data) {
    throw new Error(`AbabilPay verify intent failed: API returned success=false`);
  }

  if (raw.data.intent) {
    return {
      id: raw.data.intent.id || "",
      amount_usdc: raw.data.intent.amount_usdc || 0,
      description: "",
      order_id: "",
      status: raw.data.intent.status || "",
      tx_hash: raw.data.intent.tx_hash,
      buyer_address: raw.data.intent.buyer_address,
      created_at: raw.data.intent.paid_at || "",
    };
  }

  return {
    id: raw.data.intent_id || "",
    amount_usdc: raw.data.amount_usdc || 0,
    description: "",
    order_id: "",
    status: raw.data.status || "",
    tx_hash: raw.data.tx_hash,
    buyer_address: raw.data.buyer_address,
    created_at: raw.data.paid_at || "",
  };
}

