import { Order } from "./types";

const ORDERS_KEY = "velo_orders";

// Server-side in-memory store fallback
const globalForOrders = global as unknown as {
  serverOrders?: Order[];
};

if (!globalForOrders.serverOrders) {
  globalForOrders.serverOrders = [];
}

function loadOrders(): Order[] {
  if (typeof window === "undefined") {
    return globalForOrders.serverOrders || [];
  }
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]): void {
  if (typeof window === "undefined") {
    globalForOrders.serverOrders = orders;
    return;
  }
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {}
}

export function getOrders(): Order[] {
  return loadOrders();
}

export function getOrderById(id: string): Order | undefined {
  return loadOrders().find((o) => o.id === id);
}

export function getOrdersByBuyer(address: string): Order[] {
  return loadOrders().filter(
    (o) => o.buyerAddress.toLowerCase() === address.toLowerCase()
  );
}

export function createOrder(order: Omit<Order, "createdAt" | "updatedAt">): Order {
  const orders = loadOrders();
  const now = new Date().toISOString();
  const newOrder: Order = {
    ...order,
    createdAt: now,
    updatedAt: now,
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(
  id: string,
  status: Order["status"],
  updates?: Partial<Pick<Order, "txHash" | "buyerAddress">>
): Order | undefined {
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  orders[idx] = {
    ...orders[idx],
    ...updates,
    status,
    updatedAt: new Date().toISOString(),
  };
  saveOrders(orders);
  return orders[idx];
}

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}
