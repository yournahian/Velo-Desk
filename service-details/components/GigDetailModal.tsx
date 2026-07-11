"use client";

import React, { useState } from "react";
import { 
  X, 
  Check, 
  Clock, 
  RefreshCw, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Video, 
  MessageCircle, 
  ShieldCheck, 
  Briefcase, 
  Cpu, 
  Heart,
  Globe,
  Award,
  Zap,
  Lock
} from "lucide-react";
import { Gig } from "@/lib/frontend-types";

interface GigDetailModalProps {
  gig: Gig;
  onClose: () => void;
  onContactSeller: (sellerName: string) => void;
  onOrderComplete: (gigTitle: string, packageName: string, price: number) => void;
  onInitiatePayment?: (gigTitle: string, price: number, serviceId: string, packageName: string) => void;
}

type PackageTab = "basic" | "standard" | "premium";

export default function GigDetailModal({ gig, onClose, onContactSeller, onOrderComplete, onInitiatePayment }: GigDetailModalProps) {
  const [activeTab, setActiveTab] = useState<PackageTab>("standard"); // Standard is recommended by default
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentPackage = gig.packages[activeTab];

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % gig.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + gig.images.length) % gig.images.length);
  };

  const handleOrderSubmit = () => {
    if (onInitiatePayment) {
      onInitiatePayment(gig.title, currentPackage.price, gig.id, currentPackage.title);
    } else {
      onOrderComplete(gig.title, currentPackage.title, currentPackage.price);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 font-sans select-none animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[92vh] overflow-y-auto flex flex-col relative border border-gray-100">
        
        {/* Superior Upgraded Header Toolbar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-6 py-4.5 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#ff5c00] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-[#ff5c00]" />
              SELECTED SERVICE
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="text-xs text-gray-500 font-semibold hidden sm:inline truncate max-w-[280px]">
              {gig.category || "AI Development Solution"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save to Favorites Button */}
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer mr-1"
              aria-label="Favorite service"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-all cursor-pointer border border-gray-100 hover:scale-105"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal content body */}
        <div className="p-5 sm:p-6 lg:p-8 overflow-y-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT COLUMN (Details, Showcase, About the developer) - Col Span 7 */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Premium Title section */}
              <div className="space-y-3.5">
                <h1 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight tracking-tight">
                  {gig.title}
                </h1>

                {/* Rating & Profile highlight */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm pt-1">
                  <div className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100/80 px-2.5 py-1.5 rounded-lg border border-gray-100 transition-colors">
                    <img
                      className="h-7 w-7 rounded-full object-cover border border-white shadow-sm"
                      src={gig.seller.avatar}
                      alt={gig.seller.name}
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{gig.seller.name}</span>
                  </div>

                  <div className="h-4 w-px bg-gray-200 hidden sm:inline" />

                  {/* Vetted Developer Tier status badge */}
                  <span className="text-[10px] sm:text-xs text-[#ff5c00] font-black tracking-wide uppercase bg-orange-50 px-2 py-1 rounded border border-orange-100 flex items-center gap-1 select-none">
                    <Award className="w-3.5 h-3.5 text-[#ff5c00]" />
                    {gig.seller.badgeType || "Top Rated Vetted"}
                  </span>

                  <div className="h-4 w-px bg-gray-200 hidden sm:inline" />

                  {/* Rating score counts */}
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-100 px-2.5 py-1 rounded-md text-xs sm:text-sm font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{gig.seller.ratingValue || "5.0"}</span>
                    <span className="text-gray-400 font-semibold text-xs">({gig.seller.reviewCountValue || "116"} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Upgraded Professional Showcase Visual Slider */}
              <div className="space-y-2">
                <div className="relative group rounded-2xl overflow-hidden bg-gray-950 aspect-[1.618] flex items-center justify-center border-4 border-white/90 shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                  <img
                    src={gig.images[activeImageIdx]}
                    alt={`Work showcase ${activeImageIdx}`}
                    className="w-full h-full object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* High contrast gradient overlays */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-transparent to-transparent h-20 pointer-events-none" />

                  {gig.images.length > 1 && (
                    <>
                      {/* Premium Round Navigation Arrows */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 p-2.5 bg-black/75 text-white rounded-full hover:bg-[#ff5c00] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg border border-white/10"
                        aria-label="Previous slide"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 p-2.5 bg-black/75 text-white rounded-full hover:bg-[#ff5c00] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg border border-white/10"
                        aria-label="Next slide"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Pill indicator count right under image */}
                      <div className="absolute top-4 right-4 bg-black/70 text-white font-mono text-[10px] px-2 py-1 rounded-md border border-white/10 font-bold">
                        {activeImageIdx + 1} / {gig.images.length}
                      </div>

                      {/* Interactive Bottom Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {gig.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIdx(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer shadow-sm ${
                              idx === activeImageIdx ? "w-6 bg-[#ff5c00]" : "w-2 bg-white/60 hover:bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-400 font-mono px-1">
                  <span>* Actual screens of past delivered works verified by Velo Desk</span>
                  <span>Press arrows to scroll assets</span>
                </div>
              </div>

              {/* Comprehensive Description / Details */}
              <div className="space-y-4 pt-1 bg-white border-b border-gray-100 pb-6">
                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#ff5c00] rounded-full inline-block" />
                  About This Service
                </h2>
                <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-line text-justify space-y-4">
                  {gig.description}
                </div>
              </div>

              {/* Verified Expertise list */}
              <div className="p-5.5 bg-orange-50/30 rounded-2xl border border-orange-100/50 space-y-4 text-left">
                <h3 className="text-sm font-black text-[#ff5c00] uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4.5 h-4.5 text-[#ff5c00]" /> Specially Approved Developer standards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>100% Secure Custom Logic</strong> built to withstand performance issues.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>Dedicated Sandbox Testing</strong> with complete demonstration video links with deliveries.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>Comprehensive Documentation</strong> ensuring future engineers can maintain standard modularity.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span><strong>Post-launch priority assistance</strong> with secure updates inside active workspaces.</span>
                  </div>
                </div>
              </div>

              {/* Upgraded Developer Profile Bio Box */}
              <div className="border border-gray-200/80 rounded-2xl p-6.5 bg-gradient-to-b from-gray-50 to-white space-y-5 shadow-sm">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <h3 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Briefcase className="w-4.5 h-4.5 text-gray-500" /> Meets the Creator
                  </h3>
                  <div className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider">
                    Vetted Partner Node
                  </div>
                </div>

                <div className="flex items-center gap-4.5">
                  <div className="relative">
                    <img
                      className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                      src={gig.seller.avatar}
                      alt={gig.seller.name}
                      referrerPolicy="no-referrer"
                    />
                    {gig.seller.isOnline && (
                      <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-[#ff5c00] ring-2 ring-white animate-pulse" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-lg text-gray-900 tracking-tight leading-none">
                        {gig.seller.name}
                      </span>
                      {gig.seller.isOnline && (
                        <span className="bg-orange-50 text-[#ff5c00] border border-orange-200 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider select-none">
                          Online
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#ff5c00] font-black tracking-wide uppercase flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> {gig.seller.badgeType || "Top Developer"} Partner
                    </p>
                  </div>
                </div>

                {/* Grid stats about the seller */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4.5 border-t border-b border-gray-100 py-5 text-xs">
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold uppercase tracking-wide text-[9px] font-mono">Developer Locality</p>
                    <p className="font-bold text-gray-800 text-sm flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-gray-400" /> International
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold uppercase tracking-wide text-[9px] font-mono">Member Since</p>
                    <p className="font-bold text-gray-800 text-sm">{gig.seller.memberSince || "Jan 2024"}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold uppercase tracking-wide text-[9px] font-mono">Response Time</p>
                    <p className="font-bold text-gray-800 text-sm whitespace-nowrap">{gig.seller.responseTextTime || "1 hour"}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-gray-400 font-bold uppercase tracking-wide text-[9px] font-mono">Project Deliveries</p>
                    <p className="font-bold text-[#ff5c00] text-sm">99%+ Success</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-1">
                  <button
                    onClick={() => onContactSeller(gig.seller.name)}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 hover:border-gray-400 text-gray-800 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-sm cursor-pointer group text-xs sm:text-sm active:scale-98"
                  >
                    <MessageCircle className="w-4.5 h-4.5 text-gray-500 group-hover:text-black transition-colors" />
                    <span>Send Message to {gig.seller.name}</span>
                  </button>

                  {gig.offersConsultation && (
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-gray-500 bg-orange-50/50 border border-orange-100 px-3 py-2 rounded-xl">
                      <Video className="w-4 h-4 text-[#ff5c00]" /> Offers Live Consultations
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (UPGRADED BENTO-STYLE PRICING PANEL) - Col Span 5 */}
            <div className="lg:col-span-5 text-left">
              <div className="sticky top-22 space-y-6">
                
                {/* Package Card Container */}
                <div className="border border-gray-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden bg-white">
                  
                  {/* Upgrade Packages Tabs header with bento badges */}
                  <div className="grid grid-cols-3 border-b border-gray-100 text-xs bg-gray-50/80 font-bold p-1">
                    {(["basic", "standard", "premium"] as PackageTab[]).map((tab) => {
                      const isSelected = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-3.5 capitalize transition-all duration-300 cursor-pointer rounded-2xl text-center font-black relative flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? "bg-white text-gray-900 shadow-md border border-gray-100 scale-103 z-10"
                              : "text-gray-400 hover:text-gray-700 hover:bg-white/40 border-transparent"
                          }`}
                        >
                          <span className="text-xs sm:text-[13px]">{tab}</span>
                          
                          {/* Bento Mini-Badges inside headers */}
                          {tab === "standard" && (
                            <span className={`text-[7px] tracking-wider uppercase font-extrabold px-1 py-0.5 rounded ${
                              isSelected ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"
                            }`}>
                              POPULAR
                            </span>
                          )}
                          {tab === "premium" && (
                            <span className={`text-[7px] tracking-wider uppercase font-extrabold px-1 py-0.5 rounded ${
                              isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
                            }`}>
                              BEST VALUE
                            </span>
                          )}
                          {tab === "basic" && (
                            <span className="text-[7px] tracking-wider text-gray-400 font-bold">
                              Starter
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Main active package detailed contents */}
                  <div className="p-6 sm:p-7 space-y-6 bg-white">
                    
                    {/* Package metadata block */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-[#ff5c00] tracking-widest bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                            {activeTab} Plan
                          </span>
                          <h4 className="text-base font-extrabold text-gray-900 tracking-tight leading-snug mt-1.5">
                            {currentPackage.title}
                          </h4>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-3xl font-black text-gray-900 font-mono">${currentPackage.price}</span>
                          <p className="text-[9.5px] text-gray-400 font-bold tracking-wide uppercase leading-none mt-0.5">Est. Budget</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-medium bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                        {currentPackage.description}
                      </p>
                    </div>

                    {/* Delivery and revisions badges side-by-side */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-3 rounded-xl shadow-sm text-xs text-gray-700 font-bold">
                        <Clock className="w-4.5 h-4.5 text-[#ff5c00] shrink-0" />
                        <div>
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider leading-none">EST. Delivery</p>
                          <p className="text-gray-800 font-black mt-0.5">{currentPackage.deliveryTime} Days</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-3 rounded-xl shadow-sm text-xs text-gray-700 font-bold">
                        <RefreshCw className="w-4.5 h-4.5 text-[#ff5c00] shrink-0" />
                        <div>
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider leading-none">Revisions</p>
                          <p className="text-gray-800 font-black mt-0.5">
                            {typeof currentPackage.revisions === "number"
                              ? `${currentPackage.revisions} Revisions`
                              : "Unlimited"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Features included header label */}
                    <div className="space-y-3 pt-2">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
                        What's Included in this package:
                      </p>
                      
                      {/* Highly styled checklist */}
                      <ul className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                        {currentPackage.features.map((feat, idx) => (
                          <li key={idx} className="flex gap-2.5 text-[12px] text-gray-700 font-semibold align-text-top leading-tight">
                            <div className="h-4.5 w-4.5 rounded-full bg-orange-50 text-[#ff5c00] flex items-center justify-center shrink-0 mt-0.2">
                              <Check className="w-3 h-3 stroke-[3px]" />
                            </div>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highly polished action button */}
                    <div className="space-y-3 pt-3">
                      <button
                        onClick={handleOrderSubmit}
                        className="w-full bg-[#ff5c00] hover:bg-[#e04f00] text-white font-black py-4.5 px-6 rounded-2xl text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-103 active:scale-97 cursor-pointer flex items-center justify-center gap-2 shadow-[0_12px_24px_rgba(255,92,0,0.25)] relative overflow-hidden group border border-white/10"
                      >
                        <Lock className="w-4 h-4 text-white/90" />
                        <span>Continue (${currentPackage.price})</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Secure Checkout powered by Velo Desk Safe®</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Additional Trust Indicators Package */}
                <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4.5 flex items-center gap-3.5 text-left text-xs font-medium text-gray-500 shadow-sm">
                  <ShieldCheck className="w-9 h-9 text-[#ff5c00] shrink-0" />
                  <div>
                    <strong className="text-gray-900 block font-bold mb-0.5">Velo Desk Service Protection Plan</strong>
                    <span>We hold onto the funds safely inside escrow. Freelancer only receives payment after you review and approve the finalized delivery.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
