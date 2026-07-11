"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Heart,
  Mail,
  Search,
  ClipboardList,
  Compass,
  Smartphone,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Award,
  Video,
  X,
  Plus,
  MessageCircle,
  Clock,
  Sparkles,
  Info,
  Palette,
  Laptop,
  Mic,
  ShoppingBag,
  Share2,
  ShieldCheck,
  MousePointer2,
  ChevronDown,
  SlidersHorizontal,
  Star,
  Package,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import GigCard from "@/components/GigCard";
import GigDetailModal from "@/components/GigDetailModal";
import ProjectBriefModal from "@/components/ProjectBriefModal";
import InboxDrawer from "@/components/InboxDrawer";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

import { RECOMMENDED_GIGS, VERIFIED_PRO_WEBSITE_GIGS, INITIAL_CONVERSATIONS, INITIAL_BRIEFS } from "@/lib/data";
import { Gig, Conversation, ProjectBrief, UserProfileProgress, Bid, Order } from "@/lib/frontend-types";
import { usePrivy } from "@/hooks/usePrivy";

export default function Home() {
  // Navigation & Search States
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Popular Professional Services filters states
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("All");
  const [budgetFilter, setBudgetFilter] = useState<string>("All");
  const [skillsFilter, setSkillsFilter] = useState<string>("All");
  const [listingTypeFilter, setListingTypeFilter] = useState<string>("All");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [languagesFilter, setLanguagesFilter] = useState<string>("All");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);

  // Core Entity States
  const [favorites, setFavorites] = useState<string[]>(["g1", "g3"]);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [briefs, setBriefs] = useState<ProjectBrief[]>(INITIAL_BRIEFS);
  
  // Active Orders State (Hasibul's Orders)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord-101",
      gigTitle: "Custom WordPress Landing Page & Speed capped Setup",
      packageName: "Standard Velocity Engine",
      sellerName: "Alexander M.",
      sellerAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
      price: 320,
      deliveryDays: 4,
      status: "In Progress",
      milestones: [
        { name: "Order placed", done: true },
        { name: "Requirements submitted", done: true },
        { name: "First draft delivery", done: false },
        { name: "Final delivery", done: false }
      ],
      date: "June 14, 2026"
    },
    {
      id: "ord-100",
      gigTitle: "Automated dropshipping website under 1 week",
      packageName: "Basic Starter Package",
      sellerName: "Sonarish",
      sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
      price: 155,
      deliveryDays: 4,
      status: "Delivered",
      milestones: [
        { name: "Order placed", done: true },
        { name: "Requirements submitted", done: true },
        { name: "First draft delivery", done: true },
        { name: "Final delivery", done: true }
      ],
      date: "June 08, 2026"
    }
  ]);

  // User Profile progress State
  const [userProfile, setUserProfile] = useState<UserProfileProgress>({
    displayName: "Hasibul",
    username: "hasibul_dev",
    email: "amimahituike@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80", // Hasibul's avatar represent
    completedPercent: 35,
    completedTasks: {
      bio: false,
      skills: false,
      links: false,
      phone: false,
      portfolio: false
    }
  });

  // UI Drawer / Modal Toggles
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showBriefCreator, setShowBriefCreator] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showProfileTasksDrawer, setShowProfileTasksDrawer] = useState(false);

  // Sliding indices for Carousels
  const [recommendedSliderIdx, setRecommendedSliderIdx] = useState(0);
  const [proSliderIdx, setProSliderIdx] = useState(0);

  // Automated Bid generator simulation
  const simulateFreelancerBids = (briefTitle: string, briefId: string) => {
    setTimeout(() => {
      const generatedBid: Bid = {
        id: `bid-${Date.now()}`,
        sellerName: "Nick",
        sellerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        sellerBadge: "Vetted Pro",
        price: 140,
        proposal: `Hi Hasibul! I am highly interested in your brief about '${briefTitle}'. As a Vetted Pro Shopify Specialist, I am ready to start immediately. I can deliver this exactly to specifications with premium interactive UI blocks & clean responsive layout. Let's lock in!`,
        deliveryDays: 4,
        rating: 5.0
      };

      setBriefs((prevBriefs) =>
        prevBriefs.map((b) => {
          if (b.id === briefId) {
            return {
              ...b,
              bids: [...b.bids, generatedBid]
            };
          }
          return b;
        })
      );

      // Add a fresh conversation so the user can chat about the brief!
      setConversations((prevConvs) => {
        const alreadyExists = prevConvs.find((c) => c.sellerName === "Nick");
        if (alreadyExists) {
          return prevConvs.map((c) => {
            if (c.sellerName === "Nick") {
              return {
                ...c,
                unread: true,
                lastMessage: `Hi Hasibul, I submitted a custom proposal for your brief about '${briefTitle}'! Let us discuss.`,
                messages: [
                  ...c.messages,
                  {
                    id: `m-auto-${Date.now()}`,
                    sender: "seller",
                    text: `Hi Hasibul, I just made a custom $140 proposal for your active brief: '${briefTitle}'. Let me know if you would like to run a query or Zoom setup!`,
                    timestamp: "Just now"
                  }
                ]
              };
            }
            return c;
          });
        }
        return prevConvs;
      });
    }, 5000);
  };

  // Submit Brief action
  const handlePostBrief = (
    title: string,
    category: string,
    description: string,
    budget: number,
    deliveryDays: number
  ) => {
    const newBriefId = `b-${Date.now()}`;
    const newBrief: ProjectBrief = {
      id: newBriefId,
      title,
      category,
      description,
      budget,
      deliveryDays,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      bids: []
    };

    setBriefs([newBrief, ...briefs]);
    setActiveTab("briefs");

    // Trigger simulation of bidders
    simulateFreelancerBids(title, newBriefId);
  };

  // Profile Task Checklist click
  const handleToggleProfileTask = (taskKey: keyof UserProfileProgress["completedTasks"]) => {
    setUserProfile((prev) => {
      const isCompletedNow = !prev.completedTasks[taskKey];
      const nextTasks = { ...prev.completedTasks, [taskKey]: isCompletedNow };

      // Calculate new completed percent
      let basePercent = 35; // default
      if (nextTasks.bio) basePercent += 15;
      if (nextTasks.skills) basePercent += 15;
      if (nextTasks.links) basePercent += 10;
      if (nextTasks.phone) basePercent += 15;
      if (nextTasks.portfolio) basePercent += 10;

      return {
        ...prev,
        completedPercent: Math.min(basePercent, 100),
        completedTasks: nextTasks
      };
    });
  };

  // Favorites click toggle
  const handleToggleFavorite = (gigId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      if (prev.includes(gigId)) {
        return prev.filter((id) => id !== gigId);
      } else {
        return [...prev, gigId];
      }
    });
  };

  // Contact Seller click handler
  const handleContactSeller = (sellerName: string) => {
    const existing = conversations.find((c) => c.sellerName.includes(sellerName));
    if (existing) {
      setSelectedConversationId(existing.id);
    } else {
      // Create a fresh blank conversation represent
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        sellerName,
        sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        lastMessage: "Hi Hasibul, how can I help you regarding my services?",
        timestamp: "Just now",
        unread: false,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: "seller",
            text: "Hi Hasibul, let me know what requirements are you looking to customize!",
            timestamp: "Just now"
          }
        ]
      };
      setConversations([newConv, ...conversations]);
      setSelectedConversationId(newConv.id);
    }
    setSelectedGig(null);
    setShowInbox(true);
  };

  // Place Order checkout handler
  const handleOrderComplete = (gigTitle: string, packageName: string, price: number) => {
    const newOrder = {
      id: `ord-${Date.now()}`,
      gigTitle,
      packageName,
      sellerName: selectedGig?.seller.name || "Nick",
      sellerAvatar: selectedGig?.seller.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
      price,
      deliveryDays: selectedGig?.packages.basic.deliveryTime || 5,
      status: "In Progress",
      milestones: [
        { name: "Order placed", done: true },
        { name: "Requirements submitted", done: true },
        { name: "First draft delivery", done: false },
        { name: "Final delivery", done: false }
      ],
      date: "Today"
    };

    setOrders([newOrder, ...orders]);
  };

  // Initiate AbabilPay payment via Next.js backend
  const handleInitiatePayment = async (gigTitle: string, price: number, serviceId: string, packageName: string) => {
    try {
      const apiBase = "";
      const res = await fetch(`${apiBase}/api/payment/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          packageName,
          amountUsdc: price,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Payment failed: ${err.error || "Unknown error"}`);
        return;
      }

      const data = await res.json();

      // Create local order record
      const newOrder = {
        id: data.order_id,
        gigTitle,
        packageName,
        sellerName: selectedGig?.seller.name || "Seller",
        sellerAvatar: selectedGig?.seller.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=128&h=128&q=80",
        price,
        deliveryDays: selectedGig?.packages.basic.deliveryTime || 5,
        status: "Awaiting Payment",
        milestones: [
          { name: "Order placed", done: true },
          { name: "Payment confirmed", done: false },
          { name: "Production phase", done: false },
          { name: "Final delivery", done: false },
        ],
        date: "Today",
      };

      setOrders((prev) => [newOrder, ...prev]);
      setSelectedGig(null);

      // Redirect to AbabilPay checkout
      window.location.href = data.checkout_url;
    } catch (err) {
      alert(`Could not connect to payment server. Make sure the Next.js server is running.`);
      console.error("Payment initiation error:", err);
    }
  };

  // Verify AbabilPay payment status via Next.js backend
  const handleVerifyOrderPayment = async (orderId: string) => {
    try {
      const apiBase = "";
      const res = await fetch(`${apiBase}/api/payment/verify?order_id=${encodeURIComponent(orderId)}`);
      if (!res.ok) {
        const err = await res.json();
        alert(`Verification failed: ${err.error || "Unknown error"}`);
        return;
      }

      const data = await res.json();
      if (data.verified && data.status === "paid") {
        setOrders((prevOrders) =>
          prevOrders.map((ord) => {
            if (ord.id === orderId) {
              return {
                ...ord,
                status: "In Progress",
                txHash: data.tx_hash,
                buyerAddress: data.buyer_address,
                milestones: ord.milestones.map((m) =>
                  m.name === "Payment confirmed" ? { ...m, done: true } : m
                ),
              };
            }
            return ord;
          })
        );
        alert("Payment verified successfully! Your order is now In Progress.");
      } else {
        alert(`Payment status is still: ${data.status || "pending"}.`);
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Failed to verify payment status. Please try again.");
    }
  };

  // Send messaging in Chat Cabinet
  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            timestamp: "Just now",
            unread: false,
            messages: [
              ...c.messages,
              {
                id: `usr-msg-${Date.now()}`,
                sender: "user",
                text,
                timestamp: "Just now"
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Receive message response handler
  const handleReceiveMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            timestamp: "Just now",
            unread: true,
            messages: [
              ...c.messages,
              {
                id: `sel-msg-${Date.now()}`,
                sender: "seller",
                text,
                timestamp: "Just now"
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Accept a freelancer's bid proposal
  const handleAcceptBid = (briefId: string, bidId: string) => {
    const targetBrief = briefs.find((b) => b.id === briefId);
    if (!targetBrief) return;
    const targetBid = targetBrief.bids.find((bd) => bd.id === bidId);
    if (!targetBid) return;

    // Post to Orders immediately
    const bidOrder = {
      id: `ord-bid-${Date.now()}`,
      gigTitle: `Custom Brief Contract: ${targetBrief.title}`,
      packageName: "Bespoke Gig Bid",
      sellerName: targetBid.sellerName,
      sellerAvatar: targetBid.sellerAvatar,
      price: targetBid.price,
      deliveryDays: targetBid.deliveryDays,
      status: "In Progress",
      milestones: [
        { name: "Order accepted", done: true },
        { name: "Milestone contract active", done: true },
        { name: "Production phase", done: false },
        { name: "Review and release", done: false }
      ],
      date: "Today"
    };

    setOrders([bidOrder, ...orders]);
    
    // Complete brief status
    setBriefs((prevBriefs) =>
      prevBriefs.map((b) => {
        if (b.id === briefId) {
          return { ...b, status: "Completed" };
        }
        return b;
      })
    );
  };

  // Filter lists based on Category, Search and advanced criteria filters
  const filterGigs = (gigList: Gig[]) => {
    return gigList.filter((g) => {
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === "Trending 🔥" ||
        g.category === selectedCategory;

      const matchesSearch =
        !searchQuery ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 1. Project Type Filter
      let matchesProjectType = true;
      if (projectTypeFilter !== "All") {
        if (projectTypeFilter === "Full Store Setup") {
          matchesProjectType =
            g.title.toLowerCase().includes("store") ||
            g.title.toLowerCase().includes("website") ||
            g.title.toLowerCase().includes("complete");
        } else if (projectTypeFilter === "One-off Task") {
          matchesProjectType = g.price <= 150;
        } else if (projectTypeFilter === "Hourly Consulting") {
          matchesProjectType = g.offersConsultation === true;
        }
      }

      // 2. Budget Filter
      let matchesBudget = true;
      if (budgetFilter !== "All") {
        if (budgetFilter === "Under $150") {
          matchesBudget = g.price < 150;
        } else if (budgetFilter === "$150 - $300") {
          matchesBudget = g.price >= 150 && g.price <= 300;
        } else if (budgetFilter === "Above $300") {
          matchesBudget = g.price > 300;
        }
      }

      // 3. Skills Filter
      let matchesSkills = true;
      if (skillsFilter !== "All") {
        const textToSearch = (g.title + " " + g.description + " " + (g.category || "")).toLowerCase();
        if (skillsFilter === "Shopify") {
          matchesSkills = textToSearch.includes("shopify");
        } else if (skillsFilter === "React / Headless") {
          matchesSkills =
            textToSearch.includes("react") ||
            textToSearch.includes("headless") ||
            textToSearch.includes("css") ||
            textToSearch.includes("js");
        } else if (skillsFilter === "AI / Automation") {
          matchesSkills =
            textToSearch.includes("ai") ||
            textToSearch.includes("artificial") ||
            textToSearch.includes("vibe") ||
            textToSearch.includes("automated");
        } else if (skillsFilter === "Video Editing") {
          matchesSkills =
            textToSearch.includes("video") ||
            textToSearch.includes("motion") ||
            textToSearch.includes("edit");
        } else if (skillsFilter === "Design") {
          matchesSkills =
            textToSearch.includes("design") ||
            textToSearch.includes("graphic") ||
            textToSearch.includes("logo") ||
            textToSearch.includes("ux");
        }
      }

      // 4. Listing Type Filter
      let matchesListingType = true;
      if (listingTypeFilter !== "All") {
        if (listingTypeFilter === "Includes Video") {
          matchesListingType = g.isVideo === true;
        } else if (listingTypeFilter === "Offers Consultation") {
          matchesListingType = g.offersConsultation === true;
        } else if (listingTypeFilter === "Pro Level Seller") {
          matchesListingType = g.seller.isPro === true;
        }
      }

      // 5. Location Filter
      let matchesLocation = true;
      if (locationFilter !== "All") {
        const sellerName = g.seller.name.toLowerCase();
        if (locationFilter === "United States") {
          matchesLocation = sellerName.includes("nick");
        } else if (locationFilter === "Europe") {
          matchesLocation =
            sellerName.includes("lucas") ||
            sellerName.includes("sonarish") ||
            sellerName.includes("alexander");
        } else if (locationFilter === "Asia-Pacific") {
          matchesLocation =
            sellerName.includes("divishha") ||
            sellerName.includes("hasibul");
        }
      }

      // 6. Languages Filter
      let matchesLanguages = true;
      if (languagesFilter !== "All") {
        const sellerName = g.seller.name.toLowerCase();
        if (languagesFilter === "English Only") {
          matchesLanguages = sellerName.includes("nick") || sellerName.includes("lucas");
        } else if (languagesFilter === "Multilingual (ES/FR/DE)") {
          matchesLanguages = !sellerName.includes("nick");
        }
      }

      return (
        matchesCategory &&
        matchesSearch &&
        matchesProjectType &&
        matchesBudget &&
        matchesSkills &&
        matchesListingType &&
        matchesLocation &&
        matchesLanguages
      );
    });
  };

  const filteredRecommended = filterGigs(RECOMMENDED_GIGS);
  const filteredVerifiedPro = filterGigs(VERIFIED_PRO_WEBSITE_GIGS);

  return (
    <div className="min-h-screen bg-white text-[#404145] flex flex-col font-sans select-none antialiased">
      
      {/* 1. Navbar Header */}
      <Header
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        conversations={conversations}
        onOpenInbox={() => {
          setSelectedConversationId(conversations[0]?.id || null);
          setShowInbox(true);
        }}
        onOpenFavorites={() => setShowFavorites(true)}
        onOpenOrders={() => setActiveTab("orders")}
        onOpenProfile={() => setShowProfile(true)}
        userProfile={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 2. Subcategory CategoryNav bar */}
      <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* 3. Main content body */}
      <main className="flex-1 w-full mb-16">
        
        {activeTab === "briefs" ? (
          /* PROJECT BRIEFS PANEL VIEW */
          <div id="briefs-panel" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] bg-orange-50 text-[#ff5c00] font-black border border-orange-200 uppercase px-2 py-0.5 rounded tracking-wide">
                  My Active Contracts
                </span>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1.5">Project Briefing Center</h1>
                <p className="text-xs text-gray-500">
                  Manage active listings and accept real custom proposals submitted on your briefs in real-time.
                </p>
              </div>
              <button
                onClick={() => setShowBriefCreator(true)}
                className="bg-[#ff5c00] hover:bg-[#e04f00] text-white font-bold py-2.5 px-5 rounded text-sm transition-all shadow-sm cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Project Brief</span>
              </button>
            </div>

            {briefs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-150 p-12 text-center flex flex-col items-center justify-center space-y-4">
                <ClipboardList className="w-12 h-12 text-gray-300" />
                <h2 className="text-lg font-bold text-gray-900">No active briefs yet</h2>
                <p className="text-xs text-gray-400 max-w-sm">
                  Create a tailored project requirements document so elite sellers can review and bid custom proposals.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {briefs.map((brief) => (
                  <div
                    key={brief.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    {/* Header info */}
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4 bg-gray-50/50">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-black border uppercase px-2 py-0.5 rounded tracking-wide ${
                            brief.status === "Active"
                              ? "bg-orange-50 text-[#ff5c00] border-orange-100"
                              : "bg-blue-50 text-blue-600 border-blue-100"
                          }`}>
                            {brief.status}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">Posted: {brief.createdAt}</span>
                          <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                            {brief.category}
                          </span>
                        </div>
                        <h2 className="text-base font-black text-gray-950 leading-tight">{brief.title}</h2>
                        <p className="text-xs text-gray-600 leading-relaxed text-justify pr-6">
                          {brief.description}
                        </p>
                      </div>

                      <div className="flex items-center md:flex-col gap-4 text-xs font-bold font-mono text-gray-700 md:text-right md:shrink-0">
                        <div className="bg-white px-3.5 py-1.5 rounded-lg border border-gray-150">
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-normal leading-none mb-1">Budget</p>
                          <span className="text-sm font-black text-gray-950">${brief.budget}</span>
                        </div>
                        <div className="bg-white px-3.5 py-1.5 rounded-lg border border-gray-150">
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-normal leading-none mb-1">Timeline</p>
                          <span className="text-sm font-black text-gray-950">{brief.deliveryDays} Days</span>
                        </div>
                      </div>
                    </div>

                    {/* Bids received listings */}
                    <div className="p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                        <span className="h-2 w-2 rounded-full bg-[#ff5c00]" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest leading-none">
                          Freelancer Proposals ({brief.bids.length})
                        </h3>
                      </div>

                      {brief.bids.length === 0 ? (
                        <div className="py-8 text-center text-xs text-gray-400 flex flex-col items-center justify-center gap-2">
                          <div className="h-6 w-6 border-2 border-[#ff5c00] border-t-transparent rounded-full animate-spin" />
                          <span className="font-semibold text-gray-500 animate-pulse">Matching brief with top-vetted developers...</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {brief.bids.map((bid) => (
                            <div
                              key={bid.id}
                              className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start"
                            >
                              <div className="flex gap-4 items-start flex-1">
                                <img
                                  className="h-10 w-10 rounded-full object-cover border border-gray-100 shrink-0"
                                  src={bid.sellerAvatar}
                                  alt={bid.sellerName}
                                  referrerPolicy="no-referrer"
                                />
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-gray-900">{bid.sellerName}</span>
                                    <span className="bg-indigo-50 text-indigo-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-indigo-100 uppercase tracking-wider">
                                      {bid.sellerBadge}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed italic text-justify pr-4">
                                    "{bid.proposal}"
                                  </p>
                                </div>
                              </div>

                              <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-5 flex md:flex-col justify-between items-center gap-4 md:shrink-0 text-left">
                                <div className="text-xs font-mono">
                                  <p className="text-gray-400 font-semibold uppercase leading-none">Rate Bid</p>
                                  <p className="text-lg font-black text-[#ff5c00] mt-1">${bid.price}</p>
                                  <span className="text-[10px] text-gray-400 leading-none block mt-0.5">{bid.deliveryDays} Days delivery</span>
                                </div>

                                {brief.status !== "Completed" ? (
                                  <button
                                    onClick={() => handleAcceptBid(brief.id, bid.id)}
                                    className="bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 px-4 rounded transition-colors cursor-pointer shrink-0"
                                  >
                                    Accept Proposal
                                  </button>
                                ) : (
                                  <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded border border-orange-100 flex items-center gap-1 shrink-0">
                                    ✓ Hired / Ordered
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === "orders" ? (
          /* ORDERS WORKSPACE VIEW */
          <div id="orders-panel" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] bg-orange-50 text-[#ff5c00] font-black border border-orange-200 uppercase px-2 py-0.5 rounded tracking-wide">
                  My Active Orders
                </span>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1.5">Orders Tracking Workspace</h1>
                <p className="text-xs text-gray-500">
                  Track project milestones, verify payments, and manage active contracts with developers.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-150 p-12 text-center flex flex-col items-center justify-center space-y-4">
                <Package className="w-12 h-12 text-gray-300" />
                <h2 className="text-lg font-bold text-gray-900">No orders yet</h2>
                <p className="text-xs text-gray-400 max-w-sm">
                  Find a service and place an order to get started. Elite freelancers will deliver quality work.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    {/* Header Details */}
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-gray-50/50">
                      <div className="flex gap-4 items-start flex-1 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={order.sellerAvatar}
                            alt={order.sellerName}
                            className="w-12 h-12 rounded-full object-cover border border-white shadow-sm"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gray-400">Order: {order.id}</span>
                            <span className="text-gray-300 font-normal">•</span>
                            <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                              {order.packageName}
                            </span>
                          </div>
                          <h2 className="text-base font-black text-gray-950 leading-tight truncate">{order.gigTitle}</h2>
                          <p className="text-xs text-gray-500 font-medium">
                            Seller: <span className="font-bold text-gray-700">{order.sellerName}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-4 text-xs font-bold font-mono text-gray-700 md:text-right md:shrink-0 justify-between items-center md:items-end">
                        <div className="bg-white px-3.5 py-1.5 rounded-lg border border-gray-150">
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-normal leading-none mb-1">Budget</p>
                          <span className="text-sm font-black text-gray-950">${order.price} USDC</span>
                        </div>
                        <div className="bg-white px-3.5 py-1.5 rounded-lg border border-gray-150">
                          <p className="text-[10px] text-gray-400 uppercase font-black tracking-normal leading-none mb-1">Status</p>
                          <span className={`text-xs font-black px-2 py-0.5 rounded ${
                            order.status === "Delivered" || order.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : order.status === "In Progress" || order.status === "paid"
                              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress / Milestones and Action button */}
                    <div className="p-6 bg-white flex flex-col lg:flex-row justify-between items-center gap-6">
                      {/* Milestones stepper */}
                      <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {order.milestones.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-3 relative">
                            <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 text-xs font-black shadow-inner transition-colors duration-300 ${
                              m.done 
                                ? "bg-orange-500 border-orange-500 text-white" 
                                : "bg-gray-50 border-gray-200 text-gray-400"
                            }`}>
                              {m.done ? "✓" : idx + 1}
                            </div>
                            <div className="text-left leading-tight">
                              <p className={`text-xs font-black ${m.done ? "text-gray-900" : "text-gray-400"}`}>{m.name}</p>
                              <p className="text-[10px] text-gray-400 font-semibold">{m.done ? "Completed" : "Pending"}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="shrink-0 flex gap-2 w-full lg:w-auto justify-end">
                        {order.status === "Awaiting Payment" && (
                          <button
                            onClick={() => handleVerifyOrderPayment(order.id)}
                            className="w-full lg:w-auto bg-[#ff5c00] hover:bg-[#e04f00] text-white font-black py-2.5 px-5 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Verify Payment Status</span>
                          </button>
                        )}
                        {order.txHash && (
                          <a
                            href={`https://etherscan.io/tx/${order.txHash}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full lg:w-auto bg-gray-50 hover:bg-gray-100 text-gray-700 font-black py-2.5 px-5 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 border border-gray-200 flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            <span>View Transaction</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* CORE DASHBOARD PAGE */
          <div className="space-y-0 text-left animate-fade-in w-full">
            {/* A. Welcome Banner Banner (Full-width Wrapper) */}
            <div 
              id="welcome-gradient-banner" 
              className="w-full relative bg-[#130700] text-white pt-16 md:pt-24 pb-0 select-none overflow-hidden"
              style={{
                backgroundImage: 'none'
              }}
            >
              {/* Bottom subtle border */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-[#ff5c00]/10" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-end justify-between gap-12 relative z-10 w-full">
                
                {/* Left Side: Editorial Typography & Workstation Controls */}
                <div className="space-y-6 max-w-xl text-left flex flex-col justify-center lg:w-[52%] pb-16 md:pb-24">
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] pt-1">
                      Find the right <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c00] via-orange-400 to-[#ff9f43] font-medium font-serif">freelance</span> service, instantly
                    </h1>
                    
                    <p className="text-sm sm:text-[15px] text-orange-100/85 leading-relaxed font-normal max-w-md">
                      Welcome back, <span className="font-extrabold text-[#ff5c00] underline decoration-[#ff5c00]/30 decoration-wavy underline-offset-4 cursor-pointer hover:text-orange-400 transition-all">Hasibul</span>. Let’s scale your storefront workflows today with vetted expert talent.
                    </p>
                  </div>

                  {/* Trust Badge & Action Cluster from User Reference Photo */}
                  <div className="space-y-6 pt-2 pb-4 font-display">
                    {/* ★★★★★ Freelancers Rating block exactly as requested */}
                    <div className="flex items-center gap-3.5 select-none animate-fade-in">
                      <div className="flex items-center gap-1.5 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
                        <Star className="w-5 h-5 text-[#ff5c00] fill-[#ff5c00] filter drop-shadow-[0_2px_8px_rgba(255,92,0,0.4)]" />
                        <Star className="w-5 h-5 text-[#ff5c00] fill-[#ff5c00] filter drop-shadow-[0_2px_8px_rgba(255,92,0,0.4)]" />
                        <Star className="w-5 h-5 text-[#ff5c00] fill-[#ff5c00] filter drop-shadow-[0_2px_8px_rgba(255,92,0,0.4)]" />
                        <Star className="w-5 h-5 text-[#ff5c00] fill-[#ff5c00] filter drop-shadow-[0_2px_8px_rgba(255,92,0,0.4)]" />
                        <Star className="w-5 h-5 text-[#ff5c00] fill-[#ff5c00] filter drop-shadow-[0_2px_8px_rgba(255,92,0,0.4)]" />
                      </div>
                      <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                        Freelancers
                      </span>
                    </div>

                    {/* Pill Action Buttons (Black Find Freelancers & Gray View Works) */}
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Pill 1: Find Freelancers */}
                      <button
                        onClick={() => {
                          const element = document.getElementById("recommended-slider-section");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-[#111111] hover:bg-black text-white pl-7 pr-3 py-2.5 rounded-full flex items-center justify-between gap-6 font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(255,92,0,0.15)] border border-white/10 cursor-pointer max-w-max group text-left"
                      >
                        <span className="font-display tracking-[0.02em]">Find Freelancers</span>
                        <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transition-all group-hover:translate-x-1.5 duration-300 group-hover:bg-[#ff5c00] group-hover:text-white shadow-md">
                          <ArrowRight className="w-4 h-4 transition-transform text-current" />
                        </div>
                      </button>

                      {/* Pill 2: View Works */}
                      <button
                        onClick={() => {
                          const element = document.getElementById("recommended-slider-section");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-[#b0b3b8]/30 hover:bg-[#b0b3b8]/45 text-white/90 hover:text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border border-white/10 cursor-pointer max-w-max text-left font-display"
                      >
                        View Works
                      </button>
                    </div>
                  </div>

                  {/* Super-premium Command search console bar */}
                  <div className="relative max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="relative flex items-center">
                      <div className="absolute left-4.5 text-gray-400 pointer-events-none">
                        <Search className="w-4.5 h-4.5 text-[#ff5c00]" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search for any service (e.g. WordPress, logo design)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#140b06]/90 text-white placeholder-gray-500 pl-12 pr-26 py-4 rounded-full border border-orange-500/20 focus:outline-none focus:border-[#ff5c00] focus:ring-1 focus:ring-[#ff5c00] text-xs sm:text-sm font-medium transition-all shadow-inner backdrop-blur-md"
                      />
                      <button
                        onClick={() => {}}
                        className="absolute right-1.5 bg-[#ff5c00] hover:bg-[#e04f00] text-white px-5 py-2.5 rounded-full text-xs font-black transition-all hover:scale-103 active:scale-97 cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(255,92,0,0.4)]"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Tags styled beautifully as elegant luxury badge links */}
                  <div className="flex gap-2 items-center flex-wrap pt-0.5 text-[11px] text-orange-100/60 font-semibold select-none">
                    <span className="font-mono text-xs text-orange-300/60">Quick-Filters:</span>
                    <button 
                       onClick={() => { setSearchQuery("WordPress"); setSelectedCategory("Programming & Tech"); }} 
                      className="px-3.5 py-1 border border-white/5 hover:border-[#ff5c00]/40 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-white transition-all text-xs"
                    >
                      Websites
                    </button>
                    <button 
                       onClick={() => { setSearchQuery("dropshipping"); setSelectedCategory("Programming & Tech"); }} 
                      className="px-3.5 py-1 border border-white/5 hover:border-[#ff5c00]/40 rounded-full bg-white/[0.03] hover:bg-white/[0.08] hover:text-white transition-all text-xs"
                    >
                      Shopify
                    </button>
                    <button 
                      onClick={() => { setSelectedCategory("AI Services"); }} 
                      className="px-3.5 py-1 border border-[#ff5c00]/20 hover:border-[#ff5c00]/50 rounded-full bg-[#ff5c00]/5 text-[#ff5c00] hover:bg-[#ff5c00]/10 hover:text-orange-300 transition-all text-xs"
                    >
                      AI Tools
                    </button>
                  </div>
                </div>

                {/* Right Side: Seamless frameless photo touching bottom of the banner */}
                <div className="lg:w-[54%] flex items-end justify-end relative w-full h-[390px] sm:h-[490px] lg:h-[600px] self-end overflow-hidden pb-0 select-none pr-2 lg:pr-4">
                  
                  <img 
                    src="https://i.ibb.co.com/Q79p7TqK/894ce249-c0eb-4b84-b3ba-a3604ba6bd64.png" 
                    alt="Professional Freelancer Workspace" 
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain object-bottom select-none pointer-events-none transform scale-[1.38] translate-x-4 lg:translate-x-6 origin-bottom transition-all duration-300"
                  />
                </div>

              </div>
            </div>

            {/* Centered Dashboard Grid Wrapper max-w-7xl */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">

              {/* World-Class Infrastructure Bar */}
              <div id="infrastructure-bar" className="bg-white py-8 rounded-2xl flex flex-col items-center justify-center select-none relative overflow-hidden">
                <span className="text-gray-400 font-extrabold text-[11px] uppercase tracking-[0.25em] relative z-10 text-center mb-6">
                  Powered by World-Class Infrastructure
                </span>
                
                {/* Horizontal Marquee Overflow Container */}
                <div className="w-full overflow-hidden relative">
                  {/* Fading gradients on left and right sides of the scroll */}
                  <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                  
                  <div className="animate-marquee flex gap-16 md:gap-24 items-center whitespace-nowrap">
                    {/* First continuous loop */}
                    <div className="flex gap-16 md:gap-24 shrink-0 items-center">
                      {/* Circle */}
                      <div className="flex flex-col items-center space-y-1 pl-4">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Circle
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Wallets · USDC · CCTP
                        </span>
                      </div>

                      {/* Anthropic */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Anthropic
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Claude AI Agents
                        </span>
                      </div>

                      {/* 1inch */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          1inch
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Token Swap Aggregator
                        </span>
                      </div>

                      {/* LangChain */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          LangChain
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Agent Orchestration
                        </span>
                      </div>

                      {/* Resend */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Resend
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Transactional Email
                        </span>
                      </div>

                      {/* Firebase */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Firebase
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Mobile Push
                        </span>
                      </div>
                    </div>

                    {/* Second duplicated continuous loop for seamless infinite scroll */}
                    <div className="flex gap-16 md:gap-24 shrink-0 items-center">
                      {/* Circle */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Circle
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Wallets · USDC · CCTP
                        </span>
                      </div>

                      {/* Anthropic */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Anthropic
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Claude AI Agents
                        </span>
                      </div>

                      {/* 1inch */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          1inch
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Token Swap Aggregator
                        </span>
                      </div>

                      {/* LangChain */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          LangChain
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Agent Orchestration
                        </span>
                      </div>

                      {/* Resend */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Resend
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Transactional Email
                        </span>
                      </div>

                      {/* Firebase */}
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-zinc-400/90 hover:text-zinc-600 transition-colors font-black text-lg md:text-xl tracking-tight font-sans">
                          Firebase
                        </span>
                        <span className="text-zinc-400/70 text-[10px] font-semibold tracking-wide">
                          Mobile Push
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

                       {/* Popular professional services Grid */}
            <div id="popular-services-section" className="space-y-6 pt-2">
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-gray-800 to-gray-900 tracking-tight">Popular professional services</h2>
                <p className="text-xs text-gray-500 font-medium">Click on any category showcase below to filter specialization results</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                
                {/* Card 1: Vibe Coding */}
                <div
                  onClick={() => {
                    setSelectedCategory("AI Services");
                    setSearchQuery("AI Coding");
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="flex flex-col gap-2.5 hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Nested graphic mockup for Vibe Coding */}
                  <div className="w-full h-[160px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-gradient-to-b from-[#691834] via-[#5b152e] to-[#430f22] border border-gray-100 shadow-sm select-none">
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
                    
                    {/* Mock Browser/Editor Window */}
                    <div className="w-[88%] aspect-[1.5] bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/15 shadow-xl flex flex-col justify-between transition-transform duration-500 group-hover:scale-105">
                      {/* Top Window Bar */}
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                        <span className="text-[7px] text-white/45 font-mono ml-1.5 tracking-wider">aistudio.build</span>
                      </div>
                      
                      {/* Inner Editor Content */}
                      <div className="flex-1 flex flex-col justify-center items-center mt-1">
                        <span className="text-white font-sans text-[11px] font-extrabold tracking-tight filter drop-shadow">
                          Code with AI
                        </span>
                        
                        {/* Mock input text area */}
                        <div className="w-[85%] h-5 bg-black/45 border border-white/10 rounded-md mt-2 flex items-center px-1.5 justify-between">
                          <span className="text-[7px] text-orange-400 font-mono tracking-wide">npm run build</span>
                          <span className="w-1 h-2 bg-[#ff5c00] animate-pulse rounded-sm" />
                        </div>
                      </div>
                      
                      {/* Bottom Footer Line */}
                      <div className="flex justify-between items-center text-[6px] text-white/35 font-mono mt-1">
                        <span>main.tsx</span>
                        <span>100% compiled</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-900 group-hover:text-[#ff5c00] transition-colors text-[15px] font-extrabold tracking-tight leading-snug text-left pl-1">
                    Vibe Coding
                  </p>
                </div>

                {/* Card 2: Website Development */}
                <div
                  onClick={() => {
                    setSelectedCategory("Programming & Tech");
                    setSearchQuery("Website");
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="flex flex-col gap-2.5 hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Nested graphic mockup for Website Development */}
                  <div className="w-full h-[160px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#ffece0] border border-gray-100 shadow-sm select-none">
                    {/* Mock green theme device container */}
                    <div className="w-[88%] aspect-[1.5] bg-[#331405] rounded-lg p-2 border border-orange-500/10 shadow-lg flex flex-col justify-between transition-transform duration-500 group-hover:scale-105 relative">
                      {/* Top mini header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="w-8 h-1 bg-white/20 rounded-sm" />
                        </div>
                        <span className="w-3 h-1 bg-[#ff5c00] rounded-sm" />
                      </div>
                      
                      {/* Centered Image Mockup with sunglasses */}
                      <div className="flex-1 flex items-center justify-center py-1">
                        <div className="w-[80%] h-full bg-white/5 border border-white/10 rounded-md flex flex-col items-center justify-center p-1 relative">
                          {/* Mock Sunglasses Frame vector */}
                          <div className="flex gap-1 items-center">
                            <div className="w-7 h-4 rounded-b-md bg-[#ff5c00]/20 border border-[#ff5c00]/50 relative" />
                            <div className="w-1.5 h-0.5 bg-[#ff5c00]/50" />
                            <div className="w-7 h-4 rounded-b-md bg-[#ff5c00]/20 border border-[#ff5c00]/50 relative" />
                          </div>
                          <span className="text-[5px] text-white/40 mt-1 uppercase font-semibold">Premium Sunwear</span>
                        </div>
                      </div>

                      {/* Floating custom mouse pointer cursor */}
                      <div className="absolute right-4 bottom-2 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                        <svg className="w-3 h-3 text-[#ff5c00] drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.5 2v17.5L9.9 14l5 10 3.6-1.8-5-10 6.5-1.7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-900 group-hover:text-[#ff5c00] transition-colors text-[15px] font-extrabold tracking-tight leading-snug text-left pl-1">
                    Website Development
                  </p>
                </div>

                {/* Card 3: Video Editing */}
                <div
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("video");
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="flex flex-col gap-2.5 hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Nested graphic mockup for Video Editing */}
                  <div className="w-full h-[160px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#ffe3d6] border border-gray-100 shadow-sm select-none">
                    <div className="w-[88%] aspect-[1.5] bg-[#3d1220] rounded-lg p-2 border border-orange-200/10 shadow-lg flex flex-col justify-between transition-transform duration-500 group-hover:scale-105 relative">
                      {/* Top Controls mockup bar */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-1">
                        <span className="text-[6px] text-[#ff7a50] font-sans font-extrabold">EDIT MODE</span>
                        <div className="flex gap-1">
                          <span className="w-2 h-1 bg-white/20 rounded-sm" />
                          <span className="w-2 h-1 bg-rose-500 rounded-sm" />
                        </div>
                      </div>

                      {/* Video Player Main Canvas */}
                      <div className="flex-1 flex items-center justify-center my-1 relative">
                        {/* Dynamic dancer mockup figure in motion */}
                        <div className="relative h-10 w-full flex items-center justify-center">
                          <div className="absolute w-2 h-2 rounded-full bg-[#ff7a50] -top-1" />
                          {/* Angled torso and running legs lines */}
                          <div className="w-1 h-5 bg-[#ff7a50] rounded-full rotate-12" />
                          <div className="absolute w-4 h-0.5 bg-[#ff7a50] rounded-full rotate-45 -left-1" />
                          <div className="absolute w-3 h-0.5 bg-[#ff7a50] rounded-full -rotate-45 right-2" />
                        </div>
                      </div>

                      {/* Audio Timeline Tracks */}
                      <div className="space-y-0.5 border-t border-white/5 pt-1">
                        <div className="w-full h-1 bg-[#ff7a50]/20 rounded-full overflow-hidden flex gap-0.5">
                          <div className="w-1/3 h-full bg-[#ff7a50]" />
                          <div className="w-1/4 h-full bg-amber-500" />
                          <div className="w-1/6 h-full bg-[#ff7a50]" />
                        </div>
                        <div className="w-full h-0.5 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-900 group-hover:text-[#ff5c00] transition-colors text-[15px] font-extrabold tracking-tight leading-snug text-left pl-1">
                    Video Editing
                  </p>
                </div>

                {/* Card 4: Software Development */}
                <div
                  onClick={() => {
                    setSelectedCategory("Programming & Tech");
                    setSearchQuery("Developer");
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="flex flex-col gap-2.5 hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Nested graphic mockup for Software Development */}
                  <div className="w-full h-[160px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#b2571c] to-[#703006] border border-gray-100 shadow-sm select-none">
                    <div className="absolute inset-0 bg-[#3a1503]/20 pointer-events-none" />
                    
                    {/* Visual glowing folder mockups or databases */}
                    <div className="w-[88%] aspect-[1.5] bg-[#0c1003] rounded-lg p-2 border border-yellow-500/15 shadow-xl flex flex-col justify-between transition-transform duration-500 group-hover:scale-105">
                      {/* Window tab mockup */}
                      <div className="flex justify-between items-center">
                        <span className="text-[6px] text-yellow-300/80 font-mono tracking-widest uppercase">system_daemon</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/85 animate-ping" />
                      </div>

                      {/* Nested database file nodes lines code structure */}
                      <div className="flex-1 flex items-center gap-2 mt-1 px-1">
                        {/* Folder tree */}
                        <div className="flex flex-col gap-1 w-full font-mono text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-[6px]">▸</span>
                            <span className="text-slate-300 text-[6px]">components/</span>
                          </div>
                          <div className="flex items-center gap-1 pl-2">
                            <span className="text-orange-400 text-[5px]">schema.ts</span>
                            <div className="w-6 h-1 bg-orange-400/30 rounded-full" />
                          </div>
                          <div className="flex items-center gap-1 pl-2">
                            <span className="text-sky-450 text-[5px]">query.sql</span>
                            <div className="w-8 h-1 bg-sky-400/30 rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Performance line graph metric simulation */}
                      <div className="border-t border-white/5 pt-1 mt-1 flex items-center justify-between text-[5px] text-white/30 font-mono">
                        <span>CPU: 3%</span>
                        <span>LATENCY: 12ms</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-900 group-hover:text-[#ff5c00] transition-colors text-[15px] font-extrabold tracking-tight leading-snug text-left pl-1">
                    Software Development
                  </p>
                </div>

                {/* Card 5: Book Publishing */}
                <div
                  onClick={() => {
                    setSelectedCategory("Writing & Translation");
                    setSearchQuery("Book");
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="flex flex-col gap-2.5 hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Nested graphic mockup for Book Publishing */}
                  <div className="w-full h-[160px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#ffe2d1] border border-gray-100 shadow-sm select-none">
                    {/* 3D Perspective Book mock */}
                    <div className="w-[88%] h-[80%] flex items-center justify-center gap-1 transform hover:scale-105 transition-transform duration-500">
                      
                      {/* Left Page with floral/organic vector shapes resembling an illustration */}
                      <div className="w-[44%] h-[90%] bg-white rounded-l-md border-r border-gray-150 p-2 flex flex-col gap-1 items-center justify-center shadow-md origin-right skew-y-3">
                        <div className="relative w-6 h-6 flex items-center justify-center">
                          {/* Leaves mock shapes */}
                          <div className="absolute w-3 h-4 bg-[#ff5c00] rounded-full rotate-45" />
                          <div className="absolute w-3 h-4 bg-[#ff7a50] rounded-full -rotate-45" />
                          <div className="absolute w-2 h-2 bg-amber-400 rounded-full" />
                        </div>
                        <span className="text-[5px] text-gray-400 font-serif leading-none tracking-tight">Art Leaf</span>
                      </div>

                      {/* Right Page with gray mockup text lines */}
                      <div className="w-[44%] h-[90%] bg-white rounded-r-md p-2 flex flex-col justify-center gap-1.5 shadow-md origin-left -skew-y-3">
                        <div className="space-y-1">
                          <div className="w-full h-0.5 bg-gray-300 rounded-full" />
                          <div className="w-[85%] h-0.5 bg-gray-300 rounded-full" />
                          <div className="w-[90%] h-0.5 bg-gray-300 rounded-full" />
                          <div className="w-[70%] h-0.5 bg-gray-300 rounded-full" />
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-0.5 bg-gray-200 rounded-full" />
                          <div className="w-[80%] h-0.5 bg-gray-200 rounded-full" />
                        </div>
                      </div>

                    </div>
                  </div>

                  <p className="text-gray-900 group-hover:text-[#ff5c00] transition-colors text-[15px] font-extrabold tracking-tight leading-snug text-left pl-1">
                    Book Publishing
                  </p>
                </div>

                {/* Card 6: Architecture & Interior */}
                <div
                  onClick={() => {
                    setSelectedCategory("Graphics & Design");
                    setSearchQuery("Architecture");
                    window.scrollTo({ top: 450, behavior: "smooth" });
                  }}
                  className="flex flex-col gap-2.5 hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer group select-none"
                >
                  {/* Nested graphic mockup for Architecture & Interior */}
                  <div className="w-full h-[160px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#c6587c] border border-gray-100 shadow-sm select-none">
                    {/* Dashed boundary canvas crop box */}
                    <div className="w-[85%] aspect-[1.4] border border-dashed border-white/40 bg-white/5 rounded-lg p-1.5 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      
                      {/* Corner crop handles indicators */}
                      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white" />
                      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white" />
                      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white" />
                      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white" />

                      {/* Yellow Accent Designer Armchair silhouette illustration */}
                      <div className="flex flex-col items-center justify-center relative scale-95">
                        <div className="flex flex-col items-center relative">
                          {/* Armchair back curved cushion */}
                          <div className="w-8 h-6 bg-yellow-300 rounded-t-xl shadow-sm border-b border-yellow-400" />
                          {/* Armchair seat cushion */}
                          <div className="w-11 h-3.5 bg-yellow-400 rounded-full shadow-sm mt-0.5" />
                        </div>
                        {/* Wooden tiny slanted legs */}
                        <div className="flex gap-4 justify-between w-6 h-2 mt-0.5">
                          <div className="w-0.5 h-full bg-amber-800 rotate-12 rounded-sm" />
                          <div className="w-0.5 h-full bg-amber-800 -rotate-12 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-900 group-hover:text-[#ff5c00] transition-colors text-[15px] font-extrabold tracking-tight leading-snug text-left pl-1">
                    Architecture & Interior
                  </p>
                </div>

              </div>
            </div>

            {/* Unique Advanced Refinement filters */}
            <div id="advanced-refinement-filters" className="!mt-16 md:!mt-24 pt-12 border-t border-gray-150 space-y-6">
              <div className="space-y-1">
                <span className="text-[#ff5c00] text-[11px] font-bold uppercase tracking-wider">Search Refinement Engine</span>
                <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Looking for something specific?</h2>
                <p className="text-xs text-gray-500 font-medium">Use our advanced precision filters to list gigs matching your exact budget and criteria</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-50 to-white border border-gray-150 rounded-2xl p-6 space-y-5 shadow-sm relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#ff5c00]" />
                      <h3 className="text-base font-extrabold text-gray-950 tracking-tight">Precision Filters</h3>
                    </div>
                  </div>
                  {/* Reset and Count badges */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-orange-50 text-orange-700 border border-orange-100 font-extrabold px-2.5 py-1 rounded-full select-none">
                      {filteredRecommended.length + filteredVerifiedPro.length} verified options match
                    </span>
                    {(projectTypeFilter !== "All" || budgetFilter !== "All" || skillsFilter !== "All" || listingTypeFilter !== "All" || locationFilter !== "All" || languagesFilter !== "All") && (
                      <button
                        onClick={() => {
                          setProjectTypeFilter("All");
                          setBudgetFilter("All");
                          setSkillsFilter("All");
                          setListingTypeFilter("All");
                          setLocationFilter("All");
                          setLanguagesFilter("All");
                          setOpenFilterDropdown(null);
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-800 transition-colors bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-150 cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Clear filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Filtering Controls Row */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-1">
                  {/* 1. Project Type Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === "projectType" ? null : "projectType")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                        projectTypeFilter !== "All"
                          ? "bg-orange-50 border-orange-300 text-orange-850 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate pr-1">
                        {projectTypeFilter === "All" ? "Project Type" : projectTypeFilter}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openFilterDropdown === "projectType" ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                    </button>
                    {openFilterDropdown === "projectType" && (
                      <div className="absolute left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 py-1 transition-all">
                        {["All", "Full Store Setup", "One-off Task", "Hourly Consulting"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setProjectTypeFilter(opt);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              projectTypeFilter === opt ? "text-orange-650 bg-orange-50/40" : "text-gray-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {projectTypeFilter === opt && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Budget Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === "budget" ? null : "budget")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                        budgetFilter !== "All"
                          ? "bg-orange-50 border-orange-300 text-orange-850 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate pr-1">
                        {budgetFilter === "All" ? "Budget Limit" : budgetFilter}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openFilterDropdown === "budget" ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                    </button>
                    {openFilterDropdown === "budget" && (
                      <div className="absolute left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 py-1 transition-all">
                        {["All", "Under $150", "$150 - $300", "Above $300"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setBudgetFilter(opt);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              budgetFilter === opt ? "text-orange-655 bg-orange-50/40" : "text-gray-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {budgetFilter === opt && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Skills Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === "skills" ? null : "skills")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                        skillsFilter !== "All"
                          ? "bg-orange-50 border-orange-300 text-orange-850 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate pr-1">
                        {skillsFilter === "All" ? "Core Skills" : skillsFilter}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openFilterDropdown === "skills" ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                    </button>
                    {openFilterDropdown === "skills" && (
                      <div className="absolute left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 py-1 transition-all">
                        {["All", "Shopify", "React / Headless", "AI / Automation", "Video Editing", "Design"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setSkillsFilter(opt);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              skillsFilter === opt ? "text-orange-655 bg-orange-50/40" : "text-gray-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {skillsFilter === opt && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 4. Listing Type Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === "listingType" ? null : "listingType")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                        listingTypeFilter !== "All"
                          ? "bg-orange-50 border-orange-300 text-orange-850 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate pr-1">
                        {listingTypeFilter === "All" ? "Listing Type" : listingTypeFilter}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openFilterDropdown === "listingType" ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                    </button>
                    {openFilterDropdown === "listingType" && (
                      <div className="absolute left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 py-1 transition-all">
                        {["All", "Includes Video", "Offers Consultation", "Pro Level Seller"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setListingTypeFilter(opt);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              listingTypeFilter === opt ? "text-orange-655 bg-orange-50/40" : "text-gray-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {listingTypeFilter === opt && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 5. Location Source */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === "location" ? null : "location")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                        locationFilter !== "All"
                          ? "bg-orange-50 border-orange-300 text-orange-850 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate pr-1">
                        {locationFilter === "All" ? "Location" : locationFilter}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openFilterDropdown === "location" ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                    </button>
                    {openFilterDropdown === "location" && (
                      <div className="absolute right-0 md:left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 py-1 transition-all">
                        {["All", "United States", "Europe", "Asia-Pacific"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setLocationFilter(opt);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              locationFilter === opt ? "text-orange-655 bg-orange-50/40" : "text-gray-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {locationFilter === opt && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 6. Languages */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenFilterDropdown(openFilterDropdown === "languages" ? null : "languages")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all uppercase tracking-wide cursor-pointer ${
                        languagesFilter !== "All"
                          ? "bg-orange-50 border-orange-300 text-orange-850 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300"
                      }`}
                    >
                      <span className="truncate pr-1">
                        {languagesFilter === "All" ? "Languages" : languagesFilter}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${openFilterDropdown === "languages" ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                    </button>
                    {openFilterDropdown === "languages" && (
                      <div className="absolute right-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-gray-50 py-1 transition-all">
                        {["All", "English Only", "Multilingual (ES/FR/DE)"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setLanguagesFilter(opt);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              languagesFilter === opt ? "text-orange-655 bg-orange-50/40" : "text-gray-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {languagesFilter === opt && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Active Tags row */}
                {(projectTypeFilter !== "All" || budgetFilter !== "All" || skillsFilter !== "All" || listingTypeFilter !== "All" || locationFilter !== "All" || languagesFilter !== "All") && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs border-t border-gray-100">
                    <span className="text-gray-400/90 font-bold select-none mr-1">Active criteria:</span>
                    
                    {projectTypeFilter !== "All" && (
                      <span className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 select-none border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium transition-all">
                        <span>Type: {projectTypeFilter}</span>
                        <button onClick={() => setProjectTypeFilter("All")} className="text-gray-400 hover:text-rose-600 font-bold ml-1.5">✕</button>
                      </span>
                    )}

                    {budgetFilter !== "All" && (
                      <span className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 select-none border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium transition-all">
                        <span>Budget: {budgetFilter}</span>
                        <button onClick={() => setBudgetFilter("All")} className="text-gray-400 hover:text-rose-600 font-bold ml-1.5">✕</button>
                      </span>
                    )}

                    {skillsFilter !== "All" && (
                      <span className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 select-none border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium transition-all">
                        <span>Skill: {skillsFilter}</span>
                        <button onClick={() => setSkillsFilter("All")} className="text-gray-400 hover:text-rose-600 font-bold ml-1.5">✕</button>
                      </span>
                    )}

                    {listingTypeFilter !== "All" && (
                      <span className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 select-none border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium transition-all">
                        <span>Feature: {listingTypeFilter}</span>
                        <button onClick={() => setListingTypeFilter("All")} className="text-gray-400 hover:text-rose-600 font-bold ml-1.5">✕</button>
                      </span>
                    )}

                    {locationFilter !== "All" && (
                      <span className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 select-none border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium transition-all">
                        <span>Region: {locationFilter}</span>
                        <button onClick={() => setLocationFilter("All")} className="text-gray-400 hover:text-rose-600 font-bold ml-1.5">✕</button>
                      </span>
                    )}

                    {languagesFilter !== "All" && (
                      <span className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 select-none border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium transition-all">
                        <span>Language: {languagesFilter}</span>
                        <button onClick={() => setLanguagesFilter("All")} className="text-gray-400 hover:text-rose-600 font-bold ml-1.5">✕</button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* C. First slider layer: Based on what you might be looking for */}
            <div id="recommended-slider-section" className="!mt-20 md:!mt-28 space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-orange-50 text-[#ff5c00] border border-orange-120 font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full select-none">
                      Curated For You
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5c00]" />
                    <span className="text-xs text-gray-400 font-extrabold select-none">Personalized matches</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-950 tracking-tight leading-none">
                    Based on what you might be looking for
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">
                    Personally tailored, high-converting Shopify dropshipping & digital services
                  </p>
                </div>

                {/* Arrows with premium layout */}
                <div className="flex items-center gap-4 self-end shrink-0 select-none">
                  <span className="text-xs font-bold text-gray-400 select-none">
                    Page {recommendedSliderIdx + 1} of {Math.max(1, Math.ceil(filteredRecommended.length / 3))}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRecommendedSliderIdx(Math.max(0, recommendedSliderIdx - 1))}
                      disabled={recommendedSliderIdx === 0}
                      className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                      aria-label="Previous recommended slide"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRecommendedSliderIdx(Math.min(Math.ceil(filteredRecommended.length / 3) - 1, recommendedSliderIdx + 1))}
                      disabled={filteredRecommended.length <= 3 || recommendedSliderIdx >= Math.ceil(filteredRecommended.length / 3) - 1}
                      className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                      aria-label="Next recommended slide"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                
                {/* Keeping Exploring Anchor card widget - Col Span 1 */}
                <div className="md:col-span-1 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[320px] text-white relative overflow-hidden group border border-zinc-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500 pointer-events-none" />
                  <div className="space-y-4 relative z-10">
                    <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform">
                      <Compass className="w-5 h-5 text-orange-400 font-bold animate-spin-slow" />
                    </div>
                    <div className="space-y-2 text-left">
                      <h3 className="text-lg font-black text-white leading-tight tracking-tight">Need a broader scope?</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                        Toggle different categories or modify search requirements to match custom developer parameters.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory("Programming & Tech")}
                    className="inline-flex w-full items-center justify-center bg-[#ff5c00] hover:bg-orange-400 text-white font-extrabold text-[#000] font-sans text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 group-hover:shadow-orange-500/15 font-black uppercase tracking-wider"
                  >
                    Explore Dev Services
                  </button>
                </div>

                {/* Sliding Tray items - Col Span 3 */}
                <div className="md:col-span-3">
                  {filteredRecommended.length === 0 ? (
                    <div className="h-full bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-2">
                      <Info className="w-8 h-8 text-gray-300" />
                      <p className="text-xs font-semibold text-gray-500">No recommended gigs match your search filters.</p>
                      <button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }} className="text-[#ff5c00] text-xs font-bold hover:underline">Reset filters</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 transition-all duration-500">
                      {filteredRecommended
                        .slice(recommendedSliderIdx * 3, recommendedSliderIdx * 3 + 3)
                        .map((gig) => (
                          <GigCard
                            key={gig.id}
                            gig={gig}
                            isFavorite={favorites.includes(gig.id)}
                            onToggleFavorite={(e) => handleToggleFavorite(gig.id, e)}
                            onClick={() => setSelectedGig(gig)}
                          />
                        ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* D. Second segment: Verified Pro website dev gigs */}
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 mb-2 select-none">
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-120 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> VETTED ELITE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-550 animate-pulse" />
                    <span className="text-xs text-gray-400 font-bold">Top 1% elite tech leaders</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-950 tracking-tight leading-none">Verified Pro Services in Website Development</h2>
                  <p className="text-sm text-gray-500 font-medium mt-2">Hand-vetted engineering leaders and elite digital architects delivering state-of-the-art web architectures</p>
                </div>

                <button
                  onClick={() => setSelectedCategory("Programming & Tech")}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-gray-900 hover:text-white hover:bg-zinc-950 transition-all bg-zinc-100 hover:scale-[1.02] active:scale-98 px-4.5 py-2.5 rounded-xl border border-zinc-200 cursor-pointer shrink-0 select-none shadow-sm"
                >
                  Show All Pro Services <span className="text-gray-400 font-sans">&rarr;</span>
                </button>
              </div>

              {filteredVerifiedPro.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center text-gray-400 space-y-2">
                  <Info className="w-8 h-8 text-gray-300" />
                  <p className="text-xs font-semibold text-gray-500">No vetted services match your search filters.</p>
                  <button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }} className="text-[#ff5c00] text-xs font-bold hover:underline">Clear search filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {filteredVerifiedPro.slice(0, 3).map((gig) => (
                    <GigCard
                      key={gig.id}
                      gig={gig}
                      isFavorite={favorites.includes(gig.id)}
                      onToggleFavorite={(e) => handleToggleFavorite(gig.id, e)}
                      onClick={() => setSelectedGig(gig)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* E. Fiverr Pro Premium Sourcing Banner */}
            <div id="fiverr-pro-sourcing-banner" className="bg-[#301405] rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-lg">
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5c00]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6 max-w-xl text-left select-none relative z-10 lg:w-1/2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                    Velo Desk<span className="text-[#ff5c00] font-medium italic font-serif">pro</span><span className="text-[#ff5c00] text-lg font-bold">.</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Let experts find the right freelancer for you
                </h2>
                
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ff5c00] mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-orange-100/90 leading-snug">Work with experts who will source, interview, and vet freelancers for you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ff5c00] mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-orange-100/90 leading-snug">Get a report with clear recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#ff5c00] mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-orange-100/90 leading-snug">Hire vetted freelance talent with confidence</span>
                  </li>
                </ul>

                <div className="pt-2 space-y-3">
                  <button onClick={() => setSelectedCategory("Programming & Tech")} className="px-6 py-3.5 bg-[#ff5c00] hover:bg-[#e04f00] text-white font-extrabold text-sm rounded-lg transition-all shadow-md active:scale-98 cursor-pointer hover:shadow-lg">
                    Discover expert sourcing
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-orange-200/80 font-medium pl-1">
                    <ShieldCheck className="w-4 h-4 text-[#ff5c00]" />
                    <span>100% money-back guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right: Premium stacked expert cards visually mirroring fiverr pro screen */}
              <div className="relative w-full max-w-[420px] h-[300px] flex items-center justify-center lg:w-1/2">
                
                {/* Visual mouse click selector element */}
                <div className="absolute top-[48%] right-[22%] z-30 flex items-center gap-2 bg-[#ff5c00] text-white px-2.5 py-1.5 rounded-full text-[11px] font-extrabold shadow-lg animate-bounce select-none">
                  <MousePointer2 className="w-3.5 h-3.5" />
                  <span>Choose Lillian</span>
                </div>

                {/* Left Card: Daniel */}
                <div className="absolute left-2 w-[180px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl -rotate-12 scale-90 opacity-40 hover:opacity-100 transition-all duration-300">
                  <div className="relative h-[120px] rounded-xl overflow-hidden bg-gray-800">
                    <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Daniel" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3 text-left">
                    <h4 className="text-xs font-bold text-white">Daniel K.</h4>
                    <p className="text-[10px] text-gray-400">Technical Project Manager</p>
                  </div>
                </div>

                {/* Right Card: Alex */}
                <div className="absolute right-2 w-[180px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl rotate-12 scale-90 opacity-40 hover:opacity-100 transition-all duration-300">
                  <div className="relative h-[120px] rounded-xl overflow-hidden bg-gray-800">
                    <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Alex" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3 text-left">
                    <h4 className="text-xs font-bold text-white">Alex M.</h4>
                    <p className="text-[10px] text-gray-400">Creative Art Director</p>
                  </div>
                </div>

                {/* Center Main Card: Lillian */}
                <div className="absolute w-[200px] bg-white/10 backdrop-blur-xl border border-white/20 hover:border-[#ff5c00] rounded-2xl p-4.5 shadow-2xl transition-all duration-300 z-10 hover:scale-105">
                  <div className="relative h-[140px] rounded-xl overflow-hidden bg-orange-950">
                    <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80" alt="Lillian" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-[#ff5c00]/95 text-white font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">Vetted Pro</span>
                  </div>
                  <div className="mt-3.5 text-left flex items-start justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-white">Lillian</h4>
                      <p className="text-[10px] text-[#ff5c00] font-semibold">Website Developer</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#ff5c00] text-[10px] font-bold">
                      <span>★</span>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* F. AI Director Era Has Arrived Section */}
            <div id="ai-director-banner" className="bg-black rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl border border-white/5">
              {/* Subtle background light leaks */}
              <div className="absolute inset-0 bg-radial-gradient(circle_at_left_bottom,rgba(255,255,255,0.03)_0%,transparent_50%) pointer-events-none" />
              <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="space-y-6 max-w-xl text-left select-none relative z-10 lg:w-1/2">
                <span className="inline-block text-[10px] tracking-widest uppercase font-extrabold text-white bg-white/10 border border-white/15 rounded px-2.5 py-0.5 shadow-sm">
                  NEW ERA
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none">
                  The AI Director era has arrived
                </h2>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  From vision to final frame, work with the most renowned AI Video Directors to create scroll-stopping content and campaigns that drive real impact.
                </p>

                <div className="pt-2">
                  <button onClick={() => setSelectedCategory("AI Services")} className="px-6 py-3.5 bg-white hover:bg-gray-100 text-black font-extrabold text-sm rounded-lg transition-all shadow-md active:scale-98 cursor-pointer hover:shadow-lg">
                    Find your AI Director
                  </button>
                </div>
              </div>

              {/* Right side: Elegant horizontal lineup of AI Directors */}
              <div className="relative w-full flex items-center justify-center lg:w-1/2 gap-3 md:gap-4 overflow-hidden py-4 select-none">
                
                {/* Director 1: The Visiblemake */}
                <div className="w-[18%] min-w-[70px] aspect-[3/4] bg-neutral-900 border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 scale-90 origin-right opacity-40 hover:opacity-100 hover:scale-95 text-center flex flex-col justify-end p-2 relative group">
                  <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Visiblemake" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <p className="text-[8px] font-bold text-white relative z-10 truncate mb-1">The Visiblemake</p>
                </div>

                {/* Director 2: Too Short For Modeling */}
                <div className="w-[19%] min-w-[75px] aspect-[3/4] bg-neutral-900 border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 scale-95 origin-right opacity-60 hover:opacity-100 hover:scale-100 text-center flex flex-col justify-end p-2 relative group">
                  <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" alt="Too Short" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <p className="text-[8px] font-bold text-white relative z-10 truncate mb-1">Too Short For Modeling</p>
                </div>

                {/* Director 3 (Center / Focal): Billy Boman */}
                <div className="w-[24%] min-w-[90px] aspect-[3/4] bg-[#111] border-2 border-white/30 hover:border-white rounded-xl overflow-hidden transition-all duration-300 scale-105 z-10 text-center flex flex-col justify-end p-2 relative group shadow-2xl">
                  <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80" alt="Billy Boman" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <p className="text-[9px] font-extrabold text-[#ff5c00] relative z-10 leading-none">Billy Boman</p>
                  <p className="text-[6px] text-gray-400 relative z-10 mt-0.5 uppercase tracking-wider mb-1">AI Leader</p>
                </div>

                {/* Director 4: Alon Seifert */}
                <div className="w-[19%] min-w-[75px] aspect-[3/4] bg-neutral-900 border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 scale-95 origin-left opacity-60 hover:opacity-100 hover:scale-100 text-center flex flex-col justify-end p-2 relative group">
                  <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80" alt="Alon Seifert" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <p className="text-[8px] font-bold text-white relative z-10 truncate mb-1 font-sans">Alon Seifert</p>
                </div>

                {/* Director 5: Haggar Shoval */}
                <div className="w-[18%] min-w-[70px] aspect-[3/4] bg-neutral-900 border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 scale-90 origin-left opacity-40 hover:opacity-100 hover:scale-95 text-center flex flex-col justify-end p-2 relative group">
                  <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Haggar Shoval" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <p className="text-[8px] font-bold text-white relative z-10 truncate mb-1">Haggar Shoval</p>
                </div>

              </div>
            </div>

            </div> {/* Closing Centered Dashboard Grid Wrapper */}
          </div>
        )}

      </main>

      <Footer onSelectCategory={setSelectedCategory} onSearch={setSearchQuery} />

      {/* ========================================================= */}
      {/* 4. FLOATING SUPPORT CHAT BUBBLE WIDGET */}
      <ChatWidget />

      {/* ========================================================= */}
      {/* 5. SLIDE OUT MODAL VIEW: ACTIVE GIG DETAILS (W/ MULTI-TABS PACKS) */}
      {selectedGig && (
        <GigDetailModal
          gig={selectedGig}
          onClose={() => setSelectedGig(null)}
          onContactSeller={handleContactSeller}
          onOrderComplete={handleOrderComplete}
          onInitiatePayment={handleInitiatePayment}
        />
      )}

      {/* ========================================================= */}
      {/* 6. MODAL OVERLAY: CREATE PROJECT BRIEF */}
      {showBriefCreator && (
        <ProjectBriefModal
          onClose={() => setShowBriefCreator(false)}
          onSubmit={handlePostBrief}
        />
      )}

      {/* ========================================================= */}
      {/* 7. LATERAL DRAWER SLIDE OUT: INBOX CHATS SPLIT CENTER */}
      {showInbox && (
        <InboxDrawer
          conversations={conversations}
          onClose={() => setShowInbox(false)}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
          onSendMessage={handleSendMessage}
          onReceiveMessage={handleReceiveMessage}
        />
      )}

      {/* ========================================================= */}
      {/* 8. DRAWER SLIDE OUT: MY SAVED FAVORITES LIST */}
      {showFavorites && (
        <div id="favorites-sliding-drawer" className="fixed inset-0 z-50 bg-black/50 flex justify-end font-sans">
          <div className="bg-white w-full max-w-md h-full flex flex-col p-6 shadow-2xl animate-slide-left relative">
            <div className="flex justify-between items-center border-b border-gray-150 pb-4 shrink-0">
              <div className="flex items-center gap-2 text-gray-900">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                <h2 className="text-lg font-black leading-none">Saved Gigs ({favorites.length})</h2>
              </div>
              <button
                onClick={() => setShowFavorites(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer"
                aria-label="Close favorites list"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-4 space-y-4">
              {favorites.length === 0 ? (
                <div className="text-center text-gray-400 py-12 space-y-3">
                  <Heart className="w-8 h-8 mx-auto text-gray-200" />
                  <p className="text-xs">No saved services found. Click the heart icon on any gig cards to save.</p>
                </div>
              ) : (
                [...RECOMMENDED_GIGS, ...VERIFIED_PRO_WEBSITE_GIGS]
                  .filter((g) => favorites.includes(g.id))
                  .map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        setSelectedGig(g);
                        setShowFavorites(false);
                      }}
                      className="border border-gray-200 hover:border-gray-400 rounded-lg overflow-hidden flex gap-3 p-3 bg-white hover:bg-slate-50 cursor-pointer text-left transition-colors"
                    >
                      <img
                        src={g.thumbnail}
                        alt={g.title}
                        className="w-20 aspect-video rounded object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <p className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-snug">{g.title}</p>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-[10px] text-gray-400 uppercase font-bold text-left">From ${g.price}</span>
                          <span className="font-semibold text-gray-900 flex items-center gap-0.5">
                            ★ {g.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}



      {/* ========================================================= */}
      {/* 10. DRAWER SLIDE OUT: USER PROFILE DETAILS CARD */}
      {showProfile && (
        <div id="profile-sliding-drawer" className="fixed inset-0 z-50 bg-black/50 flex justify-end font-sans">
          <div className="bg-white w-full max-w-sm h-full flex flex-col p-6 shadow-2xl animate-slide-left relative">
            
            <div className="flex justify-between items-center border-b border-gray-150 pb-4 shrink-0">
              <h2 className="text-base font-black text-gray-950">Hasibul's Account profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer"
                aria-label="Close profile card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-6 flex flex-col items-center space-y-6">
              
              {/* Profile Avatar Card */}
              <div className="text-center space-y-3 w-full">
                <div className="relative inline-block">
                  <img
                    className="h-20 w-20 rounded-full border border-gray-200 mx-auto object-cover"
                    src={userProfile.avatar}
                    alt={userProfile.displayName}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-1 block h-4 w-4 rounded-full bg-[#ff5c00] ring-2 ring-white" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-lg font-black text-gray-900 leading-tight">{userProfile.displayName}</h3>
                  <p className="text-xs text-gray-400 font-semibold">@{userProfile.username}</p>
                </div>
              </div>

              {/* Status details */}
              <div className="bg-gray-50 border border-gray-150 rounded-xl p-5 w-full text-xs space-y-3.5 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Availability Status</span>
                  <span className="text-[#ff5c00] font-bold uppercase tracking-wide bg-orange-50 border border-orange-200 px-2 py-0.5 rounded text-[10px]">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Email Account</span>
                  <span className="font-bold text-gray-800 font-mono truncate max-w-[65%]">{userProfile.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Buying tier level</span>
                  <span className="font-bold text-gray-800">VIP Client Tier 1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Completed percentage</span>
                  <span className="font-bold text-[#ff5c00]">{userProfile.completedPercent}%</span>
                </div>
              </div>

              {/* Quick links buttons */}
              <div className="w-full space-y-2.5">
                <button
                  onClick={() => {
                    setShowProfileTasksDrawer(true);
                    setShowProfile(false);
                  }}
                  className="w-full bg-[#ff5c00] hover:bg-[#e04f00] text-white font-bold py-2.5 rounded text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  Complete Bio checklist
                </button>
                <button
                  onClick={() => {
                    setActiveTab("briefs");
                    setShowProfile(false);
                  }}
                  className="w-full bg-white text-gray-600 font-semibold py-2.5 rounded border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                >
                  View posted briefs
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. DRAWER SLIDE OUT: USER BIO CHECKLIST UPDATER PROGRESS */}
      {showProfileTasksDrawer && (
        <div id="profile-checklist-sliding-drawer" className="fixed inset-0 z-50 bg-black/50 flex justify-end font-sans select-none">
          <div className="bg-white w-full max-w-md h-full flex flex-col p-6 shadow-2xl animate-slide-left relative">
            
            <div className="flex justify-between items-center border-b border-gray-150 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ff5c00] fill-orange-50" />
                <h2 className="text-lg font-black leading-none">Account Build Center</h2>
              </div>
              <button
                onClick={() => setShowProfileTasksDrawer(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer"
                aria-label="Close task drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-6 text-left space-y-6">
              
              <div className="space-y-2 bg-gradient-to-r from-orange-50/70 to-amber-50/30 p-5 rounded-xl border border-orange-100">
                <h3 className="text-sm font-black text-gray-900 leading-none">Total Completion: {userProfile.completedPercent}%</h3>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-[#ff5c00] h-full transition-all duration-700"
                    style={{ width: `${userProfile.completedPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed pt-1 font-semibold">
                  Completing your account credentials is estimated to provide 3.1x higher relevancy benchmarks for elite freelancers reviewing lists.
                </p>
              </div>

              {/* Tasks bullet list */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Pending Account additions</p>
                
                {/* Task item 1 */}
                <div
                  onClick={() => handleToggleProfileTask("bio")}
                  className="flex items-start gap-3.5 p-3 rounded-lg border border-gray-150 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    userProfile.completedTasks.bio ? "bg-[#ff5c00] border-[#ff5c00] text-white" : "border-gray-300"
                  }`}>
                    {userProfile.completedTasks.bio && <span className="text-[10px]">✓</span>}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Add Professional Bio (+15%)</h4>
                    <p className="text-[10px] text-gray-500">Provide personal description summary, agency values, or company bio outlines.</p>
                  </div>
                </div>

                {/* Task item 2 */}
                <div
                  onClick={() => handleToggleProfileTask("skills")}
                  className="flex items-start gap-3.5 p-3 rounded-lg border border-gray-150 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    userProfile.completedTasks.skills ? "bg-[#ff5c00] border-[#ff5c00] text-white" : "border-gray-300"
                  }`}>
                    {userProfile.completedTasks.skills && <span className="text-[10px]">✓</span>}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Specify Technical Skills (+15%)</h4>
                    <p className="text-[10px] text-gray-500">Select tags (WordPress, React coding, Shopify setup, SEO strategy, custom graphics).</p>
                  </div>
                </div>

                {/* Task item 3 */}
                <div
                  onClick={() => handleToggleProfileTask("links")}
                  className="flex items-start gap-3.5 p-3 rounded-lg border border-gray-150 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    userProfile.completedTasks.links ? "bg-[#ff5c00] border-[#ff5c00] text-white" : "border-gray-300"
                  }`}>
                    {userProfile.completedTasks.links && <span className="text-[10px]">✓</span>}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Connect Social & Professional Accounts (+10%)</h4>
                    <p className="text-[10px] text-gray-500">Link authorization accounts such as GitHub coding repository or Google profile secure API.</p>
                  </div>
                </div>

                {/* Task item 4 */}
                <div
                  onClick={() => handleToggleProfileTask("phone")}
                  className="flex items-start gap-3.5 p-3 rounded-lg border border-gray-150 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    userProfile.completedTasks.phone ? "bg-[#ff5c00] border-[#ff5c00] text-white" : "border-gray-300"
                  }`}>
                    {userProfile.completedTasks.phone && <span className="text-[10px]">✓</span>}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Verify Cell Phone Number (+15%)</h4>
                    <p className="text-[10px] text-gray-500">Enable modern 2-Factor verification codes configuration setup (SMS / phone API).</p>
                  </div>
                </div>

                {/* Task item 5 */}
                <div
                  onClick={() => handleToggleProfileTask("portfolio")}
                  className="flex items-start gap-3.5 p-3 rounded-lg border border-gray-150 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className={`h-4 w-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                    userProfile.completedTasks.portfolio ? "bg-[#ff5c00] border-[#ff5c00] text-white" : "border-gray-300"
                  }`}>
                    {userProfile.completedTasks.portfolio && <span className="text-[10px]">✓</span>}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Upload portfolio assets or documents (+10%)</h4>
                    <p className="text-[10px] text-gray-500">Add reference graphics or pdf briefs that showcase past design files or code specs.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. QR CODE POPUP MODAL: APP DOWNLOAD */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 select-none font-sans">
          <div className="bg-white rounded-xl shadow-2xl p-6 text-center max-w-sm w-full space-y-4 animate-scale-in">
            <div className="flex justify-between items-center pb-2 border-b border-gray-150">
              <span className="text-xs font-black text-gray-400 uppercase tracking-wide">Velo Desk. Everywhere</span>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-gray-400 hover:text-black cursor-pointer p-0.5 rounded-full hover:bg-gray-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-gray-200 rounded-xl space-y-4 flex flex-col items-center">
              {/* QR Vector represent */}
              <div className="h-44 w-44 bg-white border border-gray-300 rounded-lg p-2.5 shadow-sm flex flex-col justify-between items-center relative overflow-hidden">
                {/* Nice stylized fake QR layout */}
                <div className="grid grid-cols-5 gap-1.5 w-full h-full">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        (i % 3 === 0 && i % 4 !== 0) || i === 0 || i === 4 || i === 20 || i === 24
                          ? "bg-[#222325]"
                          : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                  <div className="p-2.5 bg-white shadow-md rounded-full border border-gray-150 leading-none">
                    <span className="text-[11px] font-black text-[#ff5c00]">V.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-900 leading-none">Scan to download Velo Desk App</h3>
                <p className="text-[10px] text-gray-400 mt-1">Available for iOS (App Store) and Google Play (Android).</p>
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-gray-900 text-white font-extrabold text-xs py-2.5 rounded hover:bg-black transition-colors cursor-pointer"
            >
              I will Scan Later
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
