"use client";

import React, { useState } from "react";
import { X, Send, Calculator, Clock, HelpCircle, Briefcase } from "lucide-react";
import { CATEGORIES_LIST } from "@/lib/data";

interface ProjectBriefModalProps {
  onClose: () => void;
  onSubmit: (title: string, category: string, desc: string, budget: number, deliveryDays: number) => void;
}

export default function ProjectBriefModal({ onClose, onSubmit }: ProjectBriefModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming & Tech");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(150);
  const [deliveryDays, setDeliveryDays] = useState(5);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMsg("Please enter a brief title summarizing your need.");
      return;
    }
    if (title.length < 10) {
      setErrorMsg("Please write a slightly more descriptive title (min 10 characters).");
      return;
    }
    if (!description.trim() || description.length < 25) {
      setErrorMsg("Please write details about your requirements (min 25 characters) so freelancers can propose accurate bids.");
      return;
    }
    if (budget <= 5) {
      setErrorMsg("Min budget is $5 on Fiverr.");
      return;
    }

    onSubmit(title, category, description, budget, deliveryDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-3 sm:p-4 font-sans select-none">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative animate-scale-in">
        
        {/* Header bar */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-50 text-[#ff5c00] rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Dashboard Feature</span>
              <h2 className="text-lg font-black text-gray-900 leading-none mt-0.5">Post a Project Brief</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-500 text-xs font-bold font-mono">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              1. Brief Title
            </label>
            <input
              type="text"
              placeholder="e.g. Build an online gym training Shopify website"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrorMsg("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all placeholder:text-gray-400"
            />
            <span className="text-[10px] text-gray-400">Keep it clear, describing your service need.</span>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              2. Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all"
            >
              {CATEGORIES_LIST.filter(c => !c.includes("🔥")).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description requirements */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              3. Describe detailed requirements
            </label>
            <textarea
              placeholder="Provide clear specifications. (e.g. Design assets, number of pages, custom plugins, active payment gateways, your brand values)"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrorMsg("");
              }}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all placeholder:text-gray-400"
            />
            <span className="text-[10px] text-gray-400">Provide ample detail so our freelancers can make relevant proposals!</span>
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Budget */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                4. Your Budget ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
                <input
                  type="number"
                  min={5}
                  value={budget}
                  onChange={(e) => {
                    setBudget(Number(e.target.value));
                    setErrorMsg("");
                  }}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all"
                />
              </div>
            </div>

            {/* Delivery days */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                5. Target Delivery (Days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  value={deliveryDays}
                  onChange={(e) => {
                    setDeliveryDays(Number(e.target.value));
                    setErrorMsg("");
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all"
                />
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-black bg-white rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#ff5c00] hover:bg-[#e04f00] text-white font-bold rounded text-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Project Brief</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
