/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PackageDetail {
  title: string;
  description: string;
  deliveryTime: number;
  revisions: string | number;
  price: number;
  features: string[];
}

export interface Seller {
  name: string;
  avatar: string;
  isOnline: boolean;
  isPro: boolean;
  ratingValue: number;
  reviewCountValue: number;
  responseTextTime: string;
  memberSince: string;
  badgeType: "Top Rated" | "Vetted Pro" | "Level 2" | "Level 1" | "New Seller";
}

export interface Gig {
  id: string;
  title: string;
  seller: Seller;
  rating: number;
  reviewsCount: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  offersConsultation: boolean;
  isVideo?: boolean;
  description: string;
  packages: {
    basic: PackageDetail;
    standard: PackageDetail;
    premium: PackageDetail;
  };
}

export interface Message {
  id: string;
  sender: "user" | "seller";
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

export interface Bid {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  sellerBadge: string;
  price: number;
  proposal: string;
  deliveryDays: number;
  rating: number;
}

export interface ProjectBrief {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  deliveryDays: number;
  status: "Active" | "Completed" | "Pending Review";
  createdAt: string;
  bids: Bid[];
}

export interface UserProfileProgress {
  displayName: string;
  username: string;
  email: string;
  avatar: string;
  completedPercent: number;
  completedTasks: {
    bio: boolean;
    skills: boolean;
    links: boolean;
    phone: boolean;
    portfolio: boolean;
  };
}

export interface Milestone {
  name: string;
  done: boolean;
}

export interface Order {
  id: string;
  gigTitle: string;
  packageName: string;
  sellerName: string;
  sellerAvatar: string;
  price: number;
  deliveryDays: number;
  status: string;
  milestones: Milestone[];
  date: string;
  txHash?: string;
  buyerAddress?: string;
}

