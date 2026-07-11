export interface ServicePackage {
  name: "Basic" | "Standard" | "Premium";
  price: number;
  originalPrice?: number;
  description: string;
  deliveryDays: number;
  revisions: number;
  features: string[];
  isPopular?: boolean;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  reviewCount: number;
  totalSales: number;
  memberSince: string;
  description: string;
  skills: string[];
  languages: { language: string; level: string }[];
  responseTime: string;
  responseRate: number;
  lastDelivery: string;
  isPro?: boolean;
  isVerified?: boolean;
}

export interface Review {
  id: string;
  user: { name: string; avatar: string; country?: string };
  rating: number;
  title: string;
  text: string;
  package: string;
  date: string;
  helpful: number;
  sellerResponse?: string;
}

export interface ServiceImage {
  id: string;
  src: string;
  alt: string;
  type: "image" | "video";
}

export interface Service {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  longDescription: string;
  images: ServiceImage[];
  packages: ServicePackage[];
  seller: Seller;
  reviews: Review[];
  rating: number;
  reviewCount: number;
  totalOrders: number;
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  package: ServicePackage;
  sellerId: string;
  sellerName: string;
  buyerAddress: string;
  amountUsdc: number;
  status: "pending" | "paid" | "completed" | "cancelled";
  txHash?: string;
  intentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentIntent {
  id: string;
  amount_usdc: number;
  description: string;
  order_id: string;
  status: string;
  redirect_url: string;
  cancel_url: string;
  checkout_url: string;
  tx_hash?: string;
  buyer_address?: string;
  created_at: string;
}

export interface CreateIntentResponse {
  id: string;
  checkout_url: string;
  status: string;
  amount_usdc: number;
  order_id: string;
}

export interface VerifyIntentResponse {
  id: string;
  amount_usdc: number;
  description: string;
  order_id: string;
  status: string;
  tx_hash?: string;
  buyer_address?: string;
  created_at: string;
}
