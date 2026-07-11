"use client";

import React from "react";
import { Globe, Accessibility } from "lucide-react";

interface FooterProps {
  onSelectCategory: (category: string | null) => void;
  onSearch: (query: string) => void;
}

const footerSections = [
  {
    title: "Categories",
    links: [
      { name: "Graphics & Design", category: "Graphics & Design" },
      { name: "Digital Marketing", category: "Digital Marketing" },
      { name: "Writing & Translation", category: "Writing & Translation" },
      { name: "Video & Animation", category: "Programming & Tech" }, // Map to supported categories or just search
      { name: "Music & Audio", category: "Music & Audio" },
      { name: "Programming & Tech", category: "Programming & Tech" },
      { name: "AI Services", category: "AI Services" },
      { name: "Consulting", search: "Consulting" },
      { name: "Data", search: "Data" },
      { name: "Business", search: "Business" },
      { name: "Personal Growth & Hobbies", search: "Personal" },
      { name: "Photography", search: "Photography" },
      { name: "Finance", search: "Finance" },
      { name: "End-to-End Projects", search: "Projects" },
      { name: "Service Catalog", search: "" }
    ]
  },
  {
    title: "For Clients",
    links: [
      { name: "How Fiverr Works" },
      { name: "Customer Success Stories" },
      { name: "Quality Guide" },
      { name: "Fiverr Guides" },
      { name: "Fiverr Answers" },
      { name: "Browse Freelance By Skill" }
    ]
  },
  {
    title: "For Freelancers",
    links: [
      { name: "Become a Fiverr Freelancer" },
      { name: "Become an Agency" },
      { name: "Community Hub" },
      { name: "Forum" },
      { name: "Events" }
    ]
  },
  {
    title: "Business Solutions",
    links: [
      { name: "Fiverr Pro" },
      { name: "Project Management Service" },
      { name: "Expert Sourcing Service" },
      { name: "ClearVoice - Content Marketing" },
      { name: "AutoDS - Dropshipping Tool" },
      { name: "Digis - Software Development" },
      { name: "AI store builder" },
      { name: "Fiverr Logo Maker" },
      { name: "Contact Sales" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Fiverr" },
      { name: "Help Center" },
      { name: "Trust & Safety" },
      { name: "Social Impact" },
      { name: "Careers" },
      { name: "Terms of Service" },
      { name: "Privacy Policy" },
      { name: "Do not sell or share my personal information" },
      { name: "Partnerships" },
      { name: "Creator Network" },
      { name: "Affiliates" },
      { name: "Invite a Friend" },
      { name: "Press & News" },
      { name: "Investor Relations" }
    ]
  }
];

export default function Footer({ onSelectCategory, onSearch }: FooterProps) {
  const handleLinkClick = (link: { name: string; category?: string; search?: string }) => {
    if (link.category) {
      onSelectCategory(link.category);
      onSearch("");
      window.scrollTo({ top: 300, behavior: "smooth" });
    } else if (link.search !== undefined) {
      onSelectCategory(null);
      onSearch(link.search);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-12 w-full font-sans text-left">
      {/* Top 5 columns section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerSections.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="font-bold text-gray-900 text-[15px] mb-4 tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-3.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-[#74767e] hover:text-[#ff5c00] text-[14px] leading-snug font-medium text-left transition-colors cursor-pointer block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Socials & Rights section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Leftside: Fiverr logo + trademark tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 text-center sm:text-left">
            <div className="text-[28px] font-black tracking-tighter text-[#404145] select-none leading-none">
              Velo Desk<span className="text-[#ff5c00]">.</span>
            </div>
            <span className="text-[14px] text-[#b5b6ba] font-medium pt-1">
              © Velo Desk. International Ltd. 2026
            </span>
          </div>

          {/* Rightside: Social Media SVGs & Controls */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[#74767e]">
            {/* Social Icons list */}
            <div className="flex items-center gap-4.5">
              {/* TikTok */}
              <a
                href="#"
                className="hover:text-[#404145] transition-colors"
                aria-label="Fiverr TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.15.94.97 2.22 1.54 3.56 1.68V9.7c-1.32-.1-2.61-.53-3.71-1.28-.59-.39-1.1-1.04-1.38-1.74v7.54c.05 4.14-3.07 8.05-7.14 8.71C6.2 23.47 1.83 20 1.07 15.82c-.89-4.83 2.76-9.59 7.55-9.87.14 0 .28-.01.42-.01v3.83c-1.89.15-3.37 1.86-3.21 3.75.14 1.7 1.6 3.03 3.31 2.92a2.912 2.912 0 0 0 2.82-2.92V.02z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="hover:text-[#404145] transition-colors"
                aria-label="Fiverr Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="hover:text-[#404145] transition-colors"
                aria-label="Fiverr LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="hover:text-[#404145] transition-colors"
                aria-label="Fiverr Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="#"
                className="hover:text-[#404145] transition-colors"
                aria-label="Fiverr Pinterest"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                className="hover:text-[#404145] transition-colors"
                aria-label="Fiverr X"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Separator dot */}
            <span className="hidden sm:inline text-gray-300">•</span>

            {/* Language Selection */}
            <button className="flex items-center gap-1.5 hover:text-[#ff5c00] font-semibold text-[14px] cursor-pointer">
              <Globe className="w-4.5 h-4.5 text-gray-400" />
              <span>English</span>
            </button>

            {/* Currency Selection */}
            <button className="hover:text-[#ff5c00] font-semibold text-[14px] cursor-pointer">
              $ USD
            </button>

            {/* Accessibility Icon */}
            <button
              className="text-[#74767e] hover:text-[#ff5c00] p-1 border border-gray-300 hover:border-[#ff5c00] rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Accessibility options"
            >
              <Accessibility className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
