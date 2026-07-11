"use client";

import React from "react";
import { Heart, Star, Video, VideoOff, Check } from "lucide-react";
import { Gig } from "@/lib/frontend-types";

interface GigCardProps {
  gig: Gig;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
  key?: string;
}

export default function GigCard({ gig, isFavorite, onToggleFavorite, onClick }: GigCardProps) {
  return (
    <div
      id={`gig-card-${gig.id}`}
      onClick={onClick}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer select-none font-sans"
    >
      {/* Thumbnail Area with overlay elements */}
      <div className="relative w-full aspect-[1.618] bg-gray-100 overflow-hidden">
        <img
          src={gig.thumbnail}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Favorite Heart Trigger */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-2.5 right-2.5 p-1.5 bg-white/95 hover:bg-white rounded-full text-gray-500 shadow-md hover:text-red-500 transition-all cursor-pointer z-10 hover:scale-110 active:scale-95"
          aria-label="Toggle Favorite"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500 animate-bounce-once" : "text-gray-400"
            }`}
          />
        </button>

        {/* Play icon overlay for Video portfolios */}
        {gig.isVideo && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all group-hover:bg-black/25">
            <div className="p-3 bg-white/90 rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-gray-800 fill-gray-800" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" strokeLinejoin="miter" strokeLinecap="square"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Seller Metadata Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={gig.seller.avatar}
                  alt={gig.seller.name}
                  className="w-6 h-6 rounded-full object-cover border border-gray-100"
                  referrerPolicy="no-referrer"
                />
                {gig.seller.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 block h-2 w-2 rounded-full bg-[#ff5c00] ring-1 ring-white" />
                )}
              </div>
              <span className="text-xs font-bold text-gray-800 truncate">{gig.seller.name}</span>
            </div>

            {/* Seller Badge style */}
            {gig.seller.badgeType === "Vetted Pro" ? (
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 flex items-center gap-0.5 border border-indigo-100 uppercase tracking-wider scale-[0.9]">
                <Check className="w-2.5 h-2.5 stroke-[3px]" /> Pro
              </span>
            ) : gig.seller.badgeType === "Top Rated" ? (
              <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 flex items-center gap-0.5 border border-orange-100 uppercase tracking-wider scale-[0.9]">
                Top Rated
              </span>
            ) : (
              <span className="text-gray-400 text-[10px] uppercase font-semibold">
                {gig.seller.badgeType}
              </span>
            )}
          </div>

          {/* Title */}
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 leading-relaxed font-normal group-hover:text-gray-900 transition-colors h-10">
            {gig.title}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-[#ffbe5b] fill-[#ffbe5b]" />
            <span className="font-bold text-gray-800">{gig.rating.toFixed(1)}</span>
            <span className="text-gray-400">({gig.reviewsCount})</span>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-gray-100 my-2.5 pt-2.5 flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider leading-none">Starting AT</span>
            <span className="text-sm font-bold text-gray-900 leading-none mt-1">From ${gig.price}</span>
          </div>

          {/* Video Consultations Info badge */}
          {gig.offersConsultation && (
            <div className="flex items-center gap-1 bg-orange-50 text-[#ff5c00] px-2 py-1 rounded-md border border-orange-100 text-[10px] font-semibold">
              <Video className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">Consultations</span>
              <span className="sm:hidden">Video</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
