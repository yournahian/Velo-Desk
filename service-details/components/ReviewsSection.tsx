"use client";

import { useState } from "react";
import { Star, ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";
import { Review } from "@/lib/types";

interface Props {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ reviews, rating, reviewCount }: Props) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  const avgRating = rating;

  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    const star = Math.round(r.rating);
    if (star >= 1 && star <= 5) distribution[star - 1]++;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>

      <div className="flex flex-col sm:flex-row gap-8 pb-6 border-b border-gray-100">
        <div className="text-center shrink-0">
          <div className="text-5xl font-black text-gray-900">{avgRating}</div>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(avgRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">{reviewCount} reviews</p>
        </div>

        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star - 1];
            const pct = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 font-medium w-3">{star}</span>
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-gray-400 w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {displayed.map((review) => (
          <div key={review.id} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{review.user.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{review.user.country || "Global"}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {review.package}
              </span>
            </div>

            <div className="flex items-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>

            <h5 className="font-bold text-sm text-gray-900 mt-1.5">{review.title}</h5>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{review.text}</p>

            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700 transition-colors cursor-pointer">
                <ThumbsUp className="w-3.5 h-3.5" />
                Helpful ({review.helpful})
              </button>
            </div>

            {review.sellerResponse && (
              <div className="mt-3 ml-6 pl-4 border-l-2 border-velo/30 bg-gray-50 rounded-r-lg p-3">
                <p className="text-xs font-bold text-gray-700 mb-1">
                  {review.user.name.split(" ")[0]}'s Seller response
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">{review.sellerResponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-velo hover:text-velo-dark py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
        >
          {showAll ? (
            <>Show less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Show all {reviews.length} reviews <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      )}
    </div>
  );
}
