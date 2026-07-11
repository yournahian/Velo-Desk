"use client";

import React, { useState } from "react";
import { Bell, Heart, Mail, Search, ClipboardList, UserCheck, Wallet, Copy, Check, LogOut, ChevronDown, User, ExternalLink, Package } from "lucide-react";
import { usePrivy } from "@/hooks/usePrivy";
import { Conversation, UserProfileProgress } from "@/lib/frontend-types";

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  conversations: Conversation[];
  onOpenInbox: () => void;
  onOpenFavorites: () => void;
  onOpenOrders: () => void;
  onOpenProfile: () => void;
  userProfile: UserProfileProgress;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({
  onSearchChange,
  searchQuery,
  conversations,
  onOpenInbox,
  onOpenFavorites,
  onOpenOrders,
  onOpenProfile,
  userProfile,
  activeTab,
  setActiveTab
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const { ready, authenticated, user, wallets, login, logout, formatAddress } = usePrivy();

  const walletAddress = user?.wallet?.address ?? null;

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      text: "Divishha G. sent you a special custom offer for $130",
      time: "2 mins ago",
      read: false
    },
    {
      id: "n2",
      text: "You successfully completed 35% of your profile progress!",
      time: "1 hour ago",
      read: true
    },
    {
      id: "n3",
      text: "Your project brief 'Modern React design portfolio' is now approved as active",
      time: "Yesterday",
      read: true
    }
  ]);

  const unreadCount = conversations.filter(c => c.unread).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  return (
    <header id="fiverr-main-header" className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              id="fiverr-logo-btn"
              onClick={() => {
                setActiveTab("dashboard");
                onSearchChange("");
              }}
              className="text-3xl font-black tracking-tighter text-[#404145] hover:opacity-90 flex items-center transition-all cursor-pointer select-none"
            >
              Velo Desk<span className="text-[#ff5c00] font-black">.</span>
            </button>
          </div>

          {/* Search bar */}
          <div id="fiverr-search-bar-container" className="flex-1 max-w-xl md:max-w-2xl relative">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full">
              <div className="relative w-full">
                <input
                  id="fiverr-search-input"
                  type="text"
                  placeholder="What service are you looking for today?"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-l-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                id="fiverr-search-submit-btn"
                type="submit"
                className="bg-[#222325] hover:bg-[#404145] text-white p-[11px] rounded-r-md transition-colors flex items-center justify-center cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Navigation Items (Right Side) */}
          <div id="fiverr-nav-actions" className="flex items-center gap-1 sm:gap-4 md:gap-5">
                        {/* My Briefs tab */}
            <button
              id="briefs-nav-tab"
              onClick={() => setActiveTab("briefs")}
              className={`hidden sm:flex items-center gap-1.5 text-sm font-semibold py-2 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "briefs"
                  ? "bg-gray-100 text-[#ff5c00]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#ff5c00]"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Project Briefs</span>
            </button>

            {/* My Orders tab */}
            <button
              id="orders-nav-tab"
              onClick={() => setActiveTab("orders")}
              className={`hidden sm:flex items-center gap-1.5 text-sm font-semibold py-2 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-gray-100 text-[#ff5c00]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#ff5c00]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </button>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                id="notification-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-[#f74b4b] ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div id="notifications-dropdown-menu" className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-sm">Notifications</span>
                    {unreadNotifications > 0 && (
                      <button
                        onClick={markNotificationsRead}
                        className="text-xs text-[#ff5c00] hover:underline font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-6 text-center text-xs text-gray-400">No notifications yet</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex flex-col gap-1 ${
                            !notif.read ? "bg-orange-50/50" : ""
                          }`}
                        >
                          <span className="text-xs text-gray-700">{notif.text}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{notif.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Inbox Icon button */}
            <button
              id="inbox-drawer-btn"
              onClick={onOpenInbox}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-[#f74b4b] rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Favorite Heart Icon button */}
            <button
              id="favorites-drawer-btn"
              onClick={onOpenFavorites}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Web3 Wallet Connect Button / Menu */}
            <div className="relative">
              {authenticated && walletAddress ? (
                <div>
                  <button
                    id="web3-connected-wallet-btn"
                    onClick={() => {
                      setShowWalletMenu(!showWalletMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 hover:border-[#ff5c00] rounded-full hover:bg-white transition-all cursor-pointer select-none active:scale-95"
                  >
                    <div className="relative flex items-center justify-center bg-orange-50 text-[#ff5c00] p-1 rounded-full">
                      <Wallet className="w-4 h-4" />
                      <span className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-[#ff5c00] ring-1 ring-white" />
                    </div>
                    <span className="text-xs font-black text-gray-800 font-mono">
                      {formatAddress(walletAddress)}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${showWalletMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showWalletMenu && (
                    <div
                      id="web3-wallet-dropdown"
                      className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 text-left animate-in fade-in slide-in-from-top-3 duration-200"
                    >
                      <div className="pb-3 border-b border-gray-100">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {wallets.length} wallet{wallets.length !== 1 ? 's' : ''} connected
                        </p>
                      </div>

                      <div className="py-3.5 border-b border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Connected Address</p>
                        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2.5 border border-gray-100">
                          <span className="text-xs font-mono font-bold text-gray-700 truncate w-48">
                            {walletAddress}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={handleCopy}
                              className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer border border-transparent hover:border-gray-100 font-semibold"
                              title="Copy Address"
                            >
                              {copied ? <Check className="w-3.5 h-3.5 text-orange-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <a
                              href={`https://etherscan.io/address/${walletAddress}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-gray-700 transition-colors border border-transparent hover:border-gray-100 flex items-center justify-center"
                              title="View on Explorer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3.5 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setShowWalletMenu(false);
                            onOpenProfile();
                          }}
                          className="flex items-center gap-2 w-full text-xs font-black text-gray-700 hover:text-gray-900 hover:bg-slate-50 p-2 rounded-xl transition-all border border-transparent hover:border-gray-100 cursor-pointer text-left"
                        >
                          <div className="relative flex items-center justify-center bg-gray-100 rounded-full h-6 w-6 border border-gray-200 overflow-hidden shrink-0">
                            <img
                              src={userProfile.avatar}
                              alt={userProfile.displayName}
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="font-extrabold truncate text-gray-800 leading-none">My Velo Desk Profile Status</p>
                            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{userProfile.displayName}</p>
                          </div>
                          <span className="text-[10px] bg-slate-100 text-gray-500 rounded px-1.5 py-0.5 font-bold shrink-0">
                            {userProfile.completedPercent}%
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            logout();
                            setShowWalletMenu(false);
                          }}
                          className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-red-100 bg-red-50/40 hover:bg-red-50 text-red-600 hover:text-red-700 text-xs font-extrabold rounded-xl transition-all active:scale-98 cursor-pointer mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Disconnect Wallet</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    id="web3-connect-wallet-cta"
                    onClick={() => login()}
                    disabled={!ready}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-black text-xs px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>{ready ? 'Connect Wallet' : 'Loading...'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
