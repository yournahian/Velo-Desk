import { MapPin, CheckCircle, Medal, Clock, MessageCircle, Shield } from "lucide-react";
import { Seller } from "@/lib/types";

interface Props {
  seller: Seller;
}

export default function SellerProfile({ seller }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
          />
          {seller.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 ring-2 ring-white">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-gray-900">{seller.name}</h3>
            {seller.isPro && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                <Medal className="w-3 h-3" /> PRO
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-0.5">{seller.title}</p>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-bold text-gray-900">{seller.rating}</span>
              <span className="text-gray-400">({seller.reviewCount})</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 font-medium">{seller.totalSales} orders</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{seller.description}</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{seller.languages[0]?.language || "Global"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{seller.responseTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle className="w-4 h-4 text-gray-400" />
          <span>{seller.responseRate}% response rate</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Shield className="w-4 h-4 text-gray-400" />
          <span>{seller.lastDelivery} last delivery</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {seller.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Languages</h4>
        <div className="space-y-1.5">
          {seller.languages.map((lang) => (
            <div key={lang.language} className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-medium">{lang.language}</span>
              <span className="text-gray-500">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
