"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Share2, Heart, Flag, ChevronRight, Star,
} from "lucide-react";
import { mockService } from "@/data/mock";
import ServiceGallery from "@/components/ServiceGallery";
import SellerProfile from "@/components/SellerProfile";
import PricingCards from "@/components/PricingCards";
import ServiceDescription from "@/components/ServiceDescription";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import StickyPurchasePanel from "@/components/StickyPurchasePanel";
import { ServicePackage } from "@/lib/types";

export default function ServiceDetailPage() {
  const params = useParams();
  const service = mockService;
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage["name"]>("Standard");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Service not found</p>
      </div>
    );
  }

  const renderStars = (rating: number, count?: number) => (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-gray-900">{rating}</span>
      {count !== undefined && (
        <span className="text-sm text-gray-500">({count})</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-black text-xl tracking-tighter text-gray-900">
              Velo Desk<span className="text-velo">.</span>
            </span>
            <span className="text-gray-300 hidden sm:inline">/</span>
            <nav className="hidden sm:flex items-center gap-1.5 text-gray-500">
              <span>{service.category}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-900 font-semibold">{service.subcategory}</span>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer hidden sm:block">
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 pb-24 lg:pb-0">
            {/* Title & rating */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight tracking-tight">
                {service.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                {renderStars(service.rating, service.reviewCount)}
                <span className="text-gray-300">|</span>
                <span className="text-gray-600 font-medium">{service.totalOrders} orders in queue</span>
              </div>
            </div>

            {/* Gallery */}
            <ServiceGallery images={service.images} title={service.title} />

            {/* Mobile package selector and pricing preview */}
            <div className="lg:hidden">
              <PricingCards
                packages={service.packages}
                selected={selectedPackage}
                onSelect={setSelectedPackage}
              />
            </div>

            {/* Description */}
            <ServiceDescription description={service.longDescription} tags={service.tags} />

            {/* Seller profile */}
            <SellerProfile seller={service.seller} />

            {/* Reviews */}
            <ReviewsSection
              reviews={service.reviews}
              rating={service.rating}
              reviewCount={service.reviewCount}
            />

            {/* FAQ */}
            <FAQSection faqs={service.faqs} />
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <StickyPurchasePanel
              serviceId={service.id}
              serviceTitle={service.title}
              packages={service.packages}
              selected={selectedPackage}
              onSelect={setSelectedPackage}
            />
          </div>
        </div>
      </div>

      {/* Mobile sticky purchase bar */}
      <div className="lg:hidden">
        <StickyPurchasePanel
          serviceId={service.id}
          serviceTitle={service.title}
          packages={service.packages}
          selected={selectedPackage}
          onSelect={setSelectedPackage}
        />
      </div>
    </div>
  );
}
