"use client";

import { Check, Star } from "lucide-react";
import { ServicePackage } from "@/lib/types";

interface Props {
  packages: ServicePackage[];
  selected: ServicePackage["name"];
  onSelect: (name: ServicePackage["name"]) => void;
}

export default function PricingCards({ packages, selected, onSelect }: Props) {
  const current = packages.find((p) => p.name === selected);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {packages.map((pkg) => {
          const isSelected = pkg.name === selected;
          return (
            <button
              key={pkg.name}
              onClick={() => onSelect(pkg.name)}
              className={`relative text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-velo bg-velo-light shadow-md"
                  : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-velo text-white text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap shadow-sm">
                  <Star className="w-3 h-3 fill-white" /> MOST POPULAR
                </div>
              )}
              <div className={pkg.isPopular ? "pt-1" : ""}>
                <h4 className={`font-extrabold text-sm ${isSelected ? "text-velo" : "text-gray-900"}`}>
                  {pkg.name}
                </h4>
                <div className="mt-2">
                  {pkg.originalPrice && (
                    <span className="text-sm text-gray-400 line-through mr-1">${pkg.originalPrice}</span>
                  )}
                  <span className={`text-2xl font-black ${isSelected ? "text-velo" : "text-gray-900"}`}>
                    ${pkg.price}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{pkg.description}</p>
                <p className="text-xs font-semibold text-gray-600 mt-2">
                  {pkg.deliveryDays} day{pkg.deliveryDays > 1 ? "s" : ""} delivery • {pkg.revisions} revision{pkg.revisions > 1 ? "s" : ""}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {current && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
          <h4 className="font-bold text-gray-900">
            What&apos;s included in <span className="text-velo">{current.name}</span>
          </h4>
          <ul className="space-y-2">
            {current.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
