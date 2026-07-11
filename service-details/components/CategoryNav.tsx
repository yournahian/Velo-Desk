"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES_LIST } from "@/lib/data";

interface CategoryNavProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory
}: CategoryNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (el) {
      setShowLeftArrow(el.scrollLeft > 10);
      setShowRightArrow(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 10
      );
    }
  };

  const scrollLeft = () => {
    const el = containerRef.current;
    if (el) {
      el.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollRight = () => {
    const el = containerRef.current;
    if (el) {
      el.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div id="fiverr-category-nav-wrapper" className="bg-white border-b border-gray-200 select-none relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center">
        
        {/* Left Scroll Button */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-1 z-10 p-1 bg-white border border-gray-200 rounded-full shadow-md text-gray-600 hover:text-black cursor-pointer bg-opacity-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-none py-3 px-2 w-full text-sm font-medium text-gray-500 whitespace-nowrap scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {/* "All" reset category */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`cursor-pointer transition-all relative py-1.5 border-b-2 hover:text-[#ff5c00] text-xs sm:text-sm font-medium ${
              selectedCategory === null
                ? "border-[#ff5c00] text-[#ff5c00] font-bold"
                : "border-transparent text-[#74767e]"
            }`}
          >
            All Gigs
          </button>

          {CATEGORIES_LIST.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`cursor-pointer transition-all relative py-1.5 border-b-2 hover:text-[#ff5c00] text-xs sm:text-sm font-medium ${
                selectedCategory === category
                  ? "border-[#ff5c00] text-[#ff5c00] font-bold"
                  : "border-transparent text-[#74767e]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-1 z-10 p-1 bg-white border border-gray-200 rounded-full shadow-md text-gray-600 hover:text-black cursor-pointer bg-opacity-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
}
